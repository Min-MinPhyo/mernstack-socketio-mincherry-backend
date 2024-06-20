import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "user not login" });
    }

    // token decode mal or pyan phii mal
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized user - Invalid Token" });
    }

    console.log(decodedToken );

    const user = await User.findById(decodedToken.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    req.user = user;

    if(req.user){
      console.log(req.user)
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

export default protectRoute;
