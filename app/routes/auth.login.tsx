import { data, type ActionFunctionArgs } from "react-router";
import { createMagicLink } from "~/server/auth.server";

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const email = formData.get("email");

    if (!email || typeof email !== "string") {
        return data({ error: "Email is required" }, { status: 400 });
    }

    try {
        const url = new URL(request.url);
        const domainUrl = `${url.protocol}//${url.host}`;

        await createMagicLink(email, domainUrl);

        return data({ success: true });
    } catch (error) {
        console.error("Login error:", error);
        return data({ error: "Failed to send magic link" }, { status: 500 });
    }
}
