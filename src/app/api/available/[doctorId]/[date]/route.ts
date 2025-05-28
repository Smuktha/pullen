import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Appointment from "@/models/Appointment";

export async function GET(
  request: Request,
  context: { params: Promise<{ doctorId: string; date: string }> }
) {
  const { doctorId, date } = await context.params;

  await dbConnect();

  const bookedAppointments = await Appointment.find({ doctorId, date });
  const bookedTimes = bookedAppointments.map((appt) => appt.time);

  // Convert date string (YYYY-MM-DD) to JavaScript Date
  const selectedDate = new Date(date);
  const dayOfWeek = selectedDate.getDay(); // 0 = Sun, 6 = Sat

  let ALL_TIME_SLOTS: string[] = [];

  if (dayOfWeek === 6) {
    // Saturday: 8:30 AM – 1:30 PM
    ALL_TIME_SLOTS = [
      "08:30 AM",
      "09:30 AM",
      "10:30 AM",
      "11:30 AM",
      "12:30 PM",
    ];
  } else if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    // Mon–Fri: 8:00 AM – 5:00 PM (1-hr slots with 12 PM lunch break)
    ALL_TIME_SLOTS = [
      "08:00 AM",
      "09:00 AM",
      "10:00 AM",
      "11:00 AM",
      "01:00 PM",
      "02:00 PM",
      "03:00 PM",
      "04:00 PM",
    ];
  } else {
    // Sunday (clinic closed)
    return NextResponse.json({ available: [] });
  }

  const available = ALL_TIME_SLOTS.filter(
    (slot) => !bookedTimes.includes(slot)
  );

  return NextResponse.json({ available });
}
