import { useEffect, useState } from "react";
import axios from "axios";

function AdminPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    image: ""
  });
  const [events, setEvents] = useState([]);

  const fetchEvents = () => {
    axios.get("http://localhost:5000/api/events").then((res) => setEvents(res.data));
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/events", form);
    setForm({ title: "", description: "", date: "", location: "", image: "" });
    fetchEvents();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/events/${id}`);
    fetchEvents();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🛠 Admin Panel</h1>

      {/* Add Event Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="p-2 border"
        />
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="p-2 border"
        />
        <input
          type="date"
          placeholder="Date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="p-2 border"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="p-2 border"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="p-2 border md:col-span-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded col-span-2">Add Event</button>
      </form>

      {/* Events List */}
      <h2 className="text-xl font-semibold mb-2">📋 All Events</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((event) => (
          <div key={event._id} className="border p-4 mb-2 rounded shadow-sm">
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p>{event.description}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <button
              onClick={() => handleDelete(event._id)}
              className="bg-red-500 text-white px-3 py-1 mt-2 rounded"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminPage;
