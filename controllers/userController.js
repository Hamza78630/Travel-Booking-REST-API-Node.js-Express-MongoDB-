import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Booking } from '../models/bookingModel.js';
import { User } from '../models/userModel.js';
import { Blacklist } from '../models/blacklistModel.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json({ "status": "Success", "users": users });
    } catch (error) {
        res.json({ "status": "ERROR", "message": error.message });
    }
};

export const addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const lastUser = await User.findOne().sort({ userId: -1 });
        const userId = lastUser ? lastUser.userId + 1 : 1;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ userId, name, email, password: hashedPassword });
        await newUser.save();

        res.json({ "status": "User Added", "user": { userId: newUser.userId, name: newUser.name, email: newUser.email } });
    } catch (error) {
        res.json({ "status": "ERROR", "message": error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.json({ "status": "ERROR", "message": "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.json({ "status": "ERROR", "message": "Invalid email or password" });

        const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ "status": "Login Success", "token": token, "user": { userId: user.userId, name: user.name, email: user.email } });
    } catch (error) {
        res.json({ "status": "ERROR", "message": error.message });
    }
};

export const logoutUser = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.json({ "status": "ERROR", "message": "No token provided." });
        }

        const token = authHeader.split(" ")[1];

        await Blacklist.create({ token });
        res.json({ "status": "Logout Success", "message": "Token has been invalidated." });
    } catch (error) {
        res.json({ "status": "ERROR", "message": error.message });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.userId }).select("-password");
        if (!user) return res.json({ "status": "ERROR", "message": "User not found" });

        res.json({ "status": "Success", "profile": user });
    } catch (error) {
        res.json({ "status": "ERROR", "message": error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const uid = parseInt(req.params.userId);
        const { name, email } = req.body;

        const updated = await User.findOneAndUpdate(
            { userId: uid },
            { name, email },
            { new: true }
        ).select("-password");

        if (!updated) return res.json({ "status": "ERROR", "message": "User not found" });

        res.json({ "status": "User Updated", "user": updated });
    } catch (error) {
        res.json({ "status": "ERROR", "message": error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const uid = parseInt(req.params.userId);

        const deleted = await User.findOneAndDelete({ userId: uid });
        if (!deleted) return res.json({ "status": "ERROR", "message": "User not found" });

        res.json({ "status": "User Deleted", "user": { userId: deleted.userId, name: deleted.name, email: deleted.email } });
    } catch (error) {
        res.json({ "status": "ERROR", "message": error.message });
    }
};

export const getUserBookings = async (req, res) => {
    try {
        const uid = parseInt(req.params.userId);

        const user = await User.findOne({ userId: uid });
        if (!user) return res.json({ "status": "ERROR", "message": "User not found" });

        const userPacks = await Booking.find({ userId: user._id });

        res.json({ "status": "Success", "userName": user.name, "bookings": userPacks });
    } catch (error) {
        res.json({ "status": "ERROR", "message": error.message });
    }
};