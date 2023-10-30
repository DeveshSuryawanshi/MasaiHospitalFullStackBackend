const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;
const {connection} = require("./db");
const {userRouter} = require("./src/Routes/user.routes");
const {appointmentsRouter} = require("./src/Routes/appointments.routes");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/users",userRouter);
app.use("/appointments", appointmentsRouter);

app.get("/", async(req, res) =>{
    try {
        res.setHeader("Content-type", "text/html");
        res.status(200).send("<h1>Welcome to the Masai Hospital (FullStack) Server</h1>");
    } catch (error) {
        res.status(400).send({"error": error.message});
    }
})

app.listen(PORT, async() =>{
    try {
        await connection;
        console.log("Connected to the DataBase");;
        console.log(`Server is Runing on port ${PORT}`);
    } catch (error) {
        consolr.log(error);
    }
})
