import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { __dirname } from './pathconfig.js';
import ownerRouter from './routes/ownerRouter.js';
import productsRouter from './routes/productsRouter.js';
import usersRouter from './routes/usersRouter.js';
import dotenv from 'dotenv';
import connectDB from './config/mongoose-connection.js';
import expressSession from 'express-session';
import flash from 'connect-flash';
import indexRouter from './routes/index.js';
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true, // for flash messages
}))
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", 'ejs');

app.use("/", indexRouter)
app.use("/owner", ownerRouter)
app.use("/products", productsRouter)
app.use("/users", usersRouter)

//Database connection
connectDB().then(() => {
    console.log("Database connected");

    // server listening
    app.listen(PORT, () => {
        console.log("Server is running...");
    })
}) 
