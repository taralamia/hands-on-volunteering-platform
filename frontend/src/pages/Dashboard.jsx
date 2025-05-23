import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-semibold mb-6">Welcome to Your Dashboard</h2>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-4">
        <button
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => navigate("/profile/edit")}
        >
          View Profile
        </button>
        {/* Volunteer History Button */}
        <button
          className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
          onClick={() => navigate("/profile/volunteer-history")}
        >
          Update Volunteer History
        </button>
        {/* Event Button */}
        <button
          className="w-full p-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          onClick={() => navigate("/event/eventPage")}
        >
          Events
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
