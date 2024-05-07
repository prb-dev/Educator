import { Container } from "@mui/material";
import CourseCard from "../../components/student/CoursesCard";
import courseData from "../../data/courseData";

export default function AllCourses() {
  return (
    <Container className="relative top-20 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {courseData.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </Container>
  );
}
