"use client"; 
import { useState, useEffect } from "react";
 
export default function AppointmentPage() {
  const [doctors] = useState([
    { _id: "dr-jason1", name: "DR JASON PHAN" },
    { _id: "dr-james1", name: "DR JAMES CHIEN" },
  ]);

  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    time: "",
  });
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      fetch(`/api/available/${selectedDoctor}/${selectedDate}`)
        .then((res) => res.json())
        .then((data) => setAvailableSlots(data.available))
        .catch(() => setAvailableSlots([]));
    }
  }, [selectedDoctor, selectedDate]);

  useEffect(() => {
    if (popupVisible) {
      const timer = setTimeout(() => setPopupVisible(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [popupVisible]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.time) {
      setPopupMessage("⚠️ Please select a time slot");
      setPopupVisible(true);
      return;
    }

    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doctorId: selectedDoctor,
        date: selectedDate,
        time: form.time,
        name: form.name,
        email: form.email,
        phone: form.phone,
      }),
    });

    const result = await res.json();

    if (res.ok) {
      setPopupMessage("✅ Appointment booked successfully!\n📧 Please check your email.");
      setPopupVisible(true);
      setForm({ name: "", email: "", phone: "", time: "" });
      setSelectedDoctor("");
      setSelectedDate("");
      setAvailableSlots([]);
    } else {
      setPopupMessage(result.error || "❌ Something went wrong.");
      setPopupVisible(true);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4 relative">
      <h1 className="text-2xl font-bold mb-6">Book an Appointment</h1>

      {/* Success Popup Modal */}
      {popupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md text-center relative animate-fade-in">
            <button
              onClick={() => setPopupVisible(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
            <div className="text-green-600 text-3xl mb-2">✅</div>
            <h2 className="text-lg font-semibold mb-1">Appointment Booked!</h2>
            <p className="text-gray-700 whitespace-pre-line">{popupMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          className="w-full border rounded p-2"
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="w-full border rounded p-2"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          required
        />

        <select
          className="w-full border rounded p-2"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          required
          disabled={!availableSlots.length}
        >
          <option value="">Select Time Slot</option>
          {availableSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Your Name"
          className="w-full border rounded p-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Your Email"
          className="w-full border rounded p-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="tel"
          placeholder="Your Phone"
          className="w-full border rounded p-2"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}
