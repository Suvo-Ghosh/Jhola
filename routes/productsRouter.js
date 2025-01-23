import express from 'express';
const productsRouter = express.Router();

productsRouter.get("/", () => {
    res.send("products page")
})

export default productsRouter;