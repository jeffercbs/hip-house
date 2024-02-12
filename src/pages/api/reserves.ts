import { createReserve, findAllReserves, findReserve } from "@/db/reserve";
import { reserveSchema } from "@/schemas/reserve";
import { sendEmail } from "@/utils/send_email";
import type { APIRoute } from "astro";
import { getSession } from "auth-astro/server";
import { v4 as uuid } from "uuid";


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
            const found = await findReserve(data.visitor_dni);

            if (found.length > 0) {
                return new Response(JSON.stringify({ error: "La reserva ya existe" }), {
                    status: 400,
                });
            }

            await createReserve({
                reserve_id: uuid(),
                ...data,
            });


            await sendEmail(data)

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


export const GET: APIRoute = async ({ request }) => {
    const session = await getSession(request);

    if (!session) {
        return new Response(JSON.stringify({ error: "Primero Inicie sesión" }), {
            status: 401,
        });
    }

    const reserves = await findAllReserves();

    return new Response(JSON.stringify(reserves), {
        headers: {
            "content-type": "application/json",
        },
    });
}