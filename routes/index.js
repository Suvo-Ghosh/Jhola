import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
const indexRouter = express.Router();
import productModel from '../models/product-model.js';

indexRouter.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("index", { error });
});

indexRouter.get("/shop", isLoggedIn, async (req, res) => {
    let products = await productModel.find()
    res.render("shop", { products });
});

export default indexRouter;