const User = require("../models/userModel");
const Message = require("../models/messageModel");
const cloudinary = require("cloudinary");

// getting all user expect own
exports.getUsers = async (req, res) => {
  try {
    const user = req.user._id;
    const filterUser = await User.find({
      _id: {
        $ne: user,
      },
    }).select("-password");

    res.status(200).json({ success: true, filterUser });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// getting messages
exports.getMessages = async (req, res) => {
  try {
    // other user
    const reciverId = req.params.id;
    // me
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        {
          senderId: senderId,
          reciverId: reciverId,
        },
        {
          senderId: reciverId,
          reciverId: senderId,
        },
      ],
    });

    return res.status(200).json({ success: true, messages });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// sending messaages
exports.sendingMessage = async (req, res) => {
  try {
    // gett what i send messages or images
    const { text, image } = req.body;
    // this is other person id
    const reciverId = req.params.id;
    // this is own id
    const senderId = req.user._id;

    let imageUrl;

    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image);
      imageUrl = uploadRes.secure_url;
    }

    const newMessage = new Message({
      senderId,
      reciverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    res.status(201).json({ success: true, newMessage });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
