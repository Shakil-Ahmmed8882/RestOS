// index.js
export { default as Main } from "../Layout/Main";
export { default as SignInLayout } from "../module/login/layout/SignInLayout";
export { default as SignUpLayout } from "../module/logout/layout/SignUpLayout";
export { default as DashboardLayout } from "../Layout/dashboard/DashboardLayout";
export { default as Page404 } from "../shared/features/Page404";
export { routeGenerator } from "../Utils/routesGenerator";
export { userPaths } from "./UserRoutes";
export { homePagePaths } from "./homePageRoutes";
export { adminPaths } from "./adminRoutes";
