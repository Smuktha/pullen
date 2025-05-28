import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Appointment from "@/models/Appointment";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { doctorId, date, time, name, email, phone } = await request.json();

    await dbConnect();

    // Check if the slot is already booked
    const existing = await Appointment.findOne({ doctorId, date, time });
    if (existing) {
      return NextResponse.json(
        { error: "Slot already booked" },
        { status: 409 }
      );
    }

    // Create appointment in DB
    const appointment = await Appointment.create({
      doctorId,
      date,
      time,
      patientName: name,
      email,
      phone,
    });

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail address
        pass: process.env.EMAIL_PASS, // app password or real password
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
      to: process.env.ADMIN_EMAIL, // your admin email in .env
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

    // Send emails in parallel
    await Promise.all([
      transporter.sendMail(customerMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);

    return NextResponse.json({ success: true, appointment });
  } catch (error) {
    console.error("Error in POST /api/appointments:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const appointments = await Appointment.find();
    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error in GET /api/appointments:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
