import React from 'react'
import { NavLink } from 'react-router-dom'

function SideNav() {
  return (
    <div className='text-black flex flex-col p-4 ps-10 gap-4 bg-[#F6F6F6] max-w-[20%]'>
      <h2 className='font-bold bg-[#221D55] p-3 text-white rounded-md'>Jadwal Akses</h2>
      <NavLink className={'p-2 hover:bg-[#353158] hover:text-white rounded-md'} to="/Jadwallabroom">Lab Room</NavLink>
      <NavLink className={'p-2 hover:bg-[#353158] hover:text-white rounded-md'} to="/Jadwalpracticaltools">Practical Tools</NavLink>
    </div>
  )
}

export default SideNav