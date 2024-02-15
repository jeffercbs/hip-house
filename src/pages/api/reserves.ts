import { createReserve, findAllReserves, findReserve, deleteReserve } from "@/db/reserve";
import { reserveSchema } from "@/schemas/reserve";
import type { APIRoute } from "astro";
import { getSession } from "auth-astro/server";

export const POST: APIRoute = async ({ request }) => {
    const session = await getSession(request);

    const formdata = await request.formData();
    const parsed = reserveSchema.safeParse(Object.fromEntries(formdata));

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

            await createReserve(data);
            // await sendEmail(data)

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
            headers: {
                "Content-Type": "text/event-stream",
            },
            status: 401,
        });
    }

    try {
        if (session.user.role === "admin") {
            const reserves = await findAllReserves();

            return new Response(JSON.stringify(reserves));
        }

        return new Response(JSON.stringify({ error: "No tienes permisos" }), {
            status: 401,
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "¡Error interno del servidor!" }),
            {
                status: 500,
            }
        );
    }
};

export const DELETE: APIRoute = async ({ request }) => {
    const session = await getSession(request);

    if (!session) {
        return new Response(JSON.stringify({ error: "Primero Inicie sesión" }), {
            status: 401,
        });
    }

    try {
        if (session.user.role === "admin") {
            const url = new URL(request.url);
            const id = url.searchParams.get("id");

            if (!id) {
                return new Response(JSON.stringify({ error: "¡ID no encontrado!" }), {
                    status: 400,
                });
            }

            await deleteReserve(id);

            return new Response(JSON.stringify({ message: "¡Reserva eliminada!" }));
        }

        return new Response(JSON.stringify({ error: "No tienes permisos" }), {
            status: 401,
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "¡Error interno del servidor!" }),
            {
                status: 500,
            }
        );
    }
};
