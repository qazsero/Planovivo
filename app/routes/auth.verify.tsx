import { data, type ActionFunctionArgs } from "react-router";
import { verifyAuthCode } from "~/server/auth.server";
import { createUserSessionJSON } from "~/server/session.server";

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const email = formData.get("email");
    const code = formData.get("code");

    if (!email || typeof email !== "string" || !code || typeof code !== "string") {
        return data({ error: "Email y código son requeridos" }, { status: 400 });
    }

    const result = await verifyAuthCode(email, code);

    if (result.error || !result.user) {
        return data({ error: result.error || "Código inválido" }, { status: 400 });
    }

    const session = await createUserSessionJSON(result.user.id);
    return data({ success: true }, { headers: session.headers });
}
