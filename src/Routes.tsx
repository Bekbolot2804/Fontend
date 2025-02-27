export const ROUTES = {
  MAIN: "/",
  HELPS: "/helps",
  LOGIN: "/login",
  REGISTRATION: "/registration",
  ACCOUNT: "/account",
  LESIONS: "/lesions",
  HELPS_TABLE: "/helps_table",
  ADDEDITELEMENT: '/helps_table/add_edit_help',
  FORBIDDEN: '/403',
  NOT_FOUND: '/404'
  };
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
  MAIN: "Главная",
  HELPS: "Виды первой помощи",
  LOGIN: "Вход",
  REGISTRATION: "Регистрация",
  ACCOUNT: "Личный кабинет",
  LESIONS: "Поражения",
  HELPS_TABLE: "Таблица видов",
  ADDEDITELEMENT: "",
  FORBIDDEN: "Нет доступа",
  NOT_FOUND: "Не найдено"
 };