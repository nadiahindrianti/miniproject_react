import React from 'react';
import { heroImg } from '../assets';
import  {AiOutlineSearch} from 'react-icons/ai'

const Hero = () => {
  return (
    <div className='w-full bg-white py-24'>
        <div className='md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[900px]  px-4 md:px-8'>
            
            <div className='flex flex-col justify-start gap-4'>
                <p className='py-2 text-2xl text-[#31587B] font-medium'>Let's Start</p>
                <h1 className='md:leading-[72px] py-2 md:text-6xl text-5xl font-semibold'>Optimize your research with us</h1>
                <p className='py-2 text-lg text-gray-600'>Keep practicing and implementing the material into practicum.</p>
                
                <form className='bg-white border max-w-[500px] p-4 input-box-shadow rounded-md flex justify-between'>
                    <input 
                        className='bg-white'
                        type="text"
                        placeholder='What do want to search?'
                    />
                    <button>
                        <AiOutlineSearch 
                            size={20}
                            className="icon"
                            style={{color:'#000'}}

                        />

                    </button>
                </form>
            </div>
            
            <img  src={heroImg} className="md:order-last  order-first" />



        </div>
        

    </div>
  )
}

export default Hero