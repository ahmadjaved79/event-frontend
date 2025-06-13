import { useEffect, useState } from "react";
import axios from "axios";

function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/events").then((res) => {
      setEvents(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📅 Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event._id} className="border rounded p-4 shadow">
            <img src={event.image} alt={event.title} className="w-full h-40 object-cover mb-2" />
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p>{event.description}</p>
            <p><b>Location:</b> {event.location}</p>
            <p><b>Date:</b> {new Date(event.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default EventsPage;
