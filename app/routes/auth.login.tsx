import { data, type ActionFunctionArgs } from "react-router";
import { createAuthCode } from "~/server/auth.server";

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const email = formData.get("email");

    if (!email || typeof email !== "string") {
        return data({ error: "Email is required" }, { status: 400 });
    }

    try {
        await createAuthCode(email);
        return data({ success: true, email }); // Return email to persist state
    } catch (error) {
        console.error("Login error:", error);
        return data({ error: "Failed to send code" }, { status: 500 });
    }
}
