const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res
                .status(401)
                .json({ message: "Unauthorized- No Token Provided" });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded) {
            return res
                .status(401)
                .json({ message: "Unauthorized- Invalid Provided" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "user not found" });
        }

        req.user = user
        next()

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" })
    }
};
