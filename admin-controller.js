import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

export const addAdmin = async (req, res, next) => {
    const { email, password } = req.body;

    // Validate email and password fields
    if(!email || email.trim() === "" || !password || password.trim()===""){
        return res.status(422).json({message: "Invalid Inputs"});
    }

    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({ email });
    } catch (error) {
        return res.status(500).json({ message: "Error checking for existing admin", error });
    }

    if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists" });
    }

    // Hashing the password
    let hashPassword;
    try {
        hashPassword = bcrypt.hashSync(password, 10); // Specifying salt rounds
    } catch (error) {
        return res.status(500).json({ message: "Error hashing the password", error });
    }

    // Creating and saving the new Admin
    let admin;
    try {
        admin = new Admin({ email, password: hashPassword });
        admin = await admin.save();
    } catch (error) {
        return res.status(500).json({ message: "Error storing the admin", error });
    }

    return res.status(201).json({ message: "Admin created successfully", admin });
};

// Admin Login
export const adminLogin = async(req, res, next)=>{
    const {email, password} = req.body;
    if(!email || email.trim() === "" || !password || password.trim()===""){
        return res.status(422).json({message: "Invalid Inputs"});
    }
    
    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({email});
    } catch (error) {
        return console.log(error)
    }
    if (!existingAdmin) {
        return res.status(400).json({ message: "Admin Not fond" });
    }
    const isPasswordCorrect = bcrypt.compareSync(
        password, existingAdmin.password
    );

    if(!isPasswordCorrect){
        return res.status(400).json({ message: "Incorrect password." });
    }
    const token = jwt.sign({id:existingAdmin._id }, process.env.SECRET_KEY,{
        expiresIn: "10d",
    });
    return res.status(200).json({ message: "Authentication Complete", token, id:existingAdmin._id });


}

/// getAdmin 
export const getAdmins = async(req, res, next) => {
    let admins;
    try {
        admins = await Admin.find();
    } catch (error) {
        return console.log(error)
    }
    if(!admins){
        return res.status(500).json({message: "Internal Server Error"})
    }
    return res.status(200).json({admins})
}