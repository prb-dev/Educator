import courseData from "../../data/courseData";
import CourseCard from "./CoursesCard";

const title = {
  fontSize: "2rem",
  fontWeight: "bold",
  marginBottom: "1rem",
  marginTop: "2rem",
};

export default function NewCoursesCards() {
  return (
    <div>
      <div style={title}>New Courses</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courseData.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
