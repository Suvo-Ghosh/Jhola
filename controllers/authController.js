import userModel from '../models/user-model.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';

export const registerUser = async (req, res) => {
    try {
        let { fullname, email, password } = req.body;
        let user = await userModel.findOne({ email: email })
        if (user) {
            return res.status(401).send("You Already have an account, please login ")
        }
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);
                else {
                    password = hash;
                    let User = await userModel.create({ fullname, email, password });
                    let token = generateToken(User);
                    res.cookie("token", token);
                    res.send("User Created Successfully");
                }
            });
        })

    } catch (error) {
        console.log(error.message);

    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await userModel.findOne({ email: email })
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.redirect("/shop");
                } else {
                    res.send("Email or Password is incorrect");
                }
            });
        } else {
            res.send("Email or Password is incorrect");
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const logOut = async (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
}
