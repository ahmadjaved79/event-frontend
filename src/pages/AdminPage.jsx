import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://event-backend-vaxm.onrender.com/api/events");
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post("https://event-backend-vaxm.onrender.com/api/events", form, {
        headers: { Authorization: token }
      });
      toast.success("Event added successfully!");
      setForm({ title: "", description: "", date: "", location: "", image: "" });
      fetchEvents();
    } catch (err) {
      console.error("Submit Error:", err.response?.data || err.message);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://event-backend-vaxm.onrender.com/api/events/${id}`, {
        headers: { Authorization: token }
      });
      toast.success("Event deleted");
      fetchEvents();
    } catch (err) {
      console.error("Delete Error:", err.response?.data || err.message);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-6 py-8 font-inter">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight">🛠 Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="mt-4 md:mt-0 px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold shadow-sm"
          >
            Logout
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 border border-gray-200"
        >
          <input
            type="text"
            placeholder="Event Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg"
          />
          <textarea
            placeholder="Event Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg md:col-span-2"
            rows={3}
            required
          />
          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition"
          >
            ➕ Add Event
          </button>
          {loading && (
            <div className="col-span-2 text-center">
              <div className="w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin inline-block" />
            </div>
          )}
        </form>

        {/* Events List */}
        <h2 className="text-xl font-semibold mb-4">📋 All Events</h2>
        <div className="grid gap-6">
          {events.length === 0 ? (
            <p className="text-gray-500">No events found.</p>
          ) : (
            events.map((event) => (
              <div key={event._id} className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h3 className="text-lg font-bold text-blue-700">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.description}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      📍 <strong>{event.location}</strong> | 🗓️{" "}
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    ❌ Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
