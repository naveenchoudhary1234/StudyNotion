import React, { useState } from 'react';
import { HomePageExplore } from '../../../data/homepage-Explore';
import HighlighText from '../HighlighText';
import CourseCard from './CourseCard';

const tabsName = ["Free", "New to coding", "Most popular", "Skills paths", "Career paths"];


export default function ExploreMore() {
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0]?.courses || []);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0]?.courses[0]?.heading || "");

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.find((course) => course.tag === value);

        if (result) {
            setCourses(result.courses);
            setCurrentCard(result.courses[0]?.heading || "");
        }
        else{
            setCourses([]);
            setCurrentCard([]);
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className='text-4xl text-center font-semibold'>
                Unlock the <HighlighText text={"Power of Code"} />
            </div>
            <p className='text-center text-richblack-300 text-lg font-bold mt-3'>
                Learn to build anything you can imagine
            </p>

      
            <div className='flex flex-row justify-center items-center gap-3 rounded-full bg-richblack-800 mb-5 mt-5 px-3 py-2'>
                {tabsName.map((element, index) => (
                    <div
                        key={index}
                        className={`text-[16px] font-semibold px-5 py-2 rounded-full cursor-pointer transition-all duration-200 
                        ${currentTab === element ? "bg-richblack-900 text-white shadow-md" : "text-richblack-300 hover:bg-richblack-700 hover:text-white"}`}
                        onClick={() => setMyCards(element)}
                    >
                        {element}
                    </div>
                ))}
            </div>

        <div className='lg:h-[150px]'>
         <div className='flex flex-row gap-5 mt-5'>
            {
            courses.map((element,index)=>{
             return(
             <CourseCard key={index} cardData={element} currentCard={currentCard} setCurrentCard={setCurrentCard}/>

             )

            })

            }
         </div>





        </div>

        </div>
    );
}
