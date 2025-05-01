import { BrowserRouter, Routes, Route } from "react-router-dom";

import Createpost from "./pages/Createpost";
import Updatepost from "./pages/Updatepost";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import CreateGroup from "./pages/Groups/CreateGroup";
import AllGroups from "./pages/Groups/AllGroups";
import GroupDetails from "./pages/Groups/GroupDetails";
import UpdateGroup from "./pages/Groups/UpdateGroup";

import Post from "./components/Post";
import CreateSchedul from "./pages/Progress";
import Myprogress from "./pages/Myprogress";





export default function App() {
  return (
    <BrowserRouter>
    
      <Routes>




        


      
        <Route path="/" element={<Login/>} />

        <Route path="/register" element={<Register />} />
       
        <Route path="/updatepost/:postId" element={<Updatepost/>} />
        <Route path="/create" element={<Createpost/>} />
        <Route path="/createGroup" element={<CreateGroup/>} />
        <Route path="/AllGroup" element={<AllGroups/>} />
        <Route path="/single_group/:id" element={<GroupDetails/>} />
        <Route path="/update_group/:id" element={<UpdateGroup/>} />

        <Route path="/post" element={<Post/>} />
        <Route path="/CreateProgress" element={<CreateSchedul/>} />
        <Route path="/viewprogreess" element={<Myprogress/>}/>

       

       
         
        
       
      </Routes>

    </BrowserRouter>
  );
}
