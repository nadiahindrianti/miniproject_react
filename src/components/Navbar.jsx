import React from 'react';
import { NavLink } from 'react-router-dom'
import {logo} from '../assets'

function Navbar({className}) {
  return (
    <div className='relative '>
      <div className={`nav w-full flex p-3 text-white bg-[#008B8B] justify-between font-['Montserrat'] text-sm ${className && className}`}>
      <div className="img-logo ps-8">
        <NavLink to={'/'}>
        <img src={logo} alt="logocreativehub" className='w-14'/>
        </NavLink>
      </div>
      <div className="menu flex items-center ">
      <div className="li px-5 hover:text-amber-400 active:text-amber-400">
          <NavLink to='/'>Home</NavLink>
        </div>
        <div className="li px-5 hover:text-amber-400 active:text-amber-400">
          <NavLink to='/Product'>Product</NavLink>
        </div>
        <div className="li px-5 hover:text-amber-400 active:text-amber-400">
          <NavLink to='/Jadwallabroom'>Jadwal</NavLink>
        </div>
        <div className="li px-5 hover:text-amber-400 active:text-amber-400">
          <NavLink to='/Pengajuan'>Pengajuan</NavLink>
        </div>
        <div className="li px-5 hover:text-amber-400 active:text-amber-400">
          <NavLink to='/QA'>Q & A</NavLink>
        </div>
        <div className="li px-5 hover:text-amber-400 active:text-amber-400">
          <NavLink to='/Login'>Login</NavLink>
        </div>
        <div className="li px-5 hover:text-amber-400 active:text-amber-400">
          <NavLink to='/Register'>Register</NavLink>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Navbar