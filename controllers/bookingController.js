import { Booking } from '../models/bookingModel.js';
import { User } from '../models/userModel.js';

export const getAllBookings = async (req, res) => {
    try {
        const travelPacks = await Booking.find();
        res.json({ "status": "Success", "travelPacks": travelPacks });
    } catch (error) {
        res.json({ "status": "ERROR", "message": error.message });
    }
};

export const searchByLocation = async (req, res) => {
    try {
        const loc = req.params.loc;
        const result = await Booking.find({ loc: loc });
        result.length === 0 
            ? res.json({ "status": "ERROR", "message": "No travel packs found" }) 
            : res.json({ "status": "Success", "travelPacks": result });
    } catch (error) {
        res.json({ "status": "ERROR", "message": error.message });
    }
};

export const searchByCost = async (req, res) => {
    try {
        const min = parseInt(req.query.min) || 0;
        const max = parseInt(req.query.max) || Infinity;
        const result = await Booking.find({ cost: { $gte: min, $lte: max } });
        result.length === 0 
            ? res.json({ "status": "ERROR", "message": "No travel packs found" }) 
            : res.json({ "status": "Success", "travelPacks": result });
    } catch (error) {
        res.json({ "status": "ERROR", "message": error.message });
    }
};

export const searchByState = async (req, res) => {
    try {
        const status = req.params.status;
        const result = await Booking.find({ state: status });
        res.json({ "status": "Success", "travelPacks": result });
    } catch (error) {
        res.json({ "status": "ERROR", "message": error.message });
    }
};

export const searchById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const entry = await Booking.findOne({ Id: id });
        !entry 
            ? res.json({ "status": "ERROR", "message": "No travel pack found" }) 
            : res.json({ "status": "Success", "travelPack": entry });
    } catch (error) {
        res.json({ "status": "ERROR", "message": error.message });
    }
};

export const addBooking = async (req, res) => {
    try {
        const { client, loc, cost, state, contact, period, userId } = req.body;
        
        const parentUser = await User.findOne({ userId: parseInt(userId) });
        if (!parentUser) {
            return res.json({ "status": "ERROR", "message": "Parent user not found" });
        }

        const lastBooking = await Booking.findOne().sort({ Id: -1 });
        const id = lastBooking ? lastBooking.Id + 1 : 1;

        const newPack = new Booking({ 
            Id: id, 
            userId: parentUser._id, 
            client, 
            loc, 
            cost, 
            state, 
            contact, 
            period 
        });
        await newPack.save();

        res.json({ "status": "Pack Added", "data": newPack });
    } catch (error) {
        res.json({ "status": "ERROR", "message": error.message });
    }
};

export const updateBooking = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        if (req.body.userId) {
            const parentUser = await User.findOne({ userId: parseInt(req.body.userId) });
            if (parentUser) req.body.userId = parentUser._id;
        }

        const updatedPack = await Booking.findOneAndUpdate(
            { Id: id },
            { $set: req.body },
            { new: true }
        );

        if (!updatedPack) {
            res.json({ "status": "ERROR", "message": "Not found" });
        } else {
            res.json({ "status": "Pack Updated", "travelPack": updatedPack });
        }
    } catch (error) {
        res.json({ "status": "ERROR", "message": error.message });
    }
};

export const deleteBooking = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deletedPack = await Booking.findOneAndDelete({ Id: id });
        
        if (!deletedPack) {
            res.json({ "status": "ERROR", "message": "Not found" });
        } else {
            const totalRemaining = await Booking.countDocuments();
            res.json({ "status": "Pack Deleted", "packsLeft": totalRemaining });
        }
    } catch (error) {
        res.json({ "status": "ERROR", "message": error.message });
    }
};