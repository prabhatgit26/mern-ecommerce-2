import React from 'react'
import { assets } from '../../../admin/src/assets/assets';

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img src={assets.logo2} className='w-[max(10%,80px)]' alt="" />
      <button onClick={()=>setToken("")} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-gray-950'>Logout</button>
    </div>
  )
}

export default Navbar;
