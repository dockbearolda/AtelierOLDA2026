import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Méthode non autorisée');

  const { nomClient, panier } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { 
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS 
    }
  });

  const emailHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 60px 20px; color: #1d1d1f; background-color: #f5f5f7;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.04);">
        
        <div style="padding: 40px; border-bottom: 1px solid #f2f2f2;">
          <p style="text-transform: uppercase; letter-spacing: 3px; font-size: 12px; color: #86868b; margin: 0 0 10px 0; font-weight: 600;">Atelier OLDA</p>
          <h1 style="font-size: 28px; font-weight: 700; margin: 0; color: #1d1d1f;">Confirmation de commande</h1>
          <p style="font-size: 17px; color: #86868b; margin: 8px 0 0 0;">Client : ${nomClient}</p>
        </div>

        <div style="padding: 20px 40px;">
          ${panier.map(item => `
            <div style="padding: 35px 0; border-bottom: 1px solid #f2f2f2;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="vertical-align: top;">
                    <p style="margin: 0; font-size: 12px; color: #0071e3; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                      Réf. ${item.reference}
                    </p>
                    <h2 style="margin: 8px 0; font-size: 20px; font-weight: 600; color: #1d1d1f;">
                      ${item.couleur}
                    </h2>
                    ${item.commentaire ? `
                      <div style="margin-top: 12px; padding: 10px 15px; background-color: #f9f9fb; border-left: 2px solid #d2d2d7; border-radius: 4px;">
                        <p style="margin: 0; color: #424245; font-size: 14px; line-height: 1.5;">
                          <span style="font-weight: 600;">Note :</span> ${item.commentaire}
                        </p>
                      </div>
                    ` : ''}
                  </td>
                  <td align="right" style="vertical-align: center; width: 100px;">
                    <div style="text-align: center;">
                      <p style="margin: 0; font-size: 11px; color: #86868b; text-transform: uppercase; font-weight: 600;">Qté</p>
                      <p style="margin: 0; font-size: 42px; font-weight: 700; color: #1d1d1f; line-height: 1;">${item.quantite}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          `).join('')}
        </div>

        <div style="padding: 40px; background-color: #fafafa; text-align: center;">
          <p style="margin: 0; color: #86868b; font-size: 13px; line-height: 1.6;">
            Commande réceptionnée le ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}.
            <br />
            L'Atelier OLDA prépare votre collection avec soin.
          </p>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 30px;">
        <p style="font-size: 12px; color: #86868b; letter-spacing: 0.5px;">&copy; 2026 Atelier OLDA — Document Confidentiel</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: '"Atelier OLDA" <votre-email@gmail.com>',
      to: 'votre-email-de-reception@gmail.com',
      subject: `NOUVELLE COMMANDE : ${nomClient}`,
      html: emailHtml,
    });
    return res.status(200).json({ message: 'Commande envoyée avec succès' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
