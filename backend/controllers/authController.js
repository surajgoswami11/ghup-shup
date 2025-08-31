const generateToken = require("../lib/token")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const cloudinary = require("cloudinary")

exports.signup = async (req, res) => {
    const { email, fullName, password } = req.body
    try {
        if (!(email || fullName || password)) {
            return res.status(400).json({ success: false, message: "All feilds required" })
        }


        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ success: false, message: "Email already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)


        const newUser = new User({
            fullName,
            email,
            password: hashPass
        })

        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save()
            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        } else {
            res.status
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" })


    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid credentials" })
        }

        const cmpPass = await bcrypt.compare(password, user.password)

        if (!cmpPass) {
            return res.status(404).json({ success: false, message: "Invalid credentials" })
        }

        generateToken(user._id, res)

        res.status(200).json({ userId: user._id, fullName: user.fullName, email: user.email, profilePic: user.profilePic, })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

exports.logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ success: true, message: "Logout Successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

exports.updateProfile = async (req, res) => {

    try {
        const { profilePic } = req.body
        const userId = req.user._id

        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is requried" })
        }


        const upResponse = await cloudinary.uploader.upload(profilePic)

        const updateUser = await User.findByIdAndUpdate(userId, { profilePic: upResponse.secure_url }, { new: true })

        res.status(200).json({ success: true, updateUser })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server Error" })
    }
}


exports.checkProfile = async (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}