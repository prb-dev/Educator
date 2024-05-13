import Progress from "../../components/charts/Progress";
import { useSelector } from 'react-redux';

import FetchEnrolledCourse from "../../components/student/FetchEnrolledCourse";
import React, { useState, useEffect } from "react";
import StudentDetails from "../../components/student/StudentDetails";
import Calendar from 'react-calendar';



export default function DashboardS() {
  const currentDate = new Date().toLocaleDateString();
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
    console.log(newDate);
  };

  const { user } = useSelector((state) => state.user);

  // Add a conditional check to ensure that the user object exists before accessing its properties
  if (!user || !user.user) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  return (
    <div className="min-h-screen bg-blue-50 pt-10 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between p-10 shadow-lg rounded-lg bg-white">
        <div className="text-5xl font-semibold text-gray-800">
          {currentDate}
          <a className="text-blue-500   ">&nbsp; STUDENT DASHBOARD </a> 
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-lg font-semibold text-gray-800">
            <h1>Welcome   {user.user.username}</h1>
          </div>
          <img src="path/to/avatar-image.jpg" alt="avatar" className="w-12 h-12 rounded-full" />
        </div>
      </div>

      <div className="flex mt-10">
        <div className="w-3/4 mr-4">
          <div className="shadow-lg bg-white rounded-lg">
            <FetchEnrolledCourse />
          </div>
        </div>

        <div className="w-1/4">
          <div className="shadow-lg bg-white rounded-lg p-4">
            <h1 className="text-lg font-semibold text-gray-800 mb-2"> <a className="text-right text-blue-500">USERNAME &nbsp; &nbsp;&nbsp; </a> {user.user.username}</h1>
            <h1 className="text-lg font-semibold text-gray-800 mb-2"> <a className="text-right text-blue-500">EMAIL &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</a> {user.user.Email}</h1>

            <div className="mt-10 p-4 bg-white shadow-lg rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Calendar</h2>
              <Calendar value={date} onChange={handleDateChange} />
            </div>
          </div>
          <div className="shadow-sm text-lg pt-20 text-blue-500 ">
            <div>
              <h1>The only way to do great work is to love what you do. - Steve Jobs</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
