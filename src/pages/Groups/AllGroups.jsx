import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import Footer from "../../components/Footer";
import Headergroup from "../../components/HeaderGroup/Headergroup";
import { useNavigate } from "react-router-dom";

const AllGroups = () => {
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/groups/getallGorups");
        setGroups(res.data);
      } catch (err) {
        console.error("Failed to fetch groups", err);
      }
    };

    fetchGroups();
  }, []);

  const handleEdit = (id) => {
    navigate(`/update_group/${id}`);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8081/api/groups/${id}`);
        setGroups(groups.filter(group => group.id !== id));
        Swal.fire("Deleted!", "The group has been deleted.", "success");
      } catch (err) {
        console.error("Error deleting group", err);
        Swal.fire("Error!", "There was an issue deleting the group.", "error");
      }
    } else {
      Swal.fire("Cancelled", "The group was not deleted.", "info");
    }
  };

  const handleView = (id) => {
    navigate(`/single_group/${id}`);
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Headergroup />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-indigo-400 mb-10">
            All Study Groups
          </h1>

          {/* 🔍 Search Input */}
          <div className="mb-6 text-center">
            <input
              type="text"
              placeholder="Search by Group Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* 📋 Table */}
          <div className="overflow-x-auto bg-gray-900 rounded-lg shadow-lg">
            <table className="min-w-full table-auto text-white">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-6 text-left">Group Name</th>
                  <th className="py-3 px-6 text-left">Description</th>
                  <th className="py-3 px-6 text-left">Mentor</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGroups.length > 0 ? (
                  filteredGroups.map((group, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="py-3 px-6">{group.name}</td>
                      <td className="py-3 px-6">{group.description}</td>
                      <td className="py-3 px-6">{group.mentor || "N/A"}</td>
                      <td className="py-3 px-6">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleView(group.id)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <FaEye size={20} />
                          </button>
                          <button
                            onClick={() => handleEdit(group.id)}
                            className="text-yellow-500 hover:text-yellow-700"
                          >
                            <FaEdit size={20} />
                          </button>
                          <button
                            onClick={() => handleDelete(group.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrashAlt size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-3 px-6 text-center">
                      No groups found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllGroups;
