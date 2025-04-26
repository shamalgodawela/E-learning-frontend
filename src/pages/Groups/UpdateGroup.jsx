import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Headergroup from "../../components/HeaderGroup/Headergroup";
import Footer from "../../components/Footer";

const UpdateGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState({
    name: "",
    description: "",
    mentor: "",
    members: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/api/groups/${id}`);
        const { name, description, mentor, members } = res.data;
        setGroup({
          name,
          description,
          mentor,
          members: members || [], // ✅ leave as array
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching group", err);
        setLoading(false);
      }
    };
  
    fetchGroup();
  }, [id]);
  

  const handleChange = (e) => {
    setGroup({ ...group, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/api/groups/${id}`, group);
      alert("Group updated successfully!");
      navigate(`/AllGroup`);
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update group.");
    }
  };
  

  if (loading) return <div className="text-center text-white">Loading...</div>;

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Headergroup />
      <div className="max-w-3xl mx-auto p-8 bg-gray-800 mt-10 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-indigo-400 mb-6">Update Group</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Group Name</label>
            <input
              type="text"
              name="name"
              value={group.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={group.description}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Mentor</label>
            <input
              type="text"
              name="mentor"
              value={group.mentor}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white outline-none"
            />
          </div>
          <div>
  <label className="block text-gray-300 mb-2">Members</label>
  {group.members.map((email, index) => (
    <div key={index} className="flex gap-2 mb-2">
      <input
        type="email"
        value={email}
        onChange={(e) => {
          const updatedMembers = [...group.members];
          updatedMembers[index] = e.target.value;
          setGroup({ ...group, members: updatedMembers });
        }}
        className="flex-1 p-3 rounded bg-gray-700 text-white outline-none"
        required
      />
      <button
        type="button"
        onClick={() => {
          const updatedMembers = group.members.filter((_, i) => i !== index);
          setGroup({ ...group, members: updatedMembers });
        }}
        className="px-3 bg-red-600 rounded text-white"
      >
        ✕
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={() => setGroup({ ...group, members: [...group.members, ""] })}
    className="mt-2 py-2 px-4 bg-green-600 hover:bg-green-700 rounded text-white"
  >
    + Add Member
  </button>
</div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 rounded text-white font-semibold"
          >
            Update Group
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateGroup;

