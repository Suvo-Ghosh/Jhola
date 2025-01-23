import express from 'express';
const ownerRouter = express.Router();

ownerRouter.get("/", () => {
    res.send("owner page")
})

export default ownerRouter;