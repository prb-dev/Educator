import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchEnrolledCourse = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Retrieve user ID from JWT token in local storage
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID not found in local storage');
        }

        // Fetch course IDs associated with the user ID
        const courseIdResponse = await axios.get(`/api/getCoursesOfUser/${userId}`);
        const courseIds = courseIdResponse.data.courseIds;

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

    fetchCourses();
  }, []);

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
    <div>
      <h2>User Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id} onClick={() => handleCourseClick(course.id)}>
            {course.name}
          </li>
        ))}
      </ul>

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
