import React from 'react';
import { Link } from 'react-router-dom';

export default function CTAButton({children,active,linkto}) {
  // children text active colour linkto kha refer hogaa yee
    return (
   <Link to={linkto}>
   <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold ${active ? "bg-yellow-50 text-black" : "bg-richblack-800"} hover:scale-95 transition-all duration-200`}>
  {children}
</div>

   
   </Link>
  )
}
