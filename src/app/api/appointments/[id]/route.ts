import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Appointment from "@/models/Appointment";
import nodemailer from "nodemailer";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const updates = await request.json();

  await dbConnect();

  // Check if time or date is being updated
  if (updates.date || updates.time || updates.doctorId) {
    // Find if slot is already booked by someone else
    const conflict = await Appointment.findOne({
      _id: { $ne: id }, // exclude current appointment
      doctorId: updates.doctorId,
      date: updates.date,
      time: updates.time,
    });

    if (conflict) {
      return NextResponse.json(
        { error: "Slot already booked" },
        { status: 409 }
      );
    }
  }

  // Update appointment
  const updated = await Appointment.findByIdAndUpdate(id, updates, { new: true });

  if (!updated) {
    return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
  }

  // Send email to customer about rescheduling
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: updated.email,
      subject: "Appointment Rescheduled - Morton Dental",
      text: `Hi ${updated.patientName},\n\nYour appointment with Dr. ${updated.doctorId} has been rescheduled to ${updated.date} at ${updated.time}.\n\nThank you,\nMorton Dental Clinic`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Failed to send reschedule email:", error);
  }

  return NextResponse.json(updated);
}
