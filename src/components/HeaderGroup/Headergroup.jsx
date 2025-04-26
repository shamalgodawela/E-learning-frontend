import React, { useState } from 'react';

const Headergroup = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [isCountrySelectOpen, setIsCountrySelectOpen] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  const toggleCountrySelect = () => {
    setIsCountrySelectOpen(!isCountrySelectOpen);
  };

  return (
    <div>

      <div className=" w-full bg-purple-800">
        <div className="max-w-screen-xl mx-auto px-4">
      
          <div className="hidden lg:flex items-center justify-between py-4">
            <a href="#" className="text-white text-xl font-semibold">Online E-Learning System</a>
            <div className="flex items-center space-x-6">
              <a href="" className="text-white hover:bg-purple-600 px-4 py-2 rounded">Home</a>
              <a href="/AllGroup" className="text-white hover:bg-purple-600 px-4 py-2 rounded">Study Groups</a>
              <a href="/createGroup" className="text-white hover:bg-purple-600 px-4 py-2 rounded">Add Groups</a>
              <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow">
  <a href="/" className="block w-full h-full">Logout</a>
</button>

              

              
            </div>
          </div>

          {/* Mobile Nav */}
          <div className="lg:hidden flex justify-between items-center py-4">
            <a href="#" className="text-white text-xl font-semibold">Online Store</a>
            <button onClick={toggleMenu} className="text-white">
              <i className="content icon"></i>
            </button>
          </div>
          {isMenuOpen && (
            <div className="lg:hidden">
              <div className="bg-purple-800 text-white p-4 space-y-4">
                <div className="space-y-2">
                  <a href="#" className="block px-4 py-2 hover:bg-purple-600 rounded">Home</a>
                  <a href="#" className="block px-4 py-2 hover:bg-purple-600 rounded">About</a>
                  <a href="#" className="block px-4 py-2 hover:bg-purple-600 rounded">Contact</a>
                </div>
                
              </div>
            </div>
          )}
        </div>
      </div>
      {/* End: Navbar */}

      {/* Content Section */}
      
    </div>
  );
};

export default Headergroup;
