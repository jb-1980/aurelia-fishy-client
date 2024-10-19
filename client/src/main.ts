import Aurelia from "aurelia"
import { MyApp } from "./my-app"
import { RouterConfiguration } from "@aurelia/router"

Aurelia.register(
  RouterConfiguration.customize({ useUrlFragmentHash: false, useHref: false })
)
  .app(MyApp)
  .start()
