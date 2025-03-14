import { useEffect, useState } from "react";

const VolunteerHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("/api/history")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error("Error fetching history:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h2 className="text-3xl font-semibold mt-6">Volunteer History</h2>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-4">
        {history.length === 0 ? (
          <p className="text-center">No history available</p>
        ) : (
          history.map((entry, index) => (
            <div key={index} className="border-b py-2">
              <p><strong>Date:</strong> {entry.date}</p>
              <p><strong>Organization:</strong> {entry.organization}</p>
              <p><strong>Description:</strong> {entry.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VolunteerHistory;
