import PropType from "prop-types";
import { useNavigate } from "react-router-dom";

export default function CoursesCard(course) {
  const item = course.course;

  const navigator = useNavigate();

  // Navigate to course page
  //set course data to new page
  const navigateToCoursePage = () => {
    navigator(`/student/course/${item.id}`, { state: { course: item } });
  };

  return (
    <div
      className="card card-compact w-96 bg-base-100 shadow-xl cursor-pointer"
      onClick={navigateToCoursePage}
    >
      <figure>
        <img
          src={
            item.image ||
            "https://res.cloudinary.com/daee4aeur/image/upload/v1715274537/k1yvluvkhvp4g21izn0i.png"
          }
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.name}</h2>
        {/* <p>{item.instructor}</p> */}
        <div>{item.price} USD</div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Enroll Now</button>
        </div>
      </div>
    </div>
  );
}

CoursesCard.propTypes = {
  course: PropType.object,
};
