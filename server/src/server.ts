import Koa from "koa"
import cors from "@koa/cors"
import { router } from "./routes.js"

const app = new Koa()

app.use(cors())
app.use(router.routes())

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.info(`🚀 Server is running on port ${PORT}`)
})
