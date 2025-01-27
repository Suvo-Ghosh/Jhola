import userModel from '../models/user-model.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';

const registerUser = async (req, res) => {
    try {
        let { fullname, email, password } = req.body;
        let user = await userModel.findOne({ email: email })
        if (user) {
            return res.sendStatus(401).send("You Already have an account, please login ")
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

export default registerUser;