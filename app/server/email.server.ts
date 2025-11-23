interface SendEmailOptions {
    to: string;
    subject: string;
    htmlContent: string;
}

export async function sendEmail({ to, subject, htmlContent }: SendEmailOptions) {
    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL || "hello@enjinia.es";
    const senderName = process.env.BREVO_SENDER_NAME || "Planovivo";

    if (!apiKey) {
        console.warn("BREVO_API_KEY is missing. Email not sent.");
        return false;
    }

    try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "api-key": apiKey,
                "content-type": "application/json",
            },
            body: JSON.stringify({
                sender: { name: senderName, email: senderEmail },
                to: [{ email: to }],
                subject,
                htmlContent,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("Brevo API Error:", error);
            return false;
        }

        return true;
    } catch (error) {
        console.error("Failed to send email:", error);
        return false;
    }
}

export async function sendMagicLink(email: string, code: string) {
    return sendEmail({
        to: email,
        subject: "Tu código de acceso a Planovivo",
        htmlContent: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #111827;">Código de acceso</h1>
        <p style="color: #4B5563; font-size: 16px;">
          Usa el siguiente código para iniciar sesión en Planovivo:
        </p>
        <div style="background-color: #F3F4F6; padding: 24px; border-radius: 12px; text-align: center; margin: 24px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #111827;">${code}</span>
        </div>
        <p style="color: #6B7280; font-size: 14px;">
          Este código expirará en 10 minutos. Si no has solicitado este correo, puedes ignorarlo.
        </p>
      </div>
    `,
    });
}

export async function addToMarketingList(email: string, listId: number = 4) {
    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
        console.warn("BREVO_API_KEY is missing. Contact not added to list.");
        return false;
    }

    try {
        const response = await fetch("https://api.brevo.com/v3/contacts", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "api-key": apiKey,
                "content-type": "application/json",
            },
            body: JSON.stringify({
                email,
                listIds: [listId],
                updateEnabled: true,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            if (error.code === "duplicate_parameter") {
                console.log("Contact already exists in Brevo.");
                return true;
            }
            console.error("Brevo API Error (Add Contact):", error);
            return false;
        }

        return true;
    } catch (error) {
        console.error("Failed to add contact to Brevo:", error);
        return false;
    }
}
