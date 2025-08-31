const mongoose = require("mongoose")


const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URL)
        console.log("Mongodb is connected")
    } catch (error) {
        console.log(error)
    }
}


module.exports = connectDB