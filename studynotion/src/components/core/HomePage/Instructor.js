import React from 'react';
import HighlighText from '../HighlighText';
import CTAButton from '../../CTAButton';
import { FaArrowRight } from "react-icons/fa";

export default function Instructor() {
  return (
    <div className='mt-15'>
    <div className='flex flex-row gap-20 items-center'>
     <div className='w-[50%]'>
      <img src="https://github.com/The-StudyNotion/StudyNotion-V1/blob/main/Client/src/Asset/Image/Instructor.png?raw=true" className='shadow-white'></img>

     </div>
     <div className='w-[50%] flex flex-col gap-10'>  
     <p className='text-4xl font-semibold w-[50%]'>Become an <HighlighText text={"Instructor"}/></p>
     <p className='front-medium text-[16px] w-[80%] text-richblack-300'>Grateful to my instructor at StudyNotion for their invaluable guidance and support in my learning journey.</p>
     <div className='w-fit'>
      <CTAButton active={true} linkto={"/signup"}>
      <div className='flex flex-row gap-2 items-center'>
        Start Teaching Today
        <FaArrowRight/>
      </div>
      </CTAButton>
      </div>
      
     </div>


    </div>


    </div>
  )
}
