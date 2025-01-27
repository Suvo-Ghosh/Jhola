import express from 'express';
const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
    res.send("index page")
});

export default indexRouter;