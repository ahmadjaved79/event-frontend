import { useEffect, useState } from "react";
import axios from "axios";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("https://event-backend-vaxm.onrender.com/api/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to load events", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white px-4 py-6">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">🎉 Upcoming Events</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by title or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center mt-10">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredEvents.length === 0 ? (
        <p className="text-center text-gray-600">No matching events found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="bg-blue-50 border border-blue-100 p-5 rounded-lg shadow hover:shadow-lg transition"
            >
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h2 className="text-xl font-bold text-blue-800 mb-1">{event.title}</h2>
              <p className="text-gray-700 mb-2 text-sm">{event.description}</p>
              <p className="text-sm text-gray-500">
                📅 {new Date(event.date).toLocaleDateString()} <br />
                📍 {event.location}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventsPage;
