import React from 'react'
import Post from "../components/Post";
import UserDash from '../components/UserDash';
export default function Home() {
  return (
    <div className='flex '>
      
    
     <UserDash/>
     <Post/>
      
      </div>
  )
}
