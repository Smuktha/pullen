import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Appointment from "@/models/Appointment";

export async function GET(request: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const doctorId = searchParams.get("doctorId");
  const date = searchParams.get("date");

  const query: any = {};
  if (doctorId) query.doctorId = doctorId;
  if (date) query.date = date;

  const appointments = await Appointment.find(query).sort({ date: 1, time: 1 });

  return NextResponse.json({ appointments });
}
