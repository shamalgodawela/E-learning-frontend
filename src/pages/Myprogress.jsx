import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Myprogress() {
  const { currentUser } = useSelector((state) => state.user);
  const [workouts, setWorkouts] = useState([]);
  const [itemToDelete, setItemToDelete] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`http://localhost:8081/api/Progress`);
        const data = await res.json();
        if (res.ok) setWorkouts(data);
      } catch (err) {
        console.error(err.message);
        setError("Failed to load progress.");
      }
    };
    fetchItems();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(
        `http://localhost:8081/api/ProgressDelete/${itemToDelete}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (res.ok) {
        setWorkouts((prev) =>
          prev.filter((workout) => workout.id !== itemToDelete)
        );
        alert("Deleted successfully");
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-900 to-gray-800">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-white">My Progress</h1>
          <Link to="/CreateProgress">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              New Progress
            </button>
          </Link>
        </div>

        {error && (
          <p className="mb-4 text-red-600 text-center">{error}</p>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
            >
              <div className="px-6 py-4 flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                  Course: {workout.ProgressState}
                </h2>

                <div className="mb-4">
                  <h3 className="font-medium text-gray-700">Description</h3>
                  <p className="text-gray-600 text-sm break-words">
                    {workout.description}
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="font-medium text-gray-700">Start Date</h3>
                  <p className="text-gray-600 text-sm">
                    {moment(workout.date)}
                  </p>
                </div>

                <fieldset className="border-t border-gray-200 pt-4">
                  <legend className="text-gray-700 font-medium mb-2">
                    Learning Progress
                  </legend>
                  <div className="space-y-3 max-h-36 overflow-y-auto">
                    {workout.state.map((entry, idx) => (
                      <div key={idx} className="bg-gray-100 rounded-lg p-2">
                        <p className="text-gray-800 text-sm">
                          <span className="font-semibold">Day {idx + 1}:</span>{" "}
                          {entry.name}
                        </p>
                        <p className="text-gray-700 text-xs">
                          Hours: {entry.completed} | Time per day:{" "}
                          {entry.burend_callary}
                        </p>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>

              <div className="px-6 py-4 bg-gray-50 flex justify-between">
                <Link to={`/updateworkout/${workout.id}`}>
                  <button className="px-3 py-1 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 focus:outline-none">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => {
                    setItemToDelete(workout.id);
                    handleDeleteUser();
                  }}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {workouts.length === 0 && !error && (
          <p className="text-center text-gray-600 mt-8">
            No progress entries yet.
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
}
