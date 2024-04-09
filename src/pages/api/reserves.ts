import { reserveSchema } from "@/schemas/reserve";
import { sendEmail } from "@/utils/send_email";
import type { APIRoute } from "astro";
import { Reserve, db, eq } from "astro:db";
import { getSession } from "auth-astro/server";
import { createHash } from "node:crypto";
import type { User } from "@/user";

export const POST: APIRoute = async ({ request }) => {
  const session = await getSession(request);

  if (!session) {
    return new Response(JSON.stringify({ error: "Primero Inicie sesión" }), {
      status: 401,
    });
  }

  const formdata = await request.formData();
  const parsed = reserveSchema.safeParse(Object.fromEntries(formdata));

  if (parsed.success) {
    try {
      const {
        reserve_date,
        reserve_time,
        visitor_email,
        visitor_name,
        visitor_dni,
        visitor_phone,
      } = parsed.data;
      const found = await db
        .select()
        .from(Reserve)
        .where(eq(Reserve.visitor_email, visitor_email));

      if (found.length > 0) {
        return new Response(JSON.stringify({ error: "La reserva ya existe" }), {
          status: 400,
        });
      }
      await db.insert(Reserve).values({
        reserve_id: createHash("sha256").update(reserve_date).digest("hex"),
        reserve_date: new Date(reserve_date),
        reserve_time,
        visitor_email,
        visitor_name,
        visitor_dni,
        visitor_phone,
      });
      await sendEmail({
        visitor_email,
        visitor_phone,
        reserve_date,
        visitor_name,
      });

      return new Response(
        JSON.stringify({
          message:
            "¡Su reserva se ha completado con éxito! En breve, recibirá un correo electrónico con la confirmación de su reserva.",
        })
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

export const DELETE: APIRoute = async ({ request }) => {
  const session = await getSession(request);

  if (!session) {
    return new Response(JSON.stringify({ error: "Primero Inicie sesión" }), {
      status: 401,
    });
  }

  try {
    if (session.user && (session.user as unknown as User).role === "admin") {
      const url = new URL(request.url);
      const id = url.searchParams.get("id");

      if (!id) {
        return new Response(JSON.stringify({ error: "¡ID no encontrado!" }), {
          status: 400,
        });
      }

      await db.delete(Reserve).where(eq(Reserve.reserve_id, id));
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
