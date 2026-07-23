import express from 'express';
import * as packCtrl from '../controllers/bookingController.js';

const router = express.Router();

router.get("/all", packCtrl.getAllBookings);
router.get("/search/location/:loc", packCtrl.searchByLocation);
router.get("/search/cost", packCtrl.searchByCost);
router.get("/search/state/:status", packCtrl.searchByState);
router.get("/search/:id", packCtrl.searchById);
router.post("/add", packCtrl.addBooking);
router.patch("/update/:id", packCtrl.updateBooking);
router.delete("/delete/:id", packCtrl.deleteBooking);

export default router;