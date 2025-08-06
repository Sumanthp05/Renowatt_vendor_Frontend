import { type RouteConfig, route} from "@react-router/dev/routes";

export default [   
    route("/","routes/home.tsx"),
    route("/SignUp","routes/SignUp.tsx"),
    route("/SignIn","routes/SignIn.tsx"),
    route("/CreateProject","routes/CreateProject.tsx"),

] satisfies RouteConfig;
