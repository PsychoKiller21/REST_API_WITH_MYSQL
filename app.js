
const express = require("express");
const app=express();
const userRouter = require("./api/users/user.router");

app.use(express.json())//As user is passing data on json format to convert from json to javascript object
app.use("/api/users",userRouter);
require("dotenv").config();

app.listen(process.env.APP_PORT, () => {
    console.log("server up and running ",process.env.APP_PORT);
});