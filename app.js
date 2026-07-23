import express from 'express';
import connectDB from './config/db.js';
import bookingRoutes from './routes/bookingRoutes.js';
import userRoutes from './routes/userRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

const app = express();
app.use(express.json());

connectDB();

app.get("/test", (req, res) => {
    res.send("Server is alive!");
});

app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);
app.use("/reviews", reviewRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`);
});