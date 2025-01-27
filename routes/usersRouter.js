import express from 'express';
import registerUser from '../controllers/authController.js';

const usersRouter = express.Router();

usersRouter.get("/", () => {
    res.send("users page")
});

usersRouter.post("/register", registerUser);

export default usersRouter;