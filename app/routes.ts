import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/_index.tsx"),
    route("app", "routes/app.tsx"),
    route("consulting", "routes/consulting.tsx"),
    route("privacy", "routes/privacy.tsx"),
] satisfies RouteConfig;
