import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {userRouter} from "./router";

const app = express()
const PORT = 4000;

const handleHome = (req, res) => res.send("Home from Home");
const handleProfile = (req, res) => res.send("You are on my profile");

app.use("/user", userRouter);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan("dev"));
app.get("/", handleHome);
app.get("/profile", handleProfile);

export default app;