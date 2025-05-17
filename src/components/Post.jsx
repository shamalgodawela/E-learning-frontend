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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero image section */}
        <div className="relative mb-12 rounded-lg overflow-hidden shadow-lg">
          <img
            src="https://images.pexels.com/photos/5965698/pexels-photo-5965698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Hero"
            className="w-full h-64 sm:h-96 object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
            <h1 className="text-white text-3xl sm:text-4xl font-semibold drop-shadow-lg">
              Latest Posts
            </h1>
          </div>
        </div>

        {/* Posts list */}
        <section className="space-y-8">
          {workouts.map((workout) => (
            <article
              key={workout.id}
              className="bg-white rounded-2xl shadow-md border border-gray-200 p-6"
            >
              {/* Post header */}
              <header className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUA61gIlA_YnqrwGhxKIffyTO-f8B1V44Y9ypZDKV2pQ&s"
                    alt="User avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-900">Ranyan123</h2>
                    <time
                      dateTime={workout.created}
                      className="text-sm text-gray-500"
                    >
                      {moment(workout.created).format("YYYY-MM-DD HH:mm:ss")}
                    </time>
                  </div>
                </div>

                <div className="flex gap-4 text-gray-400">
                  <Link
                    to={`/updatepost/${workout.id}`}
                    className="hover:text-blue-600"
                    aria-label="Edit post"
                  >
                    <img
                      className="w-6 h-6"
                      src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png"
                      alt="Edit"
                    />
                  </Link>
                  <button
                    onClick={() => handleDeleteUser(workout.id)}
                    className="hover:text-red-600"
                    aria-label="Delete post"
                  >
                    <img
                      className="w-6 h-6"
                      src="https://cdn.icon-icons.com/icons2/1157/PNG/512/1487086345-cross_81577.png"
                      alt="Delete"
                    />
                  </button>
                </div>
              </header>

              {/* Post tags and title */}
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                  #post
                </span>
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                  #popular
                </span>
                <h3 className="text-lg font-semibold text-gray-800">{workout.title}</h3>
              </div>

              {/* Post image */}
              {workout.image && workout.image[0] && (
                <img
                  src={workout.image[0]}
                  alt={workout.title}
                  className="w-full max-h-96 object-cover rounded-lg mb-4"
                />
              )}

              {/* Like and share buttons */}
              <div className="flex items-center gap-6 mb-4">
                <button
                  onClick={() => handleLike(workout.id)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 transition"
                  aria-label="Like post"
                >
                  <FontAwesomeIcon icon={faHeart} className="text-2xl" />
                  <span className="text-sm font-medium">{workout.likes}</span>
                </button>

                <button
                  onClick={() => setSelectedPostId(workout.id)}
                  aria-label="Add comment"
                  className="focus:outline-none"
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT39MC8P4nQc7W1X59HDxu66eEfGlUfNURWjW7IIUuirA&s"
                    alt="Add comment"
                    className="w-8 h-8 rounded-full object-cover hover:ring-2 hover:ring-blue-500 transition"
                  />
                </button>

                <button
                  onClick={() => handleShare(workout.id)}
                  aria-label="Share post"
                  className="focus:outline-none"
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSRxA34bc9afVlpRRAEXhaHkX-KBdT9gn3CUaqJDXftA&s"
                    alt="Share"
                    className="w-8 h-8 rounded-full object-cover hover:ring-2 hover:ring-blue-500 transition"
                  />
                </button>
              </div>

              {/* Post content */}
              <p className="text-gray-700 mb-4 whitespace-pre-wrap">{workout.content}</p>

              {/* Comment input */}
              {selectedPostId === workout.id && (
                <div className="flex items-center gap-4 mb-4">
                  <input
                    type="text"
                    value={commentText}
                    maxLength={200}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-grow border border-gray-300 rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    onClick={() => handleComment(workout.id, commentText)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                  >
                    Post
                  </button>
                </div>
              )}

              {/* Comments section */}
              <section className="bg-gray-100 rounded-lg p-4 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <h4 className="text-gray-500 font-semibold mb-2">Comments</h4>
                {workout.comments.length === 0 && (
                  <p className="text-sm text-gray-400 italic">No comments yet.</p>
                )}
                {workout.comments.map((comment) => (
                  <div key={comment.commentId} className="mb-3">
                    {editingCommentId === comment.commentId ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editedCommentText}
                          onChange={(e) => setEditedCommentText(e.target.value)}
                          className="flex-grow border rounded px-3 py-1 text-sm"
                        />
                        <button
                          onClick={() => handleEditComment(workout.id, comment.commentId)}
                          className="text-blue-600 text-xs hover:underline"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingCommentId(null)}
                          className="text-gray-500 text-xs hover:underline"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-700 text-sm break-words">{comment.comment}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500 mt-0.5">
                          <span>{moment(comment.createdAt).fromNow()}</span>
                          <div className="flex gap-4">
                            <button
                              onClick={() => {
                                setEditingCommentId(comment.commentId);
                                setEditedCommentText(comment.comment);
                              }}
                              className="hover:text-blue-600"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteComment(workout.id, comment.commentId)}
                              className="hover:text-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </section>
            </article>
          ))}
        </section>
      </main>

      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-gray-300 rounded-lg p-4 shadow-lg text-sm text-gray-800">
          {notification}
        </div>
      )}

      <Footer />
    </div>
  );
}
