"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Appointment = {
  _id: string;
  doctorId: string;
  date: string;
  time: string;
  patientName: string;
  email: string;
  phone: string;
};

export default function AdminPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true); // Start with loading = true
  const [authorized, setAuthorized] = useState(false); // Flag for login status

  // Check login on component mount
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      router.push("/admin/login");
    } else {
      setAuthorized(true); // Allow rendering
      fetchAppointments();
    }
    setLoading(false); // Stop loading after check
  }, [router]);

  // Fetch appointments from your API
  async function fetchAppointments() {
    try {
      const res = await fetch("/api/appointments");
      if (!res.ok) throw new Error("Failed to fetch appointments");
      const data = await res.json();
      setAppointments(data);
    } catch (error) {
      alert("Error loading appointments");
    }
  }

  async function updateAppointment(id: string, updates: Partial<Appointment>) {
    const res = await fetch(`/api/appointments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    if (res.ok) {
      fetchAppointments(); // refresh list after update
    } else {
      alert("Failed to update appointment");
    }
  }

  function handleLogout() {
    localStorage.removeItem("isAdmin");
    router.push("/admin/login");
  }

  if (loading) {
    return <p className="p-6">Checking login status...</p>;
  }

  if (!authorized) {
    return null; // Prevent flashing the admin UI
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin - Manage Appointments</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-800 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Doctor</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Time</th>
              <th className="border border-gray-300 p-2">Patient</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Phone</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id}>
                <td className="border border-gray-300 p-2">{appt.doctorId}</td>
                <td className="border border-gray-300 p-2">{appt.date}</td>
                <td className="border border-gray-300 p-2">{appt.time}</td>
                <td className="border border-gray-300 p-2">{appt.patientName}</td>
                <td className="border border-gray-300 p-2">{appt.email}</td>
                <td className="border border-gray-300 p-2">{appt.phone}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => {
                      const newTime = prompt(
                        "Enter new time (e.g. 10:00 AM):",
                        appt.time
                      );
                      if (newTime) {
                        updateAppointment(appt._id, { time: newTime });
                      }
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit Time
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
