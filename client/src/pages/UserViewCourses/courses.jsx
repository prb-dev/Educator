import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player'

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseResponse = await axios.get(
          `http://localhost:8004/course/${id}`
        );
        setCourse(courseResponse.data);
        setLoading(false);

        // Fetch instructor details once the course details are fetched
        const instructorResponse = await axios.get(
          `http://localhost:8008/user/getUserById/${courseResponse.data.instructor}`
        );
        setInstructor(instructorResponse.data.user);
      } catch (error) {
        console.error(
          `Error fetching course details for ID ${id}:`,
          error.message
        );
        setError(
          `Error fetching course details for ID ${id}: ${error.message}`
        );
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!course || !instructor) return <div>No course or instructor found</div>;

  const progressPercentage = (
    (course.steps.quizCount / course.steps.lectureCount) *
    100
  ).toFixed(2);

  return (
    <div className="p-10 mt-20 bg-gray-100">
      <div className="rounded-lg bg-white p-8 mb-8">
        <h1 className="text-3xl mb-4 font-bold">{course.name}</h1>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-1/2 mr-4 mb-4 md:mb-0">
            <div className="rounded-lg bg-blue-500 text-white p-4 mb-4">
              <p className="text-lg font-bold">Code: {course.code}</p>
            </div>
            <div className="rounded-lg bg-blue-500 text-white p-4">
              <p className="text-lg font-bold">Price: ${course.price}</p>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="rounded-lg bg-blue-200 text-black p-4 mb-4">
              <h1 className="text-lg font-bold">Instructor</h1>
              <p className="text-lg">{instructor.username}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-blue-500 text-white p-8 mb-8">
        <h1 className="text-lg mb-4 font-bold">Current Progress</h1>
        <div className="bg-white h-6 rounded-md overflow-hidden">
          <div
            className="bg-green-500 h-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm">{progressPercentage}% Complete</p>
      </div>
<hr></hr>

      <h1 className="text-3xl mt-20 font-bold  text-black pt-10 pb-10 ">Watch Course Content</h1>
      <div className="inline-flex bg-white shadow-lg rounded-md  p-10">
  <div className="flex bg-white h-auto w-1/2 rounded-md overflow-hidden shadow-md">
    <div>
      <ReactPlayer
        url={course.lectureVideosUrl}
        controls={true}
        width='100%'
        height='100%'
      />
    </div>
  </div>
  <div className="  p-10 ml-10 bg-white h-auto w-1/2 rounded-md overflow-hidden shadow-lg">
 
    <p className="text-2xl  font-bold text-black">Lecture Notes </p>
    
    <a className="text-xl  font-bold text-black"><br></br>{course.name}</a>
     <br></br>
     <div className="mt-20 bg-blue-500 p-5 rounded-md w-3/4 ">
  <a href="https://firebasestorage.googleapis.com/v0/b/cms-ds-f9841.appspot.com/o/videos%2FMLBOOK.pdf?alt=media&token=eb873908-eb77-4fda-8e33-c5b47e1a8b5e">Open Lecture Notes</a>
  </div>
  </div>
</div> 
    </div>
  );
};

export default CourseDetails;
