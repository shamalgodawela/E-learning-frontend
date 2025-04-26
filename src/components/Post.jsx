import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Post() {
  const { currentUser } = useSelector((state) => state.user);
  const [workouts, setWorkouts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");
  const [ItemDelete, setItemToDelete] = useState("");
  const [commentText, setCommentText] = useState("");
  
  const [selectedPostId, setSelectedPostId] = useState(null);
  console.log(ItemDelete);
 console.log(workouts)
  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`http://localhost:8081/api/Get`);
        const data = await res.json();
        console.log(data)

        if (res.ok) {
            setWorkouts(data);
            console.log("success")
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
        `http://localhost:8081/api/delete/${ItemDelete}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        setWorkouts((prev) => prev.filter((workout) => workout.id !== ItemDelete));
        alert("Post deleted successfully");
       
      } else {
        const text = await res.text(); // Get the text response
        console.log(text); // Log the text response
        alert("Failed to delete post");
        window.location.reload()
      }
    } catch (error) {
      console.log(error.message);
      alert("Failed to delete post");
    }
  };


  const handleLike = async (postId) => {
    try {
        const res = await fetch(`http://localhost:8081/api/like/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.ok) {
            const updatedWorkouts = workouts.map((workout) => {
                if (workout.id === postId) {
                    workout.likes++;
                }
                return workout;
            });
            setWorkouts(updatedWorkouts);
        }
    } catch (error) {
        console.error("Error liking post:", error);
    }
};


const handleComment = async (postId, commentText) => {
  try {
    const res = await fetch(`http://localhost:8081/api/comment/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: commentText }), // Remove userId from the body
    });
    if (res.ok) {
      alert("success")
      window.location.reload()
    }
  } catch (error) {
    console.error("Error posting comment:", error);
  }
};


  

 

  return (
    <div className="bg-[#d9d9da] w-full">
    <div className="flex justify-center items-center">
     
    </div>

    <div className="flex justify-center mt-4">
      <div className="flex flex-wrap justify-center gap-8">
      <div className="max-h-[700px] w-full overflow-y-auto  scrollbar-none">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="w-[550px] h-[720px] bg-white mt-10 mb-5 border-none rounded-2xl "
          >
            <div className="px-6 py-4">
                <div className="">
                <div className='flex gap-3 ml-4  '>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKZlWLRo3OI75pbxkdGmOroW61puXOYFNIjOl26AiHeg&s"  alt=""  className='w-10 h-10 object-cover mt-2 rounded-full'/>
          
            <div>
                <h1 className='text-slate-800 font-medium mt-3'> Sanaraaa123</h1>
                <h4 className="text-[10px]  text-gray-800 whitespace-nowrap">{moment(workout.created).format("YYYY-MM-DD HH:mm:ss")}</h4>
               
            </div>
            <div className="flex gap-4 ml-72">
            <Link to={`/updatepost/${workout.id}`}>
              <img className="w-5 h-5 " src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png"/>
        
              </Link>

            <button className="mt-[-29px]" onClick={() => {
                      setItemToDelete(workout.id);
                      handleDeleteUser();
                    }}>
                            <img     className="w-5 h-5 " src="https://cdn.icon-icons.com/icons2/1157/PNG/512/1487086345-cross_81577.png"/>
            </button>
            

            </div>
            


        </div>
        

                </div>
               
               <div className="flex gap-2 ml-4 mt-2 ">
                <div className="text-blue-700">
                #post#popular
                </div>
               <div className="  text-gray-700 "> 
                  
                   {workout.title} </div>

               </div>
                

              <div className="mt-5">
              <img src={workout.image && workout.image[0]} alt="" className='w-[500px] h-80 mt-2 rounded-xl'/>
              </div>



              <div className=" flex gap-2 mt-4">
                <div>
               
                <button className="mt-3 ml-1 " onClick={() => handleLike(workout.id)}> <FontAwesomeIcon icon={faHeart} className=" text-border hover:text-red-100 text-red-700 text-2xl" /></button>
                <div className="ml-4 text-[10px]">{workout.likes}</div>
                </div>
            <button onClick={() => setSelectedPostId(workout.id)}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT39MC8P4nQc7W1X59HDxu66eEfGlUfNURWjW7IIUuirA&s"  alt=""  className='w-8 h-8 object-cover mt-[-6px] rounded-full'/>
            </button>
             
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSRxA34bc9afVlpRRAEXhaHkX-KBdT9gn3CUaqJDXftA&s"  alt=""  className='w-8 h-8 object-cover mt-2 rounded-full'/>
                

              </div>
             
             <div className="flex gap-2">
             <h3 className="font-semibold text-md text-gray-700 mt-4 mb-2">
              Saranaaa
              </h3>
              <h3 className="font-extralight text-sm text-gray-700 mt-5 w-[400px] break-words ">
              {workout.content}
              </h3>

             </div>
             <div className="mt-2 flex">
             


             {selectedPostId === workout.id && (
                      <>
                        <input
                          type="text"
                          value={commentText}
                          maxLength={20}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder=" Comment..."
                          className="w-[420px] ml-2 text-slate-700 h-10 rounded-full bg-slate-50"
                        />
                        <button className=" ml-8 text-blue-700 font-medium" onClick={() => handleComment(workout.id, commentText)}>Post</button>
                      </>
                    )}

                  
                  
              
             </div>

             

             <div className="w-[500px] h-[85px] rounded-2xl bg-slate-50 mt-4">
              <div className="flex  ml-4 font-medium text-gray-400">Comment</div>
             <div className="max-h-14 overflow-y-auto  scrollbar-none">

                {workout.comments.map((comments, index) => (
                  <div key={index} className="gap-2">
                    <div className="font-extralight text-sm ml-6 mt-2 text-gray-700">
                   {comments.comment}
                    </div>
                    <div className=" ml-8  text-[10px] font-extralight text-gray-600">
                    
                     {moment(comments.createdAt).fromNow()}
                    </div>
                    <div>

                    
                 </div>
                

                  </div>
                ))}

                
                </div>

             </div>
              
              
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  </div>
  );
}



