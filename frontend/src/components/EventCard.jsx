import { Link } from "react-router-dom";

const EventCard = ({ event }) => (
  <div className="border p-4 rounded shadow bg-white">
    <h3 className="text-xl font-semibold">{event.title}</h3>
    <p>{event.description}</p>
    <p>
      <strong>Location:</strong> {event.location}
    </p>
    <Link
      to={`/event/${event._id}`}
      className="text-blue-500 mt-2 inline-block"
    >
      View Details
    </Link>
  </div>
);

export default EventCard;
