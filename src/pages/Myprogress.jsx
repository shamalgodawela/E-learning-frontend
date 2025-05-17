import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import moment from 'moment';
import Header from "../components/Header";
import Footer from "../components/Footer";


export default function Myprogress() {
  const { currentUser } = useSelector((state) => state.user);
  const [workouts, setWorkouts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");
  const [ItemDelete, setItemToDelete] = useState("");
  console.log(ItemDelete);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`http://localhost:8081/api/Progress`);
        const data = await res.json();
        console.log(data)

        if (res.ok) {
            setWorkouts(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchItems();
  }, []);




  const handleDeleteUser = async () => {
    try {
      const res = await fetch(
        `http://localhost:8081/api/ProgressDelete/${ItemDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setWorkouts((prev) => prev.filter((workout) => workout.id !== ItemDelete));
        alert("deleted")
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
 


 
 

  return (
    
    
<div>
  <Header/>
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-6">
      <div className="flex justify-end mb-6">
        <Link to="/CreateProgress">
          <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-slate-600 to-blue-400 text-white shadow-lg hover:brightness-110 transition">
            New Progress
          </button>
        </Link>
      </div>

      <div className="max-w-5xl mx-auto bg-white bg-opacity-90 rounded-3xl p-8 shadow-xl">
        <h1 className="text-5xl font-serif text-slate-800 mb-8 text-center tracking-wide">
          My Progress
        </h1>

        <div className="max-h-[600px] overflow-y-auto space-y-10 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-300 p-6 relative hover:shadow-2xl transition-shadow"
            >
              <h2 className="text-2xl font-semibold text-center text-slate-900 mb-4 truncate">
                Course Name: {workout.progressState}
              </h2>

              <div className="mb-4">
                <p className="font-semibold text-lg text-slate-700 mb-1">Description:</p>
                <p className="text-gray-600 text-sm whitespace-pre-wrap">{workout.description}</p>
              </div>

              <div className="mb-6">
                <p className="font-semibold text-lg text-slate-700">Start Date:</p>
                <p className="text-gray-700">{moment(workout.date).format("YYYY-MM-DD HH:mm:ss")}</p>
              </div>

              <h3 className="text-xl font-serif font-medium text-center text-slate-800 mb-4">
                My Current Learning Progress
              </h3>

              <div className="max-h-48 overflow-y-auto bg-gray-50 rounded-xl p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-300">
                {workout.state.map((state, index) => (
                  <div
                    key={index}
                    className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
                  >
                    <p className="font-semibold text-slate-800">Description: {state.name}</p>
                    <p className="text-slate-700">Study Hours: {state.completed}</p>
                    <p className="text-slate-700">Per Day Study Times: {state.burend_callary}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-8 mt-6">
                <Link to={`/updateprogress/${workout.id}`}>
                  <button className="px-5 py-2 bg-gradient-to-r from-slate-600 to-blue-400 text-white rounded-lg shadow-md hover:brightness-110 transition">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => {
                    setItemToDelete(workout.id);
                    handleDeleteUser();
                  }}
                  className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg shadow-md hover:brightness-110 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

