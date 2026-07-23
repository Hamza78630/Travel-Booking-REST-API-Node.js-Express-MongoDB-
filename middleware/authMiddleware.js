import jwt from 'jsonwebtoken';
import { Blacklist } from '../models/blacklistModel.js';

export const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.json({ "status": "ERROR", "message": "No token provided. Please login." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const blacklisted = await Blacklist.findOne({ token });
        if (blacklisted) {
            return res.json({ "status": "ERROR", "message": "Token has been logged out. Please login again." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.json({ "status": "ERROR", "message": "Invalid or expired token" });
    }
};