export const ROUTES = {
    HOME: "/",
    SPACEOBJECTS: "/spaceobjects",
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    SPACEOBJECTS: "Первая помощь",
};