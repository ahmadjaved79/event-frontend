import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./theme.css";

function HomePage() {
  const [dark, setDark] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const body = document.body;
    if (dark) {
      body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const testimonials = [
    {
      name: "Aarav",
      emoji: "🔥",
      text: "EventSphere helped me find my tribe in tech meetups!",
    },
    {
      name: "Fatima",
      emoji: "🌸",
      text: "Clean UI. Smooth UX. I wish every site worked like this.",
    },
    {
      name: "Devansh",
      emoji: "🚀",
      text: "Super fast event browsing — even on slow WiFi!",
    },
    {
      name: "Sneha",
      emoji: "💡",
      text: "I discovered 5 new workshops this week alone. Love it!",
    },
    {
  name: "Ritika",
  emoji: "🎭",
  text: "I accidentally joined an art event and ended up hosting one the next week. This platform is magic!"
},
{
  name: "Kunal",
  emoji: "🧠",
  text: "EventSphere doesn’t just show events — it unlocks opportunities. Got my first speaking gig here!"
}

  ];

  return (
    <div className="container">
      {/* Toggle */}
      <div style={{ textAlign: "right" }}>
        <button onClick={() => setDark(!dark)} className="toggle-btn">
          {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Hero */}
      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1>Welcome to EventSphere 🎉</h1>
        <p style={{ maxWidth: "700px", margin: "0 auto" }}>
          Your one-stop platform for discovering and managing events. Whether you're an organizer or an explorer, EventSphere keeps you connected.
        </p>
        <div style={{ marginTop: "2rem" }}>
          <Link to="/events">
            <button className="nav-btn mb-4 md:mb-6 lg:mb-8">📅 Browse Events</button>
          </Link>
          <Link to="/login">
            <button className="nav-btn">🔐 Admin Login</button>
          </Link>
        </div>
      </header>

      {/* Testimonials */}
      <section>
        <h2 style={{ textAlign: "center" }}>🗣️ What Users Are Saying</h2>
        <div className="testimonials">
          {testimonials.map((t, idx) => (
            <div key={idx} className="card">
              <p style={{ fontStyle: "italic" }}>“{t.text}”</p>
              <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                — {t.name} {t.emoji}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
