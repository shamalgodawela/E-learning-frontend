import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Headergroup from "../../components/HeaderGroup/Headergroup";

const GroupDetails = () => {
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Get the ID from the URL

  // Fetch the group details by ID
  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/groups/${id}`);
        setGroup(response.data);
      } catch (error) {
        console.error("Error fetching group details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <Headergroup />
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          <h1 className="text-3xl text-indigo-400 font-semibold mb-4">{group.name}</h1>
          <p className="text-gray-300 mb-6">{group.description}</p>
          <div className="text-sm text-white">
            <strong>Mentor:</strong> {group.mentor || "N/A"}
          </div>
        </div>

        <h2 className="text-2xl text-white font-semibold mb-6">Members</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {group.members && group.members.length > 0 ? (
            group.members.map((email, index) => (
              <div
                key={index}
                className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="text-xl text-indigo-400 font-semibold">{email}</div>
            
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400">No members available</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GroupDetails;
