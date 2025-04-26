import React from 'react'
import { Link } from 'react-router-dom'

export default function UserDash() {
  return (
    <div className='w-72 h-[200px] bg-white rounded-xl'>
        <div > 
       

        </div>


        <Link to="/create">
        <div className='mt-8 text-xl flex  gap-4   cursor-pointer hover:bg-gradient-to-r from-blue-400 to-blue-500 h-10 rounded-lg hover:shadow-lg '>
            
           <img className='w-5 h-5  mt-2 ml-8 hover:bg-white '  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeNE1hNQtUT_4xppH3v0PKdnkK5GJv-SJwejHvrkBzqg&s" alt="" />
           <h1 className='mt-1 font-medium text-gray-800  hover:text-white '>Post</h1>
           
          
        </div>
       
        </Link>
        <a href='/createGroup'>aaa</a>
        

        <div className='mt-10'>
            <div>

            </div>
           
            
         
       
        

        </div>
        
    </div>
  )
}


