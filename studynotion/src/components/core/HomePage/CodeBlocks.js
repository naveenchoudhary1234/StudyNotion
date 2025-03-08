import React from 'react';
import CTAButton from '../../CTAButton';
import HighlighText from '../HighlighText';
import {FaArrowRight} from "react-icons/fa";
import {TypeAnimation} from "react-type-animation";


export default function CodeBlocks({ position, heading, subheading, ctabtn1, ctabtn2, codeblock, codeColor }) {
    return (
      <div className={`flex flex-row ${position} my-20 justify-center gap-10`}>
        {/* Section 1 */}
        <div className='w-[50%] flex flex-col gap-8'>
          {heading}
          <div className='text-richblack-300 font-bold'>
            {subheading}
          </div>
          <div className='flex gap-7 mt-7'>
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
              <div className='flex gap-2 items-center'>
                {ctabtn1.btnText}
              </div>
            </CTAButton>
            <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
              {ctabtn2.btnText}
            </CTAButton>
          </div>
        </div>
        
        {/* Section 2: Code Block */}
        <div className='h-fit flex flex-row text-10px w-[100%] py-4'>
            <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>

                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
                <p>13</p>
                <p>14</p>
                <p>15</p>
                
            </div>
            <div className={`flex flex-col w-[90%] font-bold font-mono ${codeColor} bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 p-6 rounded-lg shadow-lg`}>
            <TypeAnimation 
  sequence={[codeblock, 5000, ""]} 
  repeat={Infinity} 
  style={{ display: "block", whiteSpace: "pre-wrap" }}

/>




            </div>

        </div>
        
      </div>
    );
  }
  
