export const EmailTemplate = (
  visitor_name: string,
  reserve_date: string,
  visitor_phone: string,
  visitor_email: string
) => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="es">

  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
  </head>

  <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:100%;margin:0 auto;padding:20px 0 48px;width:580px">
      <tbody>
        <tr style="width:100%">
          <td>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
              <tbody>
                <tr>
                  <td>
                    <img alt="hip house logo" height="90" src="https://hip-house.vercel.app/logo.png" style="display:block;outline:none;border:none;text-decoration:none" width="96" /></td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-bottom:20px">
              <tbody>
                <tr>
                  <td>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <p style="font-size:32px;line-height:1.3;margin:16px 0;font-weight:700;color:#484848">
                          ¡Hola, ${visitor_name}! 
                          </p>
                          <p style="font-size:18px;line-height:1.4;margin:16px 0;color:#484848;padding:24px;background-color:#f2f3f3;border-radius:4px">
                            ¡Hola! ¡Recibiste este correo porque acabas de hacer una reserva en nuestra increíble plataforma de hip house! ¡Gracias por elegirnos y reservar con nosotros! ¡Estamos emocionados de tenerte como parte de nuestra comunidad de clientes felices! 
                          </p>
                          <p style="font-size:22px;line-height:1.4;margin:16px 0;color:#484848;line-height: 20px">
                            ¡Aquí tienes la información de tu reserva! 
                          </p>
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
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
              <tbody>
                <tr>
                  <td>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <p style="font-size:18px;line-height:1.4;margin:16px 0;color:#484848;font-weight:700">
                            ¿Tiene alguna duda o sugerencia?
                          </p>
                          <p>Comuniquese por nuestras redes sociales, que las encuentra en nuestra plataforma</p>

                          <a href="https://hip-house.vercel.app/" target="_blank" rel="noopener noreferrer" style="font-size: 16px; background-color: #f2f3f3; color: #484848; text-align: center; padding: 1rem 3rem; width: 100%; margin-top: 2rem">
                          https://hip-house.vercel.app/
                          </a>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>

</html>
      `;
