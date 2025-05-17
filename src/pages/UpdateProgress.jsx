import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


import Footer from "../components/Footer";
import Header from "../components/Header";


export default function CreateSchedul() {
    const [formData, setFormData] = useState({
      _id:"",
      progressState: "",
        description: "",
        date: "",
        state: [],
      });
  
      const { workId } = useParams();
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
      state: [...formData.state, { name: "", completed: "", burned_calories: "" }],
    });
  };


  useEffect(() => {
    try {
      const fetchworkout = async () => {
        const res = await fetch(`http://localhost:8081/api/Progress?itemId=${workId}`);
        const data = await res.json();
        console.log("data", data);

        if (!res.ok) {
          console.log(data.message);
        }
        if (res.ok) {
            const selected = data.find((workout) => workout.id === workId);
            if (selected) {
              setFormData({ ...selected, _id: selected.id });
            }
          }
      };
      fetchworkout();
    } catch (error) {
      console.log(error.message);
    }
  }, [workId]);





  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8081/api/ProgressUp/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        alert("succesfull")
       
      }
    } catch (error) {
        setPublishError("Something went wrong");
    }
  };

 


 
  
  
  
  

  return (
    <div>
      <Header/>
    <div className="relative">
    {/* Background Image */}
    <img
      src="https://images.pexels.com/photos/12960389/pexels-photo-12960389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      alt="Workout background"
      className="w-full h-[700px] object-cover opacity-95"
    />
  
    {/* Top Right Button */}
  
  
    {/* Form Container */}
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-6">
    <div className="max-h-[550px] overflow-y-auto px-6 pt-4 scrollbar-none">
      <div className="bg-white bg-opacity-30 p-6 rounded-xl shadow-xl">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          
          {/* Course Name */}
          <div>
            <label htmlFor="progressState" className="font-semibold text-black block mb-1">Course Name</label>
            <select
              id="progressState"
              onChange={handleChange}
              value={formData.progressState}
              required
              className="w-full md:w-[300px] p-3 rounded-lg bg-slate-100 bg-opacity-80"
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
  
          {/* Start Date */}
          <div>
            <label htmlFor="date" className="font-semibold text-black block mb-1">Start Date</label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              required
              maxLength={80}
              className="w-full p-3 rounded-lg bg-slate-100 bg-opacity-80"
            />
           
          </div>
  
          {/* Description */}
          <div>
            <label htmlFor="description" className="font-semibold text-black block mb-1">Description</label>
            <textarea
              id="description"
              placeholder="Enter workout description"
              onChange={handleChange}
              value={formData.description}
              required
              maxLength={80}
              className="w-full h-24 p-3 rounded-lg bg-slate-100 bg-opacity-80 resize-none"
            />
          </div>
  
          {/* Progress Updates */}
          <div>
            <h3 className="text-xl font-serif text-black text-center bg-white bg-opacity-80 rounded-lg py-2">My Learning Progress</h3>
            <div className="max-h-36 overflow-y-auto scrollbar-none mt-2 space-y-4">
              {formData.state.map((exercise, index) => (
                <div key={index}>
                  <label className="font-semibold text-black block mb-1">Day {index + 1}</label>
                  <input
                    type="text"
                    placeholder="Enter description"
                    value={exercise.name}
                    onChange={(e) => handleExerciseChange(index, "name", e.target.value)}
                    className="w-full md:w-[300px] p-3 rounded-lg bg-slate-100 bg-opacity-80"
                  />
                </div>
              ))}
            </div>
          </div>
  
          {/* Action Buttons */}
          <div className="flex flex-col gap-4 mt-4">
            <button
              type="button"
              onClick={handleAddExercise}
              className="w-full bg-gradient-to-r from-slate-500 to-white text-white font-serif p-3 rounded-lg border border-slate-300 shadow-xl hover:opacity-90"
            >
              Update Current Progress
            </button>
  
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-700 to-white text-white font-serif p-3 rounded-lg border border-slate-300 shadow-xl hover:opacity-90"
            >
              Update Progress
            </button>
  
            {publishError && (
              <p className="mt-2 text-red-700 text-center font-serif text-opacity-80">
                {publishError}
              </p>
            )}
          </div>
        </form>
      </div>
      </div>
    </div>
  </div>
  <Footer/>
  </div>
  
  );
}

