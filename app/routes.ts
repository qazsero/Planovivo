import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/_index.tsx"),
    route("app", "routes/app.tsx"),
    route("consulting", "routes/consulting.tsx"),
    route("privacy", "routes/privacy.tsx"),

    // Auth Routes
    route("auth/login", "routes/auth.login.tsx"),
    route("auth/verify", "routes/auth.verify.tsx"),
    route("auth/logout", "routes/auth.logout.tsx"),
] satisfies RouteConfig;

