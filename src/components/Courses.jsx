import React from 'react'
import Card from './Card'
import Slider from "react-slick";
import { courses } from '../data/Courses';

const Courses = () => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: false,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        dots: true
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        dots: true
      }
    }

  ]
  };

  return (
    <div className='w-full bg-[#008B8B] py-32'>
        <div className='md:max-w-[1480px] m-auto max-w-[600px]  px-5 md:px-4'>
            <div className='py-4 text-center'>
              <h1 className='py-4 text-3xl font-bold'><span className='text-[#FFFFFF]'>View Product</span></h1>
              <p className='text-[#FFFFFF]'>Below are several product categories for lab space and practical equipment.</p>
            </div>
            
            <Slider {...settings} className='px-5'>
              {courses.map((course,i)=>
                <div key={i}>
                  <Card course={course} />
                </div> ) }
              

            </Slider>
            
        </div>

    </div>
  )
}

export default Courses