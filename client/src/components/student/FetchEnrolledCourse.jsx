import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const FetchEnrolledCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (!user || !user.user || !user.user.courses) {
          setLoading(false);
          setError('No user or user courses found.');
          return;
        }

        const courseIds = user.user.courses.map(course => course.course);

        const coursePromises = courseIds.map(async (courseId) => {
          try {
            const courseResponse = await axios.get(`http://localhost:80/course/${courseId}`);
            return courseResponse.data; // Return the entire course object
          } catch (error) {
            console.error(`Error fetching course with ID ${courseId}:`, error.message);
            throw new Error(`Error fetching course with ID ${courseId}: ${error.message}`);
          }
        });

        const fetchedCourses = await Promise.all(coursePromises);

        setCourses(fetchedCourses);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error.message);
        setError(`Error fetching courses: ${error.message}`);
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (courses.length === 0) return <div>No courses found</div>;

  return (
    <div>
      <h2 className='text-3xl p-10'>Enrolled Courses</h2>
      <div className="grid grid-cols-1 gap-4">
        {courses.map((course, index) => (
          <Link key={index} to={`/courses/${course._id}`}>  
            <div className="bg-blue-500 text-white p-4 rounded-md shadow-md cursor-pointer">
              <h3 className="font-semibold text-2xl">{course.name}</h3>
              <p className="mt-2">Code: {course.code}</p>
              <p className="mt-2">Steps: {course.steps.lectureCount} Lectures, {course.steps.quizCount} Quizzes</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FetchEnrolledCourse;
