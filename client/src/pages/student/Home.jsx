import { Container } from "@mui/material";
import Slider from "../../components/student/Slider";
import NewCoursesCards from "../../components/student/NewCoursesCards";

const fullContainer = {
  height: "100%",
};

export default function Home() {
  return (
    <Container className="relative top-0 " style={fullContainer}>
      <Slider />
      <NewCoursesCards />
    </Container>
  );
}
