import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
const indexRouter = express.Router();
import productModel from '../models/product-model.js';
import userModel from '../models/user-model.js';

indexRouter.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("index", { error, loggedin: false });
});

indexRouter.get("/shop", isLoggedIn, async (req, res) => {
    let products = await productModel.find()
    let success = req.flash("success");
    res.render("shop", { products, success });
});

indexRouter.get("/cart", isLoggedIn, async (req, res) => {
    let user = await userModel
        .findOne({ email: req.user.email })
        .populate("cart");
    const total = Number(user.cart[0].price + 20) - Number(user.cart[0].discount);
    res.render("cart", { user, total });
});

indexRouter.get("/addtocart/product/:id", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.id);
    await user.save();
    req.flash("success", "Product added to cart");
    res.redirect("/cart");


});

export default indexRouter;