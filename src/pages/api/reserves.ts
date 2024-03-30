import { createReserve, deleteReserve, findReserve } from '@/db/reserve';
import { reserveSchema } from '@/schemas/reserve';
import type { User } from '@/user';
import { sendEmail } from '@/utils/send_email';
import { format } from '@formkit/tempo';
import type { APIRoute } from 'astro';
import { getSession } from 'auth-astro/server';
import { v4 as uuid } from 'uuid';

export const POST: APIRoute = async ({ request }) => {
  const session = await getSession(request);

  const formdata = await request.formData();
  const parsed = reserveSchema.safeParse(Object.fromEntries(formdata));

  if (!session) {
    return new Response(JSON.stringify({ error: 'Primero Inicie sesión' }), {
      status: 401,
    });
  }

  if (parsed.success) {
    try {
      const { reserve_date, reserve_time, ...resData } = parsed.data;
      const found = await findReserve(resData.visitor_dni);

      if (found.length > 0) {
        if (found[0].visitor_email === resData.visitor_email) {
          return new Response(
            JSON.stringify({ error: 'La reserva ya existe' }),
            {
              status: 400,
            }
          );
        }
      }

      const date = {
        ...resData,
        reserve_date: format(`${reserve_date}T${reserve_time}`, {
          date: 'medium',
          time: 'short',
        }),
        reserve_id: uuid(),
      };

      await createReserve(date);
      await sendEmail(date);

      return new Response(
        JSON.stringify({
          message:
            '"¡Su reserva se ha completado con éxito! En breve, recibirá un correo electrónico con la confirmación de su reserva. ¡Muchas Gracias!"',
        })
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: '¡Error interno del servidor!' }),
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
    return new Response(JSON.stringify({ error: 'Primero Inicie sesión' }), {
      status: 401,
    });
  }

  try {
    if ((session.user as User).role === 'admin') {
      const url = new URL(request.url);
      const id = url.searchParams.get('id');

      if (!id) {
        return new Response(JSON.stringify({ error: '¡ID no encontrado!' }), {
          status: 400,
        });
      }

      await deleteReserve(id);

      return new Response(JSON.stringify({ message: '¡Reserva eliminada!' }));
    }

    return new Response(JSON.stringify({ error: 'No tienes permisos' }), {
      status: 401,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: '¡Error interno del servidor!' }),
      {
        status: 500,
      }
    );
  }
};
