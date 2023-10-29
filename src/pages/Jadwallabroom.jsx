import React from 'react'
import { Navbar, Footer } from '../components'
import SideNav from '../components/SideNav'
import Calendar from '../components/calendar/Calendar'

function Jadwallabroom() {
    return (
      <div className='bg-[#FAFAFF]'>
        <Navbar/>
        <div className="flex border-l-indigo-500">
          <SideNav/>
            <Calendar label={'Jadwal Akses Lab Room'}/>
          </div>
        <Footer/>
      </div>
    )
  }
  
  export default Jadwallabroom