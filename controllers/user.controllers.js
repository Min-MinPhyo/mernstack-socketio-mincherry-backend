import User from "../models/user.models.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const logedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: logedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};
