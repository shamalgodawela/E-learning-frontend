import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import Footer from "./Footer";


export default function Post() {
  const { currentUser } = useSelector((state) => state.user);
  const [workouts, setWorkouts] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`http://localhost:8081/api/Get`);
        const data = await res.json();
        if (res.ok) {
          setWorkouts(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchItems();
  }, []);

  //done
  const handleDeleteUser = async (postId) => {
    try {
      const res = await fetch(`http://localhost:8081/api/delete/${postId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setWorkouts((prev) => prev.filter((workout) => workout.id !== postId));
        alert("Post deleted successfully");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // handle like 
  const handleLike = async (postId) => {
    try {
      const res = await fetch(`http://localhost:8081/api/like/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        setWorkouts((prev) =>
          prev.map((w) =>
            w.id === postId ? { ...w, likes: w.likes + 1 } : w
          )
        );
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  //comment
  const handleComment = async (postId, commentText) => {
    try {
      const res = await fetch(`http://localhost:8081/api/comment/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: commentText }),
      });
      if (res.ok) {
        alert("Comment added!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleEditComment = async (postId, commentId) => {
    try {
      const res = await fetch(
        `http://localhost:8081/api/${postId}/${commentId}/comments`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: editedCommentText }),
        }
      );
      if (res.ok) {
        alert("Comment updated!");
        window.location.reload();
      }
    } catch (err) {
      console.error("Error editing comment:", err);
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      const res = await fetch(
        `http://localhost:8081/api/${postId}/comments/${commentId}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        alert("Comment deleted!");
        window.location.reload();
      }
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const handleShare = (postId) => {
    const postLink = window.location.origin + `/share/${postId}`;
    navigator.clipboard.writeText(postLink)
      .then(() => {
        setNotification("Link copied!");
      })
      .catch((error) => {
        console.error('Failed to copy: ', error);
        setNotification("Failed to copy link.");
      });
  };

  return (
    <div>
      <Header/>
    <div className="relative w-full">
      <img
        src="https://images.pexels.com/photos/5965698/pexels-photo-5965698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt=""
        className="w-full h-[700px] opacity-95 object-cover"
      />

      <div className="absolute top-0 bg-[#d9d9da] bg-opacity-95 ml-[480px]">
        {/* <Link to="/create">
          <button className="bg-white bg-opacity-80 w-32 h-10 border mt-2 border-slate-300 shadow-xl rounded-lg text-black hover:opacity-85 font-extralight text-opacity-75">
            New post
          </button>
        </Link>
        <Link to="/CreateProgress">
          <button className="bg-white bg-opacity-80 w-32 h-10 border mt-2 border-slate-300 shadow-xl rounded-lg text-black hover:opacity-85 font-extralight text-opacity-75">
            new progress
          </button>
        </Link> */}

        <div className="flex justify-center mt-0">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="max-h-[655px] w-full overflow-y-auto scrollbar-none">
              {workouts.map((workout) => (
                <div
                  key={workout.id}
                  className="w-[550px] h-auto bg-white mt-10 mb-5 border-none rounded-2xl relative z-10"
                >
                  <div className="px-6 py-4">
                    <div className="flex gap-3 ml-4">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUA61gIlA_YnqrwGhxKIffyTO-f8B1V44Y9ypZDKV2pQ&s"
                        alt=""
                        className="w-10 h-10 object-cover mt-2 rounded-full"
                      />

                      <div>
                        <h1 className="text-slate-800 font-medium mt-3">
                          Ranyan123
                        </h1>
                        <h4 className="text-[10px] text-gray-800 whitespace-nowrap">
                          {moment(workout.created).format(
                            "YYYY-MM-DD HH:mm:ss"
                          )}
                        </h4>
                      </div>

                      <div className="flex gap-4 ml-72">
                        <Link to={`/updatepost/${workout.id}`}>
                          <img
                            className="w-5 h-5"
                            src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png"
                          />
                        </Link>
                        <button className="mt-[-29px]" onClick={() => handleDeleteUser(workout.id)}>
                          <img
                            className="w-5 h-5"
                            src="https://cdn.icon-icons.com/icons2/1157/PNG/512/1487086345-cross_81577.png"
                          />
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4 mt-2">
                      <div className="text-blue-700">#post#popular</div>
                      <div className="text-gray-700">{workout.title}</div>
                    </div>

                    <img
                      src={workout.image && workout.image[0]}
                      alt=""
                      className="w-[500px] h-80 mt-5 rounded-xl"
                    />

<div className=" flex gap-2 mt-4">
                <div>
               
                <button className="mt-3 ml-1 " onClick={() => handleLike(workout.id)}> <FontAwesomeIcon icon={faHeart} className=" text-border hover:text-red-100 text-red-700 text-2xl" /></button>
                <div className="ml-4 text-[10px]">{workout.likes}</div>
                </div>
            <button onClick={() => setSelectedPostId(workout.id)}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT39MC8P4nQc7W1X59HDxu66eEfGlUfNURWjW7IIUuirA&s"  alt=""  className='w-8 h-8 object-cover mt-[-6px] rounded-full'/>
            </button>
             
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSRxA34bc9afVlpRRAEXhaHkX-KBdT9gn3CUaqJDXftA&s" onClick={() => handleShare(workout.id)}  alt=""  className='w-8 h-8 object-cover mt-2 rounded-full'/>
             

              </div>

                    <div className="flex gap-2">
                      <h3 className="font-semibold text-md text-gray-700 mt-4 mb-2">
                        Ranyan
                      </h3>
                      <h3 className="font-extralight text-md text-gray-700 mt-5 w-[400px] break-words">
                        {workout.content}
                      </h3>
                    </div>

                    {selectedPostId === workout.id && (
                      <div className="mt-2 flex">
                        <input
                          type="text"
                          value={commentText}
                          maxLength={20}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder=" Comment..."
                          className="w-[420px] ml-2 text-slate-700 h-10 rounded-full bg-slate-50"
                        />
                        <button
                          className="ml-8 text-blue-700 font-medium"
                          onClick={() =>
                            handleComment(workout.id, commentText)
                          }
                        >
                          Post
                        </button>
                      </div>
                    )}

                    <div className="w-[500px] min-h-[85px] rounded-2xl bg-slate-50 mt-4 p-2">
                      <div className="flex ml-2 font-medium text-gray-400">
                        Comment
                      </div>
                      <div className="max-h-20 overflow-y-auto scrollbar-none mt-2">
                        {workout.comments.map((comment, index) => (
                          <div key={index} className="ml-4 mt-2">
                            {editingCommentId === comment.commentId ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={editedCommentText}
                                  onChange={(e) =>
                                    setEditedCommentText(e.target.value)
                                  }
                                  className="border rounded px-2 py-1 text-sm"
                                />
                                <button
                                  onClick={() =>
                                    handleEditComment(
                                      workout.id,
                                      comment.commentId
                                    )
                                  }
                                  className="text-blue-500 text-xs"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingCommentId(null)}
                                  className="text-gray-500 text-xs"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <>
                                <div className="text-sm text-gray-700">
                                  {comment.comment}
                                </div>
                                <div className="text-[10px] text-gray-600">
                                  {moment(comment.createdAt).fromNow()}
                                </div>
                                <div className="flex gap-2 text-xs mt-1">
                                  <button
                                    className="text-blue-500"
                                    onClick={() => {
                                      setEditingCommentId(comment.commentId);
                                      setEditedCommentText(comment.comment);
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="text-red-500"
                                    onClick={() =>
                                      handleDeleteComment(
                                        workout.id,
                                        comment.commentId
                                      )
                                    }
                                  >
                                    Delete
                                  </button>
                                </div>
                              </>
                            )}
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
      {notification && (
        <div className="fixed bottom-4 right-4 z-50 bg-gray-200 border border-gray-300 rounded-md p-4 shadow-md">
          <p className="text-sm">{notification}</p>
        </div>
      )}
    </div>
    <Footer/>
    </div>
  );
}
