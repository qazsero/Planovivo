import { redirect, type LoaderFunctionArgs } from "react-router";
import { verifyMagicLink } from "~/server/auth.server";
import { createUserSession } from "~/server/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    if (!token) {
        return redirect("/?error=missing_token");
    }

    const result = await verifyMagicLink(token);

    if (result.error || !result.user) {
        return redirect("/?error=invalid_token");
    }

    return createUserSession(result.user.id, "/");
}
