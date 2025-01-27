import express from 'express';
const ownerRouter = express.Router();
import ownerModel from "../models/owner-model.js";

ownerRouter.get("/", (req, res) => {
    res.send("owner page")
})

ownerRouter.post("/create", async (req, res) => {
    const owner = await ownerModel.findOne();
    if (owner.length > 0) {
        return res.sendStatus(503).send("Don't have permission to create owner");
    }
    let { fullname, email, password } = req.body;
    let createdOwner = await ownerModel.create({ fullname, email, password });
    res.send("We can create owner");
})

export default ownerRouter;