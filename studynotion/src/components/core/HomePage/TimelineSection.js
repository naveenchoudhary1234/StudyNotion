import React from 'react';
import Logo1 from "../../../assets/logo/Logo-Full-Dark.png"
import Logo2 from "../../../assets/logo/Logo-Full-Light.png"
import Logo3 from "../../../assets/logo/Logo-Small-Dark.png"
import Logo4 from "../../../assets/logo/Logo-Small-Light.png"


const timeline=[
{    
Logo:Logo1,
heading:"Leadership",
Description:"Fully Committed to the success Company",
},
{
    Logo:Logo2,
    heading:"Leadership",
    Description:"Fully Committed to the success Company",
},
{
    Logo:Logo3,
    heading:"Leadership",
    Description:"Fully Committed to the success Company",
},
{
    Logo:Logo4,
    heading:"Leadership",
    Description:"Fully Committed to the success Company",
}



]

export default function TimelineSection() {
  return (
    <div>
    <div className='flex flex-row gap-15 items-center'>

        <div className='flex flex-col w-[45%] gap-5'>
         {

      timeline.map((element,index)=>{
      return(
     <div className='flex flex-row gap-6' key={index}>
         <div className='w-[50px] h-[50px] bg-richblack-200 flex items-center'>
      <img src={element.Logo}/>
            </div>

            <div>
              <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
              <p className='text-base'>{element.Description}</p>
                </div>
        </div>


      )


      })

         }


        </div>


        <div className='relative shadow-blue-200'>
         <img src="https://github.com/The-StudyNotion/StudyNotion-V1/blob/main/Client/src/Asset/Image/TimelineImage.png?raw=true" className='shadow-white object-cover h-fit'></img>
        <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
        <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300'>
            <p className='font-bold text-3xl'>10</p>
            <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
        </div>
        <div className='flex gap-5 items-center px-7'>
            <p className='font-bold text-3xl'>250</p>
            <p className='text-caribbeangreen-300 text-sm'>Types Of Courses</p>
        </div>

        

        </div>


        </div>
    











    </div>

    </div>
  )
}
