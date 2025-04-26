import React, { useState } from "react";
import { toast, ToastContainer, Slide } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import Footer from "../../components/Footer";
import Headergroup from "../../components/HeaderGroup/Headergroup";

const CreateGroup = () => {
  const [group, setGroup] = useState({
    name: "",
    description: "",
    mentor: "",
    members: [""],
  });

  const [errors, setErrors] = useState({
    name: "",
    mentor: "",
    members: [],
  });

  const handleChange = (e) => {
    setGroup({ ...group, [e.target.name]: e.target.value });
    validateField(e.target.name, e.target.value);
  };

  const handleMemberChange = (index, value) => {
    const updatedMembers = [...group.members];
    updatedMembers[index] = value;
    setGroup({ ...group, members: updatedMembers });
    validateMembers(updatedMembers);
  };

  const addMemberField = () => {
    setGroup({ ...group, members: [...group.members, ""] });
  };

  const validateGroupName = (name) => {
    const regex = /^[a-zA-Z\s]+$/; // Only letters and spaces allowed
    return regex.test(name);
  };

  const validateMentor = (mentor) => {
    const regex = /^[a-zA-Z\s]+$/; // Only letters and spaces allowed
    return regex.test(mentor);
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Email validation
    return regex.test(email);
  };

  const validateField = (name, value) => {
    if (name === "name" && !validateGroupName(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Group name can only contain letters and spaces.",
      }));
    } else if (name === "mentor" && value && !validateMentor(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        mentor: "Mentor name can only contain letters and spaces.",
      }));
    } else if (name !== "mentor" && name !== "name") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "",
        mentor: "",
      }));
    }
  };

  const validateMembers = (members) => {
    const memberErrors = members.map((member, index) => {
      if (member && !validateEmail(member)) {
        return `Member ${index + 1} must have a valid email address.`;
      }
      return "";
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      members: memberErrors,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any error exists
    if (
      errors.name ||
      errors.mentor ||
      errors.members.some((error) => error !== "")
    ) {
      toast.error("Please correct the errors before submitting.", {
        position: "top-center",
      });
      return;
    }

    try {
      await axiosInstance.post("/groups/create", group);
      toast.success("Group created!", { position: "top-center" });
    } catch (err) {
      toast.error("Error creating group", { position: "top-center" });
      console.error(err);
    }
  };

  return (
    <div>
      <Headergroup />
      <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-center px-4">
        <div className="bg-gray-950 shadow-xl rounded-2xl p-8 max-w-xl w-full text-white">
          <h2 className="text-3xl font-bold text-center mb-6 text-indigo-400">
            Create Study Group
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium">Group Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter group name"
                className="w-full px-4 py-2 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                value={group.name}
                required
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Description</label>
              <input
                type="text"
                name="description"
                placeholder="Enter description"
                className="w-full px-4 py-2 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                value={group.description}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Mentor</label>
              <input
                type="text"
                name="mentor"
                placeholder="Mentor name (optional)"
                className="w-full px-4 py-2 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                value={group.mentor}
              />
              {errors.mentor && (
                <p className="text-red-500 text-sm">{errors.mentor}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium">Group Members (Emails)</label>
              <div className="space-y-3">
                {group.members.map((member, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Member ${index + 1}`}
                    value={member}
                    onChange={(e) => handleMemberChange(index, e.target.value)}
                    className="w-full px-4 py-2 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ))}
              </div>
              {errors.members.length > 0 && (
                <div className="text-red-500">
                  {errors.members.map((error, index) => (
                    <p key={index} className="text-sm">{error}</p>
                  ))}
                </div>
              )}
              <button
                type="button"
                onClick={addMemberField}
                className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                + Add Member
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg font-semibold transition duration-200"
            >
              Create Group
            </button>
          </form>
        </div>
        <ToastContainer theme="dark" transition={Slide} />
      </div>
      <Footer />
    </div>
  );
};

export default CreateGroup;
