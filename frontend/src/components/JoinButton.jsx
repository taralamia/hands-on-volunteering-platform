const JoinButton = ({ eventId }) => {
  const handleJoin = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/event/join/${eventId}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to join event");
      alert("Successfully joined event!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <button
      onClick={handleJoin}
      className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Join Event
    </button>
  );
};

export default JoinButton;
