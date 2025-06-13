import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventsPage from "./pages/EventsPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/events" element={<EventsPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
