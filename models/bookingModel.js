import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    Id: { type: Number, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    client: { type: String, required: true },
    loc: { type: String, required: true },
    cost: { type: Number, required: true },
    state: { type: String, enum: ['confirmed', 'pending', 'cancelled'], default: 'pending' },
    contact: { type: String, required: true },
    period: { type: String, required: true }
}, { 
    timestamps: true,
    collection: 'bookings'
});

export const Booking = mongoose.model('Booking', bookingSchema);