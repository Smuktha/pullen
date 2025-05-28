import { Schema, model, models } from "mongoose";

const appointmentSchema = new Schema({
  doctorId: { type: String, required: true },
  date: { type: String, required: true }, // ISO date or 'YYYY-MM-DD' string
  time: { type: String, required: true }, // e.g. "09:00 AM"
  patientName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
}, { timestamps: true });

const Appointment = models.Appointment || model("Appointment", appointmentSchema);

export default Appointment;
