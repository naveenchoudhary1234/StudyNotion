import React from 'react';



const timeline=[
{    
Logo:"https://up.yimg.com/ib/th?id=OIP.lG4HP5JyRLHVXVvHy4gKdgHaFd&pid=Api&rs=1&c=1&qlt=95&w=144&h=106",
heading:"Leadership",
Description:"Fully Committed to the success Company",
},
{
    Logo:"https://up.yimg.com/ib/th?id=OIP.dGl5Sax_htYWVuS68Gk0dgHaE8&pid=Api&rs=1&c=1&qlt=95&w=170&h=113",
    heading:"Vision",
    Description:"Fully Committed to the success Company",
},
{
    Logo:"https://up.yimg.com/ib/th?id=OIP.qK-IYWnRh6np5esVA21NhAHaHa&pid=Api&rs=1&c=1&qlt=95&w=121&h=121",
    heading:"Team Growth",
    Description:"Fully Committed to the success Company",
},
{
    Logo:"https://up.yimg.com/ib/th?id=OIP.Us-trweyflNCZ-6B7byUBAHaH6&pid=Api&rs=1&c=1&qlt=95&w=110&h8",
    heading:"Happiness",
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
