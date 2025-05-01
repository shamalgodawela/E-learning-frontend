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
    <div className=" relative">


<div className="absolute transform -translate-x-0 translate-y-0 top-1  ml-6 ">



     <div>
    
    <div className="mt-4">
    <Link to="/CreateProgress">
        <button className="bg-gradient-to-r from-slate-500 to-blue-white bg-opacity-80  w-32 h-10 border border-slate-300 shadow-xl rounded-lg text-white hover:opacity-85 ml-[1240px]  font-extralight  text-opacity-75">New Progress</button>
        </Link>
        </div>
        
        <div className="w-[640px] ml-[400px] h-[700px] mt-[-60px] bg-opacity-80 bg-[#d9d9da] "> 
        <div className="flex justify-center items-center">
      <h1 className="text-5xl font-serif text-slate-800 text-opacity-70 mt-6">
        My progress
      </h1>
    </div>
        <div className="max-h-[550px] w-full overflow-y-auto  scrollbar-none">
    <div className="flex justify-center mt-4">
      <div className="flex flex-wrap justify-center gap-8">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="w-[600px] h-[620px] shadow-lg bg-white     mt-10 mb-5 border rounded-2xl relative z-10 "
          >
            <div className="px-6 py-4">
                <div className="flex justify-center items-center  border rounded-xl  ">
                <h2 className="font-extralight text-xl text-black  mb-2 truncate">
                Cours name: {workout.ProgressState}
              </h2>

                </div>
              
              <p className="font-semibold text-black ">Description</p>
              <p className=" text-black text-[12px]  w-20px break-words">
                 {workout.description}
              </p>

             
              <div>
                <p className="font-semibold text-xl text-black">
                    Start Date
                </p>
              <p className="font-extralight text-xl text-black ">
           
             {moment(workout.date).format("YYYY-MM-DD HH:mm:ss")}
              </p>

              </div>
             
             
              <div className="font-medium text-black text-opacity-70   h-10 ml-1 rounded-xl    mt-4 mb-2">
             
                <div className=" flex justify-center text-2xl font-serif   items-center  mt-4 cursor-pointer">
              My Current learning progress
                </div>
               
            
              </div>
              <div>
              <div className="max-h-44 overflow-y-auto  scrollbar-none bg-slate-600 rounded-xl bg-opacity-10">
                {workout.state.map((state, index) => (
                  <div key={index} className="gap-2 ml-4   rounded-xl  ">
                    <div className="font-serif bg-slate-200 rounded-xl  text-black">
                   <div className="ml-4"> Description:{state.name}</div>
                    </div>
                    <div className="font-medium text-slate-800">
                    Studies Hours: {state.completed}
                    </div>
                    <div>

                    <div className="font-medium text-slate-800">
                    Per Day Study Times: {state.burend_callary}
                   
                    </div>
                 </div>
                <hr  className="text-black"/>

                  </div>
                ))}

                
                </div>
                <div className="flex justify-center mt-3 gap-10">
                     
                     <Link to={`/updateworkout/${workout.id}`}>
                     <button className="text-lg bg-gradient-to-r from-slate-500 to-blue-white  border bg-opacity-80  hover:opacity-85 rounded-xl shadow-lg  w-20 text-black font-medium">Edit</button>
                     </Link>
                   
                    <button  onClick={() => {
                      setItemToDelete(workout.id);
                      handleDeleteUser();
                    }} className="text-lg bg-gradient-to-r from-slate-500 to-blue-white border  bg-opacity-80  hover:opacity-85 rounded-xl shadow-lg  w-20 text-black font-medium">Delete</button>
                   

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  </div>
  <Footer/>
  </div>
  );
}

