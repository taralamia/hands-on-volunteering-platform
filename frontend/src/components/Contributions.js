import { useEffect, useState } from "react";

const Contributions = () => {
  const [contributions, setContributions] = useState(null);

  useEffect(() => {
    fetch("/api/contributions")
      .then((res) => res.json())
      .then((data) => setContributions(data))
      .catch((err) => console.error("Error fetching contributions:", err));
  }, []);

  if (!contributions) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h2 className="text-3xl font-semibold mt-6">Your Contributions</h2>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-4">
        <p><strong>Hours Volunteered:</strong> {contributions.hours}</p>
        <p><strong>Organizations Helped:</strong> {contributions.organizations}</p>
        <p><strong>Achievements:</strong> {contributions.achievements}</p>
      </div>
    </div>
  );
};

export default Contributions;
