const express=require("express")
const colors=require("colors")
const dotenv=require("dotenv").config()
const port= process.env.PORT ||5000
const {errorHandler}=require("./middleware/errormiddleware.js")
 const connectDB=require("./config/bd.js")

connectDB()

const app=express()
app.use(express.json())
app.use(express.urlencoded({extented:false}))
app.use(errorHandler)

app.use("/api/goals/",require("./routes/goalRoutes.js"))
app.use("/api/users/",require("./routes/userRoutes.js"))


app.listen(port,()=>console.log(`Server is started on port ${port}`))
