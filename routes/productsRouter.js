import express from 'express';
const productsRouter = express.Router();
import { upload } from '../config/multer-config.js';
import productModel from '../models/product-model.js';

productsRouter.post("/create", upload.single("image"), async (req, res) => {
    const { buffer } = req.file;
    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    try {
        let product = await productModel.create({
            image: buffer,
            name: name,
            price: price,
            discount: discount,
            bgcolor: bgcolor,
            panelcolor: panelcolor,
            textcolor: textcolor
        });

        req.flash("success", "Product Created Successfully");
        res.redirect("/owner/admin");

    } catch (error) {
        console.log(error);
        console.log("error while creating product");
    }


})

export default productsRouter;