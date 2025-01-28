import express from 'express';
import { loginUser, registerUser, logOut } from '../controllers/authController.js';

const usersRouter = express.Router();

usersRouter.get("/", () => {
    res.send("users page")
});

usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);
usersRouter.post("/logout", logOut);

export default usersRouter;