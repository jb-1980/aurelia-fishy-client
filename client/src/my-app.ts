export class MyApp {
  static routes = [
    {
      path: "",
      component: import("./routes/home/home"),
      title: "Home",
    },
    {
      path: "region/:slug",
      component: import("./routes/_region.$slug/region"),
      title: "Region",
    },
  ]
}
