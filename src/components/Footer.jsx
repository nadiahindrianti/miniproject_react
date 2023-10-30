import React from 'react'
import { logo } from '../assets'
import {FaFacebookF,FaLinkedinIn,FaInstagram,} from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='w-full bg-white py-24'>
        <div className='md:max-w-[1480px] m-auto grid md:grid-cols-5 max-[780px]:grid-cols-2  gap-8 max-w-[600px]  px-4 md:px-12'>   
            <div className='col-span-2 px-16'>
                <img src={logo} className="h-[35px]" />
                <h3 className='text-2xl font-bold mt-10'>Contact Us</h3>
                <h3 className='py-2 text-[#6D737A]'>Call : +123 400 123</h3>
                <h3 className='py-2 text-[#6D737A]'>University <br></br> Pegawai Laboratorium</h3>
                <h3 className='py-2 text-[#363A3D]'>Email: pegawai@mail.com</h3>
                <div className='flex gap-4 py-4'>
                        <div className='p-4 bg-[#E9F8F3] rounded-xl'><FaFacebookF size={25} style={{color:'#4DC39E'}} /></div>
                        <div className='p-4 bg-[#E9F8F3] rounded-xl'><FaLinkedinIn size={25} style={{color:'#4DC39E'}} /></div>
                        <div className='p-4 bg-[#E9F8F3] rounded-xl'><FaInstagram size={25} style={{color:'#4DC39E'}} /></div>

                </div>

            </div>

            <div>
                <h3 className='text-2xl font-bold'>Explore</h3>
                <ul className='py-6 text-[#6D737A]'>
                    <li className='py-2'>Home</li>
                    <li className='py-2'>Product</li>
                    <li className='py-2'>Jadwal</li>
                    <li className='py-2'>Pengajuan</li>
                </ul>
            </div>

            <div>
                <h3 className='text-2xl font-bold'>Category</h3>
                <ul className='py-6 text-[#6D737A]'>
                    <li className='py-2'> Lab Room</li>
                    <li className='py-2'> Practical Tools</li>
                    <li className='py-2'>OPENAI</li>

                </ul>
            </div>
        
        </div>
    </div>
  )
}

export default Footer