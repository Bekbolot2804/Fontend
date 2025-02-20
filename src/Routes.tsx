export const ROUTES = {
    HOME: "/",
    HelpS: "/Helps",
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    HelpS: "Первая помощь",
};