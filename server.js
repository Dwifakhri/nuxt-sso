import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import jwt from "jsonwebtoken"
import http from "http"
import dotenv from "dotenv"
import path from "path"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config()
const app = express()
const server = http.createServer(app)

const allowedOrigins = ["http://localhost:3001", "http://localhost:3000"]
var corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(bodyParser.json()) // Parse JSON request bodies
app.use("/static", express.static(path.join(__dirname, "files")))

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "index.html"))
// })

const users = [
  {
    id: 1,
    email: "atmatech@mail.com",
    username: "atmatech",
    role: "admin",
    password: "123123",
  },
]

app.get("/api/login-sso", (req, res) => {
  // Generate or retrieve a JWT token (replace with your token generation logic)
  const token = jwt.sign(
    { id: 1, email: "atmatech@mail.com", username: "atmatech", role: "admin" },
    "shhhhh"
  )
  return res.redirect(process.env.NUXT_APP_URL + "/callback?token=" + token)
})

// Sample protected route
app.get("/api/login", (req, res) => {
  res.sendFile(path.join(__dirname + "/files/index.html"))
})

app.post("/api/logout", (res) => {
  // console.log(res);
  return res.json({ ok: "ok" })
})

app.get("/api/me", (req, res, next) => {
  // console.log(req.headers.authorization);
  // const auth = req.headers.authorization.slice(7)
  // // return res.json({ id: "coba", email: "coba@mail.com" });
  // try {
  //   const payload = jwt.verify(auth, "shhhhh")
  //   const me = users.find((item) => (item.id = payload.id))
  //   if (me) {
  console.log(req)

  return res.json({ ...users[0], password: undefined })
  //   } else {
  //     return res.status(500).json({ message: "Not found" })
  //   }
  // } catch (error) {
  //   return res.status(401).json({ message: "Unauthorized" })
  // }
})

app.get("/api/token", async function (req, res, next) {
  const { token } = req.query
  try {
    // const response = await fetch(oauth2CLient.endpoints.oauth2TokenUrl, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(requestBody),
    // })

    // const tokens = jwt.sign({ access_token }, "shhhhh")

    // console.log(tokens)
    res.json({ token: token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
  // console.log("ok")

  // const token = jwt.sign(googleUser, "shhhhh");

  // res.cookie("token", token, {
  //   httpOnly: true,
  //   secure: false,
  // });
})

server.listen(8000, "localhost", () => {
  console.log(`Listening on ${8000}`)
  // console.log(`Listening on ${process.env.NUXT_API_URL}`)
})
