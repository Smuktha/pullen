import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Appointment from "@/models/Appointment";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { doctorId, date, time, name, email, phone } = await request.json();

  await dbConnect();

  const existing = await Appointment.findOne({ doctorId, date, time });

  if (existing) {
    return NextResponse.json(
      { error: "Slot already booked" },
      { status: 409 }
    );
  }

  const appointment = await Appointment.create({
    doctorId,
    date,
    time,
    patientName: name,
    email,
    phone,
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // your Gmail
      pass: process.env.EMAIL_PASS, // your app password
    },
  });

  // Email to customer
  const customerMailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Appointment Confirmation - Morton Dental",
    text: `Hi ${name},\n\nYour appointment with Dr. ${doctorId} is confirmed for ${date} at ${time}.\n\nThank you,\nMorton Dental Clinic`,
  };

  // Email to admin
  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL, // add ADMIN_EMAIL in your .env
    subject: `New Appointment Booked: ${name}`,
    text: `
New appointment details:
Doctor: ${doctorId}
Date: ${date}
Time: ${time}
Patient Name: ${name}
Email: ${email}
Phone: ${phone}
    `,
  };

  try {
    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(customerMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);
  } catch (error) {
    console.error("Failed to send email:", error);
  }

  return NextResponse.json({ success: true, appointment });
}

export async function GET() {
  await dbConnect();
  const appointments = await Appointment.find();
  return NextResponse.json(appointments);
}
