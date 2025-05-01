import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function SharePost() {
  const { ShareId } = useParams();
  const [formData, setFormData] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const res = await fetch(`http://localhost:8081/api/Get?itemId=${ShareId}`);
        const data = await res.json();

        const selected = data.find((workout) => workout.id === ShareId);
        if (selected) {
          setFormData(selected);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchWorkout();
  }, [ShareId]);

  const handleLike = async () => {
    try {
      const res = await fetch(`http://localhost:8081/api/like/${ShareId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        setFormData((prev) => ({ ...prev, likes: prev.likes + 1 }));
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleShare = () => {
    const postLink = window.location.href;
    navigator.clipboard.writeText(postLink)
      .then(() => setNotification("Link copied!"))
      .catch(() => setNotification("Failed to copy link."));
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <div className="relative w-full">
      <img src="https://images.pexels.com/photos/5965698/pexels-photo-5965698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className="w-full h-[700px] opacity-95 object-cover" />

      <div className="absolute top-0 bg-[#d9d9da] bg-opacity-95 ml-[480px]">
        <div className="flex justify-center mt-0">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="max-h-[655px] w-full overflow-y-auto scrollbar-none">
              <div className="w-[550px] h-auto bg-white mt-10 mb-5 border-none rounded-2xl relative z-10">
                <div className="px-6 py-4">
                  <div className="flex gap-3 ml-4">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUA61gIlA_YnqrwGhxKIffyTO-f8B1V44Y9ypZDKV2pQ&s"
                      alt=""
                      className="w-10 h-10 object-cover mt-2 rounded-full"
                    />

                    <div>
                      <h1 className="text-slate-800 font-medium mt-3">Ranyan123</h1>
                      <h4 className="text-[10px] text-gray-800 whitespace-nowrap">
                        {moment(formData.created).format("YYYY-MM-DD HH:mm:ss")}
                      </h4>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4 mt-2">
                    <div className="text-blue-700">#post#popular</div>
                    <div className="text-gray-700">{formData.title}</div>
                  </div>

                  <img
                    src={formData.image && formData.image[0]}
                    alt=""
                    className="w-[500px] h-80 mt-5 rounded-xl"
                  />

                  <div className="flex gap-2 mt-4">
                    <div>
                      <button className="mt-3 ml-1" onClick={handleLike}>
                        <FontAwesomeIcon icon={faHeart} className="text-red-700 text-2xl hover:text-red-100" />
                      </button>
                      <div className="ml-4 text-[10px]">{formData.likes}</div>
                    </div>

                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSRxA34bc9afVlpRRAEXhaHkX-KBdT9gn3CUaqJDXftA&s"
                      onClick={handleShare}
                      alt=""
                      className="w-8 h-8 object-cover mt-2 rounded-full cursor-pointer"
                    />
                  </div>

                  <div className="flex gap-2">
                    <h3 className="font-semibold text-md text-gray-700 mt-4 mb-2">Ranyan</h3>
                    <h3 className="font-extralight text-md text-gray-700 mt-5 w-[400px] break-words">
                      {formData.content}
                    </h3>
                  </div>

                  <div className="w-[500px] min-h-[85px] rounded-2xl bg-slate-50 mt-4 p-2">
                    <div className="flex ml-2 font-medium text-gray-400">Comment</div>
                    <div className="text-gray-500 ml-2 mt-2 text-sm">
                      Comments are disabled in shared view.
                    </div>
                  </div>
                </div>
              </div>
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
  );
}
