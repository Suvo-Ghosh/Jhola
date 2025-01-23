import mongoose from "mongoose";
mongoose.connect("mongodb://localhost")
    .then(() => {
        console.log("connect");
    })
    .catch((err) => {
        console.log(err);
    })

export default mongoose.connection;