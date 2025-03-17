import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import FilterBar from "../components/FilterBar";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const query = new URLSearchParams(filters).toString();
        const response = await fetch(
          `http://localhost:5000/event/viewEvents?${query}`
        );
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-4">Upcoming Events</h2>
      <FilterBar onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event._id} event={event} />)
        ) : (
          <p>No events found matching the filters.</p>
        )}
      </div>
    </div>
  );
};

export default EventList;
