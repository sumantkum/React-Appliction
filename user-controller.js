
import User from '../models/User.js';
import bcrypt from 'bcryptjs'
import Booking from '../models/Booking.js';


// GET ALL USER
export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    }
    catch (err) {
        return next(err);
    }
    if (!users) {
        return res.status(500).json({ message: "Error occured" });
    }
    return res.status(200).json({ users });
};


/// SINGH UP
export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (
        !name || name.trim() === "" ||
        !email || email.trim() === "" ||
        !password || password.trim() === ""
    ) {
        return res.status(422).json({ message: "Invalid input" });
    }
    const hashPassword = bcrypt.hashSync(password);
    let user;
    try {
        user = new User({ name, email, password: hashPassword });
        user = await user.save();
    }
    catch (error) {
        return res.status(500).json({ message: "Error occurred", error: error.message });
    }
    if (!user) {
        return res.status(500).json({ message: "Unexpected error occurred" });
    }
    return res.status(201).json({ user });
};


/// UPDATE USER 
export const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    if (
        !name ||
        name.trim() === "" ||
        !email ||
        email.trim() === "" ||
        !password ||
        password.trim() === ""
    ) {
        return res.status(422).json({ message: "invaild user Id" })
    }
    const hashPassword = bcrypt.hashSync(password);
    let user;
    try {
        user = await User.findByIdAndUpdate(id, {
            name,
            email,
            password: hashPassword,
        });
    }
    catch (error) {
        return console.log(error);
    }
    if (!user) {
        return res.status(500).json({ message: "Somthing went wrong" })
    }
    res.status(200).json({ message: "Update Sucessfully" });
};


/// DELETE USER
export const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findByIdAndDelete(id);
    } catch (error) {
        return console.log(error);
    }
    if (!user) {
        return res.status(500).json({ message: "Something went worng" });
    }
    return res.status(200).json({ message: "Deleted Data Successfully" });
};


/// LOGIN USER
export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    if (
        !email || email.trim() === "" ||
        !password || password.trim() === ""
    ) {
        return res.status(422).json({ message: "Invalid User" });
    }
    let existinUser;
    try {
        existinUser = await User.findOne({ email });
    }
    catch (error) {
        return console.log(error);
    }
    if (!existinUser) {
        return res.status(404).json({ message: "Unable to find user from this Id" })
    }
    const isPassword = bcrypt.compareSync(password, existinUser.password);
    if (!isPassword) {
        return res.status(400).json({ messaeg: "Incorrect Your Password" });
    }
    return res.status(200).json({ messaeg: "Login Successfull User" });
};


//// GET BOOKING
export const getBookingOfUser = async (req, res, next) => {
    let id = req.params.id;
    let bookings;
    try {
        bookings = await Booking.find({ user: id });

    } catch (error) {
        return console.log(error);
    }
    if (!bookings) {
        return res.status(400).json({ message: "Unable to get bookings" })
    }
    return res.status(200).json({ bookings })

}









