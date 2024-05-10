import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const FetchEnrolledCourse = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Fetch course IDs associated with the user
        const courseIds = user.courses;

        // Fetch course details using course IDs
        const coursePromises = courseIds.map(async (courseId) => {
          const courseResponse = await axios.get(`/api/getCourseById/${courseId}`);
          return courseResponse.data.course;
        });

        // Wait for all course requests to complete
        const fetchedCourses = await Promise.all(coursePromises);
        setCourses(fetchedCourses);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (user && user.courses) {
      fetchCourses();
    }
  }, [user]);

  const handleCourseClick = async (courseId) => {
    try {
      // Fetch details of the selected course
      const response = await axios.get(`/api/getCourseDetailsByID/${courseId}`);
      setSelectedCourse(response.data.course);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (courses.length === 0) return <div>No courses found</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {courses.map((course) => (
        <div key={course.id} className="bg-white rounded-lg shadow-md p-4 cursor-pointer" onClick={() => handleCourseClick(course.id)}>
          <h3 className="text-lg font-semibold">{course.name}</h3>
          {/* You can add more details here if needed */}
        </div>
      ))}

      {/* Popup modal to display course details */}
      {selectedCourse && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Course Details</h2>
            <p>Course Name: {selectedCourse.name}</p>
            {/* Add more course details here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default FetchEnrolledCourse;
