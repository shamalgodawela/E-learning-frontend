import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


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
  console.log(formData._id)

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

 
  const handleDateChange = (e) => {
    const date = e.target.value.trim(); // Remove leading/trailing spaces
    const datePattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/\d{2}$/;
  
    if (!datePattern.test(date)) {
      setError("Invalid date format. Please use mm/dd/yy format.");
    } else {
      setFormData({ ...formData, wantdate: date });
      setError(null); // Clear error message if date is valid
    }
  };

 
  
  
  
  

  return (
    <div className="relative ">


<img src="https://images.pexels.com/photos/5965698/pexels-photo-5965698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className="w-full h-[700px] opacity-95 object-cover " />

<div className="absolute transform -translate-x-0 translate-y-0 top-1  ml-[800px] ">
        <div className=" mt-2  ml-[-780px]">

      
      
      <Link to="/Myschedul">
        <button className="bg-gradient-to-r from-slate-500 to-blue-white   bg-opacity-80  w-32 h-10 border border-slate-300 shadow-xl rounded-lg text-white hover:opacity-85 ml-[800px]  font-extralight  text-opacity-75">My Progress</button>
        </Link>
        </div>
        
        
      
       
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">

        
          <div className="w-[550px] h-[600px] border bg-white bg-opacity-30 rounded-lg relative z-10 ">
        <div className="flex justify-center items-center mt-6">
          <form className="flex flex-col  gap-4" onSubmit={handleSubmit} >
            
         
            
            
            <div>
            <h3 className="font-semibold  ml-1 text-black">Course name</h3>
            <select
               className=" bg-slate-100 p-3 bg-opacity-80 rounded-lg w-[200px] h-14"
          
            id="workoutState"
            onChange={handleChange}
            value={formData.progressState}
            required
          >
             <option className="font-serif bg-opacity-80" value="">Select</option>
             <option className="font-serif text-white bg-opacity-80" value="">Select</option>
            <option value="Unlocking the Basics: A Beginner’s Guide">Unlocking the Basics: A Beginner’s Guide</option>
            <option value="Foundations First: Learn the Essentials">Foundations First: Learn the Essentials</option>
            <option value="Crash Course 101: Get Started Fast">Crash Course 101: Get Started Fast</option>
    <option value="Skill Sprint: Learn in an Hour">Skill Sprint: Learn in an Hour</option>
    <option value="Demo Masterclass: See It in Action">Demo Masterclass: See It in Action</option>
    <option value="Try & Learn: Interactive Demo Course">Try & Learn: Interactive Demo Course</option>
    <option value="QuickStart Demo: [Skill/Topic] Edition">QuickStart Demo:Edition</option>
    <option value="Fast Track Fundamentals">Fast Track Fundamentals</option>
    
          </select>
            </div>
            <div>

            <div>
             <h3 className="font-semibold ml-1 text-black ">Start Date</h3>


              <input
               className=" bg-slate-100 p-3 bg-opacity-80 rounded-lg w-[460px] h-11"
                type="text"
                placeholder="mm/dd/yy(add new date)"
                id="Date"
                required
                maxLength={80}
              
                onChange={handleDateChange}
              />
               {Error && (
            <p className="mt-5 text-red-800 font-serif text-opacity-50  w-300 h-7 rounded-lg text-center ">
              {Error}
            </p>)}
            </div>
             <h3 className="font-semibold  ml-1 text-black">Description</h3>


              <textarea
               className=" bg-slate-100 p-3 bg-opacity-80 rounded-lg w-[460px] h-20"
                type="text"
                placeholder=""
                id="description"
                required
                maxLength={80}
              
                onChange={handleChange}
                value={formData.description}
              />
            </div>
          
            <div className="max-h-36 overflow-y-auto  scrollbar-none">
            {formData.state.map((exercise, index) => (
                <div key={index}>
                  <h3 className="font-semibold  ml-1 text-white">Day {index + 1}</h3>
                  <div className="flex gap-4 mt-4">
                    <input className="bg-slate-100 p-3 bg-opacity-80 rounded-lg w-[150px] h-11" type="text" value={exercise.name} placeholder="Enter description"  onChange={(e) => handleExerciseChange(index, "name", e.target.value)}    />
                    <input className="bg-slate-100 p-3 bg-opacity-80 rounded-lg w-[130px] h-11" type="text" value={exercise.completed} placeholder="Enter hours" onChange={(e) => handleExerciseChange(index, "completed", e.target.value)}  />
                    <input className="bg-slate-100 p-3 bg-opacity-80 rounded-lg w-[150px] h-11" type="text" value={exercise.burend_callary} placeholder="time per day" onChange={(e) => handleExerciseChange(index, "burend_callary", e.target.value)}  />
                  </div>
                </div>
              ))}
              </div>
          
          <button className=" bg-gradient-to-r from-slate-500 to-blue-white   bg-opacity-80 text-white border border-slate-300 shadow-xl shadow-slate-400 font-serif  text-opacity-90 p-3 rounded-lg w-[460px] h-11 hover:opacity-90" type="button" onClick={handleAddExercise}>Update Current progress</button>
            <button
              className=" bg-gradient-to-r from-slate-500 to-blue-white   bg-opacity-80 text-white border border-slate-300 shadow-xl shadow-slate-400 font-serif  text-opacity-90 p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
              type="submit"
             
            >
             Update Workout
            </button>

            {publishError && (
            <p className="mt-5 text-red-800 font-serif text-opacity-50  w-300 h-7 rounded-lg text-center ">
              {publishError}
            </p>
          )}
          
          </form>
          
         
         
        </div>
        </div>
      </div>
      </div>
    </div>
  );
}

