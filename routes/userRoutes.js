import express from 'express';
import * as user from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/all", user.getAllUsers);
router.post("/add", user.addUser);
router.post("/login", user.loginUser);
router.post("/logout", user.logoutUser);
router.get("/profile", protect, user.getProfile);
router.get("/:userId/bookings", user.getUserBookings);
router.patch("/update/:userId", user.updateUser);
router.delete("/delete/:userId", user.deleteUser);

export default router;