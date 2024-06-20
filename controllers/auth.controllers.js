import User from "../models/user.models.js";
import generateTokenAndCookie from "../utils/generateToken.js";
import bcrypt from "bcryptjs"
export const signUp = async (req, res) => {
  const { fullName, username, password, confirmPassword, gender } = req.body;
  console.log({fullName, username, password, confirmPassword, gender })

  try {

    if (password != confirmPassword) {
      return res.status(400).json({ error: "password do not match" });
    }

    const user =await User.findOne({username})

    if (user) {
      return res.status(404).json({ error: "user already exist" });
    }


    const maleAvator = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleAvator = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // hashed pasword
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //    create new user
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? maleAvator : femaleAvator,
    });
    
    generateTokenAndCookie(newUser._id,res)

    await newUser.save();
    if(newUser){
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
          });
    }else{
        return res.status(404).json({error:"invalid user"})
    }

  
  } catch (error) {
    res.status(500).json({ error: "internal server error" + error });
  }
};

export const login = async (req,res) => {

  try {

    const {username,password}=req.body

    const user=await User.findOne({username})

  

    const isPasswordCorrect=await bcrypt.compare(password,user?.password || "")

    if(!user || !isPasswordCorrect){
      return res.status(404).json({error:"credentials error"})
    }

    generateTokenAndCookie(user._id,res)


    res.status(200).json({
      _id:user._id,
      fullName:user.fullName,
      username:user.username,
      profilePic:user.profilePic
    })


  } catch (error) {
    console.log(error)
    res.status(500).json({error:"internal server error"})
  }


};

export const logout = async (req,res) => {
  try {

    res.cookie("jwt",{maxAge:0}) //response mhar bae cookie kill mhar

    res.status(200).json({message:"logout successfully!"})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({error:"internal server error"})
    
  }
};
