export default {
  Base: "/api",
  Countries: {
    Base: "/countries",
    GetAll: "/",
    GetOne: "/:countryCode",
  },
} as const;
