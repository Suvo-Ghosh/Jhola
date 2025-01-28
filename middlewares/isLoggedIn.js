import jwt from "jsonwebtoken";
import userModel from "../models/user-model.js";

export const isLoggedIn = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        req.flash("error", "You need to login first");
        return res.redirect("/");
    }
    try {
        let decoded = jwt.verify(token, process.env.JWT_KEY)
        let user = await userModel
            .findOne({ email: decoded.email })
            .select("-password");

        req.user = user;
        next();
    } catch (error) {
        req.flash("error", "Somthing went wrong");
        res.redirect("/");
    }

} 