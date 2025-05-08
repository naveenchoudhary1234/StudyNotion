import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import IconBtn from "../../../common/IconBtn";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [videoActive, setVideoActive] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const { courseId, sectionId, subsectionId } = useParams();
  const {
    courseSectionData = [],
    courseEntireData = {},
    completedLectures = [],
    totalNoOfLectures = 0,
  } = useSelector((state) => state.viewCourse);
  const navigate = useNavigate();

  // Initialize showSidebar based on screen width
  useEffect(() => {
    const updateSidebarVisibility = () => {
      if (window.innerWidth >= 1024) {
        setShowSidebar(true); // For larger screens, show the sidebar
      } else {
        setShowSidebar(false); // For smaller screens, hide the sidebar by default
      }
    };

    // Call once on mount to set the initial state
    updateSidebarVisibility();

    // Add a resize listener to update state on screen size change
    window.addEventListener('resize', updateSidebarVisibility);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', updateSidebarVisibility);
    };
  }, []); // Empty dependency array ensures this runs only on mount

  useEffect(() => {
    if (!courseSectionData.length) return;
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );
    const currentSubSectionIndex =
      courseSectionData[currentSectionIndex]?.subSection.findIndex(
        (subSection) => subSection?._id === subsectionId
      );
    if (currentSectionIndex === -1 || currentSubSectionIndex === -1) return;
    const activeSubsectionId =
      courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex]._id;
    setVideoActive(activeSubsectionId);
  }, [courseSectionData, sectionId, subsectionId]);

  if (!courseSectionData.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="absolute top-0 left-0 z-30">
      {/* Sidebar open button */}
      {!showSidebar && (
        <FaChevronRight
          onClick={() => setShowSidebar(true)}
          className="md:hidden cursor-pointer text-2xl text-richblack-900 m-2 bg-richblack-100 rounded-full p-1"
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          showSidebar ? "h-[calc(100vh-3.5rem)] w-[320px]" : "w-0 h-0"
        } transition-all duration-700 relative`}
      >
        <div
          className={`${
            showSidebar ? "flex" : "hidden"
          } flex-col h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] border-r border-richblack-700 bg-richblack-800`}
        >
          {/* Header Section */}
          <div className="mx-5 flex flex-col gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
            <div className="flex items-center justify-between">
              <div
                className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90 cursor-pointer"
                onClick={() => setShowSidebar(false)}
              >
                <FaChevronLeft className="md:hidden" />
              </div>
              <div onClick={() => setReviewModal(true)}>
                <IconBtn text="Review" type="button" />
              </div>
            </div>
            <div className="flex flex-col">
              <p>{courseEntireData?.courseName}</p>
              <p className="text-sm font-semibold text-richblack-500">
                {completedLectures?.length} of {totalNoOfLectures} Lectures Completed
              </p>
            </div>
          </div>

          {/* Sections & Subsections */}
          <div className="h-[calc(100vh - 5rem)] overflow-y-auto px-2">
            {courseSectionData.map((section, index) => (
              <details
                key={section._id}
                className="group text-richblack-5 mb-1"
              >
                <summary className="cursor-pointer text-sm appearance-none">
                  <div className="flex justify-between items-center bg-richblack-600 px-5 py-4">
                    <p className="w-[70%] font-semibold">{section?.sectionName}</p>
                    <MdOutlineKeyboardArrowDown className="transition-transform duration-300 group-open:rotate-180" />
                  </div>
                </summary>

                {/* Subsections */}
                {section?.subSection.map((subSection) => (
                  <div
                    key={subSection?._id}
                    onClick={() => {
                      if (window.innerWidth < 1024) setShowSidebar(false);
                      navigate(
                        `/view-course/${courseId}/section/${section._id}/sub-section/${subSection._id}`
                      );
                    }}
                    className={`${
                      subSection._id === videoActive
                        ? "bg-yellow-200"
                        : "bg-richblack-50"
                    } cursor-pointer flex gap-3 px-5 py-2 font-semibold text-richblack-800 relative border-b border-richblack-600`}
                  >
                    <div className="absolute bottom-1 left-2">
                      <input
                        readOnly
                        type="checkbox"
                        checked={completedLectures.includes(subSection?._id)}
                      />
                    </div>
                    <p className="ml-6">{subSection?.title}</p>
                  </div>
                ))}
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailsSidebar;
