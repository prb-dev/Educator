import { Box, Container, Modal } from "@mui/material";
// import courseData from "../../../data/courseData";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";

import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const cardStyles = {
  backgroundColor: "transparent",
};

const actionsStyles = {
  display: "flex",
  justifyContent: "space-between",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: "200px",
  bgcolor: "background.paper",
  border: "2px solid red",
  borderRadius: 2,
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const modelActionStyle = {
  width: "80%",
  marginTop: "40px",
  display: "flex",
  justifyContent: "space-between",
  position: "absolute",
  bottom: "10px",
};
export default function ViewCourses() {
  const navigator = useNavigate();
  const { user } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [courseData, setCourseData] = useState([]);

  const handleGetCourses = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8004/course/instructor/${id}`
      );
      console.log(response.data);
      setCourseData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetCourses(user.user._id);
  }, [user]);

  const handleOpen = (course) => {
    setSelectedCourse(course);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    console.log("Delete", selectedCourse);
    axios
      .delete(`http://localhost:8004/course/${selectedCourse._id}`)
      .then((response) => {
        console.log(response.data);
        handleGetCourses(user.user._id);
        setOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = (course) => {
    console.log("Edit", course);
    navigator(`/courses/edit`, { state: { course: course } });
  };

  return (
    <main
      className="w-full h-[100vh] bg-gradient-to-r from-slate-200 to-white
     text-slate-700 flex flex-col p-5 overflow-y-scroll"
    >
      <h1 className="text-2xl m-5 min-w-fit">
        View Courses <PreviewOutlinedIcon />
      </h1>

      <Container>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {courseData.map((course) => (
            <Grid item xs={2} sm={4} md={4} key={course.id}>
              <Card sx={{ maxWidth: 345 }} style={cardStyles}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={course.image}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      noWrap
                    >
                      {course.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {course.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions style={actionsStyles}>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleEdit(course)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleOpen(course)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* model */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              className="text-red-600 font-bold"
            >
              Delete Conformation
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              className="text-black"
            >
              Are you sure you want to delete{" "}
              <span className="font-bold">{selectedCourse.name}</span> course?
            </Typography>
            <CardActions style={modelActionStyle}>
              <Button size="small" color="error" onClick={handleDelete}>
                Delete
              </Button>
              <Button size="small" color="primary" onClick={handleClose}>
                Cancel
              </Button>
            </CardActions>
          </Box>
        </Modal>
      </Container>
    </main>
  );
}
