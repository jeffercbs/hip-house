import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_SECRET);

export const sendEmail = async ({
  visitor_email,
  visitor_phone,
  reserve_date,
  visitor_name,
}: {
  visitor_email: string;
  visitor_phone: string;
  reserve_date: string;
  visitor_name: string;
}) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: visitor_email,
    subject: "Reserva exitosa",
    html: `
                <!DOCTYPE html>
                    <html lang="es">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>reservar exitos</title>
                        <style>
                            * {
                                margin: 0;
                                padding: 0;
                                box-sizing: border-box;
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                            }
                        </style>
                    </head>
                    <body>
                        <div style="height: 300px; background: #e76f51; text-align: center; padding: 2rem">
                            <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24"><path fill="currentColor" fill-opacity="0" d="M12 11L4 6H20L12 11Z"><animate fill="freeze" attributeName="fill-opacity" begin="1s" dur="0.15s" values="0;0.3"/></path><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><rect width="18" height="14" x="3" y="5" stroke-dasharray="64" stroke-dashoffset="64" rx="1"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0"/></rect><path stroke-dasharray="24" stroke-dashoffset="24" d="M3 6.5L12 12L21 6.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.4s" values="24;0"/></path></g></svg>
                                <h2 style="font-size: 40px; font-weight: bold; max-weight: 80%; margin: 0 auto;">¡Hola, ${visitor_name}!</h2>
                                <span>
                                    Gracias por reservar en <strong>HipHouse</strong>
                                </span>
                            </div>

                            <div style="padding: 2rem; gap: 10px">
                            <span style="font-weight: bold; font-size: 2rem;">Detalles de la reservar:</span>

                            <ul style="margin-top: 1rem">
                                <li>
                                <strong>Fecha</strong>: ${reserve_date}
                            </li>

                            <li>
                                <strong>Telefono</strong>: ${visitor_phone}
                            </li>

                            <li>
                                <strong>Correo</strong>: ${visitor_email}
                            </li>
                            </ul>
                        </div>
                    </body>
                    </html>
                `,
  });
};
