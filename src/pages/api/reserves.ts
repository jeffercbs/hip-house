import type { APIRoute } from "astro";
import { reserveSchema } from "@/schemas/reserve";
import { createReserve, reserveFound } from "@/db/client";
import { v4 as uuid } from "uuid";
import { getSession } from "auth-astro/server";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_SECRET);

export const POST: APIRoute = async ({ request }) => {
    const formdata = await request.formData();
    const parsed = reserveSchema.safeParse(Object.fromEntries(formdata));
    const session = await getSession(request);

    if (!session) {
        return new Response(JSON.stringify({ error: "Primero Inicie sesión" }), {
            status: 401,
        });
    }

    if (parsed.success) {
        try {
            const data = parsed.data;
            const found = await reserveFound(data.visitor_dni);

            if (found.length > 0) {
                return new Response(JSON.stringify({ error: "La reserva ya existe" }), {
                    status: 400,
                });
            }

            await createReserve({
                reserve_id: uuid(),
                ...data,
            });


            await resend.emails.send({
                from: "onboarding@resend.dev",
                to: data.visitor_email,
                subject: "Reserva exitosa",
                html: `
                        <h1>¡Hola ${data.visitor_name}!</h1>
                        <p>Gracias por reservar en HipHouse</p>

                        <hr/>
                        <p>Detalles de la reserva:</p>
                        <p>Fecha: ${data.reserve_date}</p>
                        <p>Hora: ${data.reserve_time}</p>
                        <p>Telefono: ${data.visitor_phone}</p>
                        <p>Correo: ${data.visitor_email}</p>

                        <hr/>
                        <h1>¡Su reserva fue exitosa!</h1>
                        <p>Gracias por reservar en HipHouse</p>
                    `,
            });

            return new Response(
                JSON.stringify({ message: "¡Su reserva fue exitosa!" })
            );
        } catch (error) {
            return new Response(
                JSON.stringify({ error: "¡Error interno del servidor!" }),
                {
                    status: 500,
                }
            );
        }
    }

    return new Response(
        JSON.stringify({
            error: `Sus datos son invalidos: ${parsed.error.message}`,
        }),
        {
            status: 400,
        }
    );
};
