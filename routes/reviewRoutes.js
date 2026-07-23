import express from 'express';
import * as review from '../controllers/reviewController.js';

const router = express.Router();

router.get("/all", review.getAllReviews);
router.post("/add", review.addReview);
router.get("/:id", review.getReviewById);
router.patch("/update/:id", review.updateReview);
router.delete("/delete/:id", review.deleteReview);

export default router;
