import React from 'react'
import { Navbar, Footer } from '../components'
import SideNav from '../components/SideNav'
import Calendar from '../components/calendar/Calendar'

function Jadwalpracticaltools() {
    return (
      <div className='bg-[#FAFAFF]'>
        <Navbar/>
        <div className="row flex border-l-indigo-500">
          <SideNav/>
          <Calendar label={'Jadwal Akses Practical Tools'}/>
          </div>
        <Footer/>
      </div>
    )
  }
  
  export default Jadwalpracticaltools