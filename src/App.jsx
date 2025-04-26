import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Createpost from "./pages/Createpost";
import Updatepost from "./pages/Updatepost";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import CreateGroup from "./pages/Groups/CreateGroup";
import AllGroups from "./pages/Groups/AllGroups";
import GroupDetails from "./pages/Groups/GroupDetails";
import UpdateGroup from "./pages/Groups/UpdateGroup";





export default function App() {
  return (
    <BrowserRouter>
    
      <Routes>




        


      
        <Route path="/" element={<Login/>} />
        <Route path="/Home" element={<Home />} />
        <Route path="/register" element={<Register />} />
       
        <Route path="/updatepost/:postId" element={<Updatepost/>} />
        <Route path="/create" element={<Createpost/>} />
        <Route path="/createGroup" element={<CreateGroup/>} />
        <Route path="/AllGroup" element={<AllGroups/>} />
        <Route path="/single_group/:id" element={<GroupDetails/>} />
        <Route path="/update_group/:id" element={<UpdateGroup/>} />
       

       

       
         
        
       
      </Routes>

    </BrowserRouter>
  );
}
