import React from 'react';
import HighlighText from '../HighlighText';
import CTAButton from '../../CTAButton';

export default function LearningLaanguageSection() {
  return (
    <div>
    <div className='flex flex-col gap-5 mt-[150px] items-center mb-32'>
     <p className='text-center font-semibold text-4xl'>Your Swiss Knife for <HighlighText text={"learning any language"}/></p>
   <div className='text-center text-richblack-600 mx-auto text-base w-[70%]'>
   Continuously expanding my skills with StudyNotion, mastering development, problem-solving, and industry-relevant technologies.

   </div>

   <div className='flex flex-row items-center justify-center mt-5'>
   <img src="https://raw.githubusercontent.com/The-StudyNotion/StudyNotion-V1/388c11b1a011ccba6124bccb72ea68bd5bfd2199/Client/src/Asset/Image/Know_your_progress.svg" className='object-contain -mr-32'></img>
   <img src="https://raw.githubusercontent.com/The-StudyNotion/StudyNotion-V1/388c11b1a011ccba6124bccb72ea68bd5bfd2199/Client/src/Asset/Image/Compare_with_others.svg" className='object-contain'></img>
   <img src="https://raw.githubusercontent.com/The-StudyNotion/StudyNotion-V1/388c11b1a011ccba6124bccb72ea68bd5bfd2199/Client/src/Asset/Image/Plan_your_lessons.svg" className='object-contain -ml-36'></img>


   </div>
<div className='w-fit'>
   <CTAButton active={true} linkto={"/signup"}>
<div>
    Learn More
</div>
   </CTAButton>
   </div>

    </div>





    </div>
  )
}
