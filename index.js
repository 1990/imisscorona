import express from "express"
import path from "path"
import favicon from "serve-favicon"
import helmet from "helmet"
import compression from "compression"
import ejs from "ejs"

const app = express()
let server = null

app.use("/public", express.static(path.join(path.resolve(), "/public")))
app.use(favicon(path.join(process.cwd(), "/public/favicons/favicon.ico")))
app.use(helmet())
app.use(compression())
app.disable("x-powered-by")

app.set("views", path.join(process.cwd(), "/views"))
app.set("view engine", "html")
app.engine("html", ejs.__express)

app.get("/", (req, res) => {
  res.setHeader("Content-type", "text/html")
  res.render("index", { data: "Sample Data" })
})

server = app.listen(process.env.PORT || 8020)
console.info("website :: Serving on localhost:8020")

function cleanup() {
  server.close()
}

process.on("SIGINT", cleanup)
process.on("SIGTERM", cleanup)
