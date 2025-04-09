import { useNavigate } from "react-router-dom";

const EventPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-semibold mb-6">Event Management</h2>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-4">
        {/* Create Event Button */}
        <button
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => navigate("/event/createEvents")}
        >
          Create Event
        </button>

        {/* Join Event Button */}
        <button
          className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
          onClick={() => navigate("/event/join")} // Navigate to the event join page
        >
          Join Event
        </button>

        {/* View Event Details Button */}
        <button
          className="w-full p-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          onClick={() => navigate("/event/details")} // Navigate to the event details page
        >
          View Event Details
        </button>
      </div>
    </div>
  );
};

export default EventPage;
