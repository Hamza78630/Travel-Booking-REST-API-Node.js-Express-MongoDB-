import { Review } from '../models/reviewModel.js';
import { User } from '../models/userModel.js';
import { Booking } from '../models/bookingModel.js';

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json({ "status": "Success", "reviews": reviews });
    } catch (error) {
        res.json({ "status": "ERROR", "message": error.message });
    }
};

export const addReview = async (req, res) => {
    try {
        const { userId, bookingId, rating, comment } = req.body;

        const user = await User.findOne({ userId });
        if (!user) return res.json({ "status": "ERROR", "message": "User not found" });

        const booking = await Booking.findOne({ Id: bookingId });
        if (!booking) return res.json({ "status": "ERROR", "message": "Booking not found" });

        const lastReview = await Review.findOne().sort({ reviewId: -1 });
        const reviewId = lastReview ? lastReview.reviewId + 1 : 1;

        const newReview = new Review({
            reviewId,
            userId: user._id,
            bookingId: booking._id,
            rating,
            comment
        });

        await newReview.save();
        res.json({ "status": "Review Added", "review": newReview });
    } catch (error) {
        res.json({ "status": "ERROR", "message": error.message });
    }
};

export const getReviewById = async (req, res) => {
    try {
        const reviewId = parseInt(req.params.id);
        const review = await Review.findOne({ reviewId });
        if (!review) return res.json({ "status": "ERROR", "message": "Review not found" });

        res.json({ "status": "Success", "review": review });
    } catch (error) {
        res.json({ "status": "ERROR", "message": error.message });
    }
};

export const updateReview = async (req, res) => {
    try {
        const reviewId = parseInt(req.params.id);
        const { rating, comment } = req.body;

        const updated = await Review.findOneAndUpdate(
            { reviewId },
            { rating, comment },
            { new: true }
        );

        if (!updated) return res.json({ "status": "ERROR", "message": "Review not found" });

        res.json({ "status": "Review Updated", "review": updated });
    } catch (error) {
        res.json({ "status": "ERROR", "message": error.message });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const reviewId = parseInt(req.params.id);
        const deleted = await Review.findOneAndDelete({ reviewId });

        if (!deleted) return res.json({ "status": "ERROR", "message": "Review not found" });

        res.json({ "status": "Review Deleted", "review": deleted });
    } catch (error) {
        res.json({ "status": "ERROR", "message": error.message });
    }
};
