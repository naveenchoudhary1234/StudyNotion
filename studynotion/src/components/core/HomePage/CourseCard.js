import React from "react";

export default function CourseCard({ cardData, currentCard, setCurrentCard }) {
  return (
    <div
      className={`p-6 cursor-pointer transition-all duration-200 flex flex-col justify-between relative rounded-lg
      ${currentCard === cardData.heading ? "bg-richblack-5 text-richblack-600 shadow-[0_4px_15px_0px_rgba(255,215,0,0.6)]" : "bg-richblack-700 text-gray-300 hover:bg-richblack-800"}`}
      onClick={() => setCurrentCard(cardData.heading)}
    >

      <div className="text-4xl font-semibold mb-3">{cardData.heading}</div>

 
      <div className="text-sm text-gray-400 mb-5 leading-relaxed">
        {cardData.description}
      </div>

   
      <div className="flex justify-between text-sm font-medium items-center">
        <div className="text-blue-400">{cardData.level}</div>
        <div className="text-green-400">{cardData.lessionNumber} Lessons</div>
      </div>
    </div>
  );
}
