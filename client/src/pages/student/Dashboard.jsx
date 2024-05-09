 
import Progress from "../../components/charts/Progress";
import FetchEnrolledCourse from "../../components/student/FetchEnrolledCourse";
import React, { useState, useEffect } from "react";
import StudentDetails from "../../components/student/StudentDetails"
export default function DashboardS({ studentName }) {
  const currentDate = new Date().toLocaleDateString();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

 
    

 
  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
  };

   
 

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between shadow-lg p-10 shadow-lg rounded-lg">
        <div className="text-5xl font-semibold text-gray-800">
          {currentDate}
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-lg font-semibold text-gray-800">
            {studentName}UserNAME
          </div>
          <img src="path/to/avatar-image.jpg" alt="avatar" className="w-12 h-12 rounded-full" />
        </div>
      </div>
      <div className="flex mt-10">
        <div className="mt-10 pt-10 pd-10 shadow-xl shadow-yl h-96 rounded-lg flex-row w-96">
          <h1 className="text-center text-3xl mt-10">Enrolled courses</h1>
          <FetchEnrolledCourse/>
        </div>
        <div className="mt-10 pt-10 pd-10 ml-20 shadow-xl shadow-yl rounded-lg flex-row w-96">
          {!selectedCourse && <Progress />}
          {selectedCourse && (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg">
                <h1 className="text-3xl font-semibold mb-4">{selectedCourse}</h1>
                {/* Add course details here */}
                {/* For example, you can render a component with course details */}
                {/* <CourseDetails course={selectedCourse} /> */}
                <button onClick={handleCloseModal} className="bg-blue-500 text-white px-4 py-2 rounded-md">Close</button>
              </div>
            </div>
          )}
        </div>
        <div className="mt-10 pt-10 pd-10 ml-20 shadow-xl shadow-yl rounded-lg flex-row w-96">
          <div>
             
         <StudentDetails></StudentDetails>
          </div>
          <div className="mt-4">
            
          </div>
        </div>
      </div>
    </div>
  );
}
