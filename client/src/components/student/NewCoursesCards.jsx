import { useEffect, useState } from "react";
// import courseData from "../../data/courseData";
import CourseCard from "./CoursesCard";

const title = {
  fontSize: "2rem",
  fontWeight: "bold",
  marginBottom: "1rem",
  marginTop: "2rem",
};

export default function NewCoursesCards() {
  const [courseData, setCourseData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:80/course")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((d) => {
          if (d.approved) {
            setCourseData((c) => [...c, d]);
          }
        });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div style={title} className="text-slate-700">
        New Courses
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courseData.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
