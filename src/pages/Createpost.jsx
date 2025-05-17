import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CreateBeutyshop() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        () => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData((prev) => ({ ...prev, image: [downloadURL] }));
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8081/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      setPublishError(null);
      alert("Post created successfully!");
      navigate(`/post`);
    } catch {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow relative bg-gray-100">
        <img
          src="https://images.pexels.com/photos/5965698/pexels-photo-5965698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto p-8 bg-white bg-opacity-90 rounded-xl shadow-lg mt-12 mb-16">
          <h1 className="text-4xl font-serif font-semibold text-center mb-8 text-gray-900">
            Create Post
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Image Upload */}
            <div className="flex items-center space-x-6">
              <label
                htmlFor="uploadInput"
                className="cursor-pointer inline-block rounded-xl border border-gray-300 p-3 bg-white shadow hover:bg-gray-50 transition"
                title="Select image to upload"
              >
                <input
                  id="uploadInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="w-10 h-10 text-gray-400 mb-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span className="text-gray-500 text-sm select-none">Choose Image</span>
                </div>
              </label>

              <button
                type="button"
                className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition disabled:opacity-50"
                onClick={handleUploadImage}
                disabled={!!imageUploadProgress}
              >
                {imageUploadProgress ? (
                  <div className="w-12 h-12">
                    <CircularProgressbar
                      value={imageUploadProgress}
                      text={`${imageUploadProgress}%`}
                      styles={{
                        path: { stroke: "#4f46e5" },
                        text: { fill: "#4f46e5", fontSize: "20px" },
                      }}
                    />
                  </div>
                ) : (
                  "Upload Image"
                )}
              </button>
            </div>

            {imageUploadError && (
              <p className="text-center text-red-600 font-medium">{imageUploadError}</p>
            )}

            {/* Preview uploaded image */}
            {formData.image && formData.image.length > 0 && (
              <div className="flex justify-center">
                <img
                  src={formData.image[0]}
                  alt="Uploaded Preview"
                  className="w-48 h-32 rounded-lg object-cover shadow-md"
                />
              </div>
            )}

            {/* Title */}
            <input
              type="text"
              placeholder="Title"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400"
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />

            {/* Content */}
            <textarea
              placeholder="Content (max 100 characters)"
              maxLength={100}
              required
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400 resize-none"
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />

            {publishError && (
              <p className="text-center text-red-600 font-semibold">{publishError}</p>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-48 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
