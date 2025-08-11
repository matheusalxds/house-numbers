import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index("./routes/redirect.tsx"),
  route("/dashboard", "./routes/dashboard/_layout.tsx", [
    route("snippets", "./routes/dashboard/snippets.tsx"),
    route("snippets/:id", "./routes/dashboard/snippets.$id.tsx"),
  ]),
  route("/auth", "./routes/auth/_layout.tsx", [
    route("login", "./routes/auth/login.tsx"),
    route("register", "./routes/auth/register.tsx"),
  ]),
  route("*", "./routes/not-found.tsx"),
] satisfies RouteConfig;

