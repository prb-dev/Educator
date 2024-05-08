 
import Progress from "../../components/charts/Progress";
import React, { useState, useEffect } from "react";

export default function DashboardS({ studentName }) {
  const currentDate = new Date().toLocaleDateString();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);
  const fetchEnrolledCourses = async () => {
    try {
      // Fetch enrolled courses from the backend API
      const response = await axios.get(`/api/courses/user/${localStorage.getItem('userId')}`);
      setEnrolledCourses(response.data.courses);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      setLoading(false); // Update loading state even in case of error
    }
  };





  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
  };

   
  // Mock data for today's time table
  const timeTable = [
    { time: "09:00 AM", event: "Meeting with team" },
    { time: "11:00 AM", event: "Client presentation" },
    { time: "01:00 PM", event: "Lunch break" },
    { time: "03:00 PM", event: "Project discussion" },
  ];

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
          {loading ? (
            <p>Loading...</p>
          ) : enrolledCourses.length === 0 ? (
            <p>No enrolled courses found.</p>
          ) : (
            <div className="">
              <ul className="mt-6 border border-gray-400 ml-6 mr-6">
                {enrolledCourses.map((course, index) => (
                  <li
                    key={index}
                    className="text-lg cursor-pointer"
                    onClick={() => handleCourseClick(course)}
                  >
                    {course.courseName}
                  </li>
                ))}
              </ul>
            </div>
          )}
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
            <h1 className="text-center text-3xl mb-4">Today's Time Table</h1>
            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Time</th>
                  <th className="p-2">Event</th>
                </tr>
              </thead>
              <tbody>
                {timeTable.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2">{item.time}</td>
                    <td className="p-2">{item.event}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <h1 className="text-center text-3xl mb-4">Editable Note Book</h1>
            {/* Add editable note book component here */}
            {/* Example: <EditableNoteBook /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
