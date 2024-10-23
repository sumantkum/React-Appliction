import express from "express"
import { getBookingById, newBooking } from "../Controller/booking-controller.js";

const bookingsRouter = express.Router();

bookingsRouter.get("/:id", getBookingById);
bookingsRouter.post("/", newBooking);  
bookingsRouter.delete("/:id");  

export default bookingsRouter;