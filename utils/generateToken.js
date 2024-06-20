import jwt from "jsonwebtoken";

const generateTokenAndCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "10d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnlt: true, //prevent xss attack and cross site attack
    sameSite: "strict", //csrs attack cross site frogenty attack
    secure:process.env.NODE_DEV === 'development'
  });
};

export default generateTokenAndCookie;
