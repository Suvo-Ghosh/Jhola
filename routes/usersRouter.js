import express from 'express';

const usersRouter = express.Router();

usersRouter.get("/", () => {
    res.send("users page")
});

export default usersRouter;