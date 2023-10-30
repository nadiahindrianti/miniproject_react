import React from 'react'
import { Footer } from '../components'
import SideAdmin from '../components/admin/SideAdmin'

function dasboard_admin() {
    return (
      <div className='bg-[#FAFAFF]'>
        <div className="flex border-l-indigo-500">
        <SideAdmin/>
          </div>
        <Footer/>
      </div>
    )
  }
  
  export default dasboard_admin