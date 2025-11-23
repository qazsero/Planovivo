import { createCookieSessionStorage, redirect } from "react-router";

if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET must be set");
}

export const storage = createCookieSessionStorage({
    cookie: {
        name: "pv_session",
        secure: process.env.NODE_ENV === "production",
        secrets: [process.env.SESSION_SECRET],
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: true,
    },
});

export async function createUserSession(userId: string, redirectTo: string) {
    const session = await storage.getSession();
    session.set("userId", userId);
    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await storage.commitSession(session),
        },
    });
}

export async function createUserSessionJSON(userId: string) {
    const session = await storage.getSession();
    session.set("userId", userId);
    return {
        headers: {
            "Set-Cookie": await storage.commitSession(session),
        },
    };
}

export async function getUserSession(request: Request) {
    return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserId(request: Request) {
    const session = await getUserSession(request);
    const userId = session.get("userId");
    if (!userId || typeof userId !== "string") return null;
    return userId;
}

export async function requireUserId(
    request: Request,
    redirectTo: string = new URL(request.url).pathname
) {
    const session = await getUserSession(request);
    const userId = session.get("userId");
    if (!userId || typeof userId !== "string") {
        throw new Response("Unauthorized", { status: 401 });
    }
    return userId;
}

export async function logout(request: Request) {
    const session = await getUserSession(request);
    return redirect("/", {
        headers: {
            "Set-Cookie": await storage.destroySession(session),
        },
    });
}
