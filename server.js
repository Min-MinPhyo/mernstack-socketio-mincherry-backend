import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

const app=express()

dotenv.config()
const PORT=process.env.PORT


// router import
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import databaseConnection from "./database/databaseConnection.js"

// json data
app.use(express.json())
app.use(cookieParser())


app.use("/api/auth",authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users",userRoutes)


app.listen(PORT,()=>{
 console.log("server running in port "+PORT)
 databaseConnection()
}

)