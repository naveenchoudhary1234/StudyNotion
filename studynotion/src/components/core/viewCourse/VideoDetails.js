import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/operation/courseDetailsApi";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import { BiSkipNextCircle, BiSkipPreviousCircle } from "react-icons/bi";
import { MdOutlineReplayCircleFilled } from "react-icons/md";
import ReactPlayer from "react-player";  // Keeping your import structure

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!courseSectionData.length) return;
      if (!courseId || !sectionId || !subSectionId) {
        navigate(`/dashboard/enrolled-courses`);
      } else {
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        );

        const filteredVideoData = filteredData?.[0]?.subSection.filter(
          (data) => data._id === subSectionId
        );

        setVideoData(filteredVideoData[0]);
        setPreviewSource(courseEntireData.thumbnail);
        setVideoEnded(false);
      }
    })();
  }, [courseSectionData, courseEntireData, location.pathname]);

  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex(
      (data) => data._id === subSectionId
    );
    return currentSectionIndx === 0 && currentSubSectionIndx === 0;
  };

  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubsections = courseSectionData[currentSectionIndx].subSection.length;
    const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex(
      (data) => data._id === subSectionId
    );
    return currentSectionIndx === courseSectionData.length - 1 && currentSubSectionIndx === noOfSubsections - 1;
  };

  const goToNextVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubsections = courseSectionData[currentSectionIndx].subSection.length;
    const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex(
      (data) => data._id === subSectionId
    );
    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndx].subSection[currentSubSectionIndx + 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
    } else {
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id;
      const nextSubSectionId = courseSectionData[currentSectionIndx + 1].subSection[0]._id;
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
    }
  };

  const goToPrevVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex(
      (data) => data._id === subSectionId
    );
    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndx].subSection[currentSubSectionIndx - 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
    } else {
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id;
      const prevSubSectionLength = courseSectionData[currentSectionIndx - 1].subSection.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndx - 1].subSection[prevSubSectionLength - 1]._id;
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token
    );
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };

  return (
    <div className="md:w-[calc(100vw-320px)] w-screen p-3">
      {!videoData ? (
        <h1>Loading...</h1>
      ) : (
        <div className="">
          <ReactPlayer
            className="w-full relative"
            url={videoData.videoUrl}
            controls
            width="100%"
            height="auto"
            onEnded={() => setVideoEnded(true)}
          />
          {videoEnded && (
            <div className="flex justify-center items-center relative">
              {!completedLectures.includes(videoData._id) && (
                <button
                  onClick={handleLectureCompletion}
                  className="bg-yellow-100 text-black absolute top-[20%] font-medium md:text-sm px-4 py-2 rounded-md hover:scale-90"
                >
                  {loading ? "Marking..." : "Mark as Completed"}
                </button>
              )}
              {!isFirstVideo() && (
                <BiSkipPreviousCircle
                  onClick={goToPrevVideo}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-5xl bg-richblack-600 rounded-full cursor-pointer hover:scale-90"
                />
              )}
              {!isLastVideo() && (
                <BiSkipNextCircle
                  onClick={goToNextVideo}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-5xl bg-richblack-600 rounded-full cursor-pointer hover:scale-90"
                />
              )}
              <MdOutlineReplayCircleFilled
                onClick={() => setVideoEnded(false)}
                className="text-5xl bg-richblack-600 rounded-full cursor-pointer hover:scale-90 absolute top-1/2 -translate-y-1/2"
              />
            </div>
          )}
          <div className="mt-5">
            <h1 className="text-2xl font-bold text-richblack-25">{videoData.title}</h1>
            <p className="text-richblack-100">{videoData.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDetails;
