import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";





export default function CreateSchedul() {
    const [formData, setFormData] = useState({
      progressState: "",
        description: "",
        date: "",
        state: [],
      });
  
  
  const [publishError, setPublishError] = useState(null);
  const [Error, setError] = useState(null);
  const navigate = useNavigate();
  console.log(formData)

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value.trim() });
  };

  const handleExerciseChange = (index, field, value) => {
    const updatedState = [...formData.state];
    updatedState[index][field] = value.trim();
    setFormData({ ...formData, state: updatedState });
  };

  const handleAddExercise = () => {
    setFormData({
      ...formData,
      state: [...formData.state, { name: "", completed: "", burend_callary: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {


      


      const res = await fetch("http://localhost:8081/api/CreateProgress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          date: new Date(formData.date).toISOString(), // Convert date to ISO format
      }),

      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(``);
        alert("successfull");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

 
  const handleDateChange = (e) => {
    const date = e.target.value.trim(); // Remove leading/trailing spaces
    const datePattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/\d{2}$/;
  
    if (!datePattern.test(date)) {
      setError("Invalid date format. Please use mm/dd/yy format.");
    } else {
      setFormData({ ...formData, date: date });
      setError(null); // Clear error message if date is valid
    }
  };

 
 
  
  
  

  return (
    <div>
    <Header />
    <div className="relative">
      <img
        src="https://images.pexels.com/photos/5965698/pexels-photo-5965698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Background"
        className="w-full h-[700px] object-cover opacity-90"
      />
  
      <div className="absolute inset-0 flex items-start justify-center mt-8">
        <div className="w-full max-w-4xl px-6 py-8 bg-white bg-opacity-70 rounded-xl shadow-lg">
          <div className="flex justify-end mb-4">
            <Link to="/viewprogreess">
              <button className="bg-gradient-to-r from-slate-500 to-blue-400 text-white font-light rounded-md px-5 py-2 hover:opacity-85 transition">
                My Progress
              </button>
            </Link>
          </div>
  
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Course Name */}
            <div>
              <label className="block font-medium text-gray-800 mb-1">Course Name</label>
              <select
                id="progressState"
                onChange={handleChange}
                required
                className="w-full h-12 px-3 rounded-md bg-slate-100"
              >
                <option value="">Select</option>
                <option value="Unlocking the Basics: A Beginner’s Guide">Unlocking the Basics: A Beginner’s Guide</option>
                <option value="Foundations First: Learn the Essentials">Foundations First: Learn the Essentials</option>
                <option value="Crash Course 101: Get Started Fast">Crash Course 101: Get Started Fast</option>
                <option value="Skill Sprint: Learn in an Hour">Skill Sprint: Learn in an Hour</option>
                <option value="Demo Masterclass: See It in Action">Demo Masterclass: See It in Action</option>
                <option value="Try & Learn: Interactive Demo Course">Try & Learn: Interactive Demo Course</option>
                <option value="QuickStart Demo:Edition">QuickStart Demo: Edition</option>
                <option value="Fast Track Fundamentals">Fast Track Fundamentals</option>
              </select>
            </div>
  
            {/* Date */}
            <div>
              <label className="block font-medium text-gray-800 mb-1">Course Start Date</label>
              <input
                type="date"
                id="date"
                required
                onChange={handleChange}
                className="w-full h-12 px-3 rounded-md bg-slate-100"
              />
              {Error && (
                <p className="text-sm text-red-600 mt-2">{Error}</p>
              )}
            </div>
  
            {/* Description */}
            <div>
              <label className="block font-medium text-gray-800 mb-1">Description</label>
              <textarea
                id="description"
                onChange={handleChange}
                required
                maxLength={1000}
                className="w-full px-3 py-2 rounded-md bg-slate-100 h-24"
                placeholder="Course description..."
              ></textarea>
            </div>
  
            {/* Section Title */}
            <div className="text-center py-2 bg-white rounded-md shadow-sm">
              <h3 className="font-semibold text-xl text-gray-800">My Learning Progress</h3>
            </div>
  
            {/* Progress Items */}
            <div className="space-y-4 max-h-40 overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 pr-2">
              {formData.state.map((exercise, index) => (
                <div key={index}>
                  <p className="text-sm font-semibold text-gray-600">Day {index + 1}</p>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    <input
                      type="text"
                      value={exercise.name}
                      placeholder="Short Description"
                      onChange={(e) => handleExerciseChange(index, "name", e.target.value)}
                      className="bg-slate-100 p-2 rounded-md"
                    />
                    <input
                      type="text"
                      maxLength={2}
                      value={exercise.completed}
                      placeholder="Hours"
                      onChange={(e) => handleExerciseChange(index, "completed", e.target.value)}
                      className="bg-slate-100 p-2 rounded-md"
                    />
                    <input
                      type="text"
                      maxLength={3}
                      value={exercise.burend_callary}
                      placeholder="Time per day"
                      onChange={(e) => handleExerciseChange(index, "burend_callary", e.target.value)}
                      className="bg-slate-100 p-2 rounded-md"
                    />
                  </div>
                </div>
              ))}
            </div>
  
            {/* Buttons */}
            <div className="space-y-3 pt-4">
              <button
                type="button"
                onClick={handleAddExercise}
                className="w-full h-12 bg-gradient-to-r from-slate-500 to-blue-400 text-white rounded-md font-medium hover:opacity-90 transition"
              >
                Add Progress
              </button>
              <button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-slate-500 to-blue-400 text-white rounded-md font-medium hover:opacity-90 transition"
              >
                Submit
              </button>
            </div>
  
            {publishError && (
              <p className="text-sm text-center text-red-600 mt-3">{publishError}</p>
            )}
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  
  );
}
