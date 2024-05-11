import { Alert, CardActions, Container } from "@mui/material";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Card, Grid } from "antd";
import Item from "antd/es/list/Item";
import axios from "axios";
import { useSelector } from "react-redux";
import { uploadVideo } from "../../../firebaseUtilty";

const steps = ["Course Details", "Lectures & Quizzes", "Upload Material"];

export default function AddCourse() {
  const { user } = useSelector((state) => state.user);

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [steps0To3Complete, SetSteps0To3Complete] = useState(false);

  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [description, setDescription] = useState("");
  const [bannerImage, setBannerImage] = useState();
  const [noOfLectures, setNoOfLectures] = useState(0);
  const [noOfQuizzes, setNoOfQuizzes] = useState(0);
  const [lectureNoteUrl, setLectureNoteUrl] = useState("");
  const [lectureVideoUrl, setLectureVideoUrl] = useState("");
  const [quizQuestion, setQuizQuestion] = useState([]);
  const [courseVideo, setCourseVideo] = useState();

  const [question, setQuestion] = useState();
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState();

  const [price, setPrice] = useState(0);

  const [courseCreated, setCourseCreated] = useState(false);
  const [course, setCourse] = useState({});
  const [courseID, setCourseID] = useState("663dfe4b80ee48a36e8e806a");
  const [uploading, setUploading] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);
  const [fileUpaodError, setFileUploadError] = useState(false);
  const [bannerUplaodError, setBannerUploadError] = useState(false);
  const [bannerUplaoding, setBannerUploading] = useState(false);

  const [error, setError] = useState(null);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleNext = () => {
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    const lastStep = activeStep - 1;
    setActiveStep(lastStep);
  };

  const handleAddQuiz = () => {
    setQuizQuestion((prevQuizQuestion) => {
      const updatedQuizQuestion = [...prevQuizQuestion];
      updatedQuizQuestion.push({
        question: question,
        options: options,
        correctAnswerIndex: parseInt(answer),
      });
      setNoOfQuizzes(updatedQuizQuestion.length);

      setQuestion("");
      setOptions([]);
      setAnswer("");
      setOptions(["", "", "", ""]);

      return updatedQuizQuestion;
    });
  };

  const checkStepZeroToThreeComplete = () => {
    if (
      courseCode &&
      courseName &&
      description &&
      bannerImage &&
      noOfLectures &&
      price &&
      noOfQuizzes &&
      quizQuestion &&
      lectureNoteUrl &&
      lectureVideoUrl
    ) {
      SetSteps0To3Complete(true);
    }
  };

  useEffect(() => {
    checkStepZeroToThreeComplete();
  });

  //handle async for add courses
  const handleAddCourse = async (data) => {
    console.log("Data", data);
    try {
      const response = await axios.post("http://localhost:8004/course/", data);
      console.log(response);
      setCourseCreated(true);
      setCourse(response.data);
      console.log("repsonse", response.data);
      //CLEAR ALL THE FIELDS
      setCourseName("");
      setCourseCode("");
      setDescription("");
      setBannerImage("");
      setNoOfLectures(0);
      setNoOfQuizzes(0);
      setLectureNoteUrl("");
      setLectureVideoUrl("");
      setQuizQuestion([]);
      setPrice(0);
      SetSteps0To3Complete(false);

      alert("Course Created Successfully");
    } catch (error) {
      const response = error.response;
      alert(response.data.message);
    }
  };

  const handleSubmit = () => {
    console.log("Course Details", {
      courseCode,
      courseName,
      description,
    });
    console.log("Lectures", {
      noOfLectures,
    });
    console.log("Quizzes", { noOfQuizzes, quizQuestion });
    console.log("Pricing and Submit", { price });

    const data = {
      name: courseName,
      code: courseCode,
      image: bannerImage,
      steps: {
        lectureCount: parseInt(noOfLectures),
        quizCount: parseInt(noOfQuizzes),
      },
      description: description,

      instructor: user.user._id,
      price: parseInt(price),
      lectureNotesUrl: lectureNoteUrl,
      lectureVideosUrl: lectureVideoUrl,
      questions: quizQuestion,
    };

    console.log("question", quizQuestion);
    // console.log(data);
    handleAddCourse(data);
    //alert
  };

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    setUploading(true);
    try {
      const url = await uploadVideo(file);
      setLectureVideoUrl(url);
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setFileUploading(true);
    try {
      const url = await uploadVideo(file);
      setLectureNoteUrl(url);
    } catch (error) {
      setFileUploadError(error.message);
    } finally {
      setFileUploading(false);
    }
  };

  const uplaodImage = async (e) => {
    const file = e.target.files[0];
    setBannerUploading(true);
    try {
      const url = await uploadVideo(file);
      setBannerImage(url);
    } catch (error) {
      setBannerUploadError(error.message);
    } finally {
      setBannerUploading(false);
    }
  };
  return (
    <main
      className="w-full h-[100vh] bg-gradient-to-r from-slate-200 to-white
     text-slate-700 flex flex-col p-5 overflow-y-scroll"
    >
      <h1 className="text-2xl m-5 min-w-fit">
        Add New Courses <LibraryAddOutlinedIcon />
      </h1>

      <Container>
        <Box sx={{ width: "100%" }}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            {allStepsCompleted() ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                  Step {activeStep + 1}
                </Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                ></Box>
              </React.Fragment>
            )}
          </div>
        </Box>
        <form>
          {activeStep === 0 && (
            <div className="space-y-12">
              <CardActions className="justify-end">
                {courseCode &&
                courseName &&
                description &&
                price &&
                bannerImage ? (
                  <Button onClick={handleNext}>Next</Button>
                ) : (
                  <div className="text-red-400">Please fill all the Fields</div>
                )}
              </CardActions>
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="course_name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Course Name
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="course_name"
                          id="course_name"
                          autoComplete="course_name"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="janesmith"
                          value={courseName}
                          onChange={(e) => setCourseName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="course_code"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Course Code
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="course_code"
                          id="course_code"
                          autoComplete="course_code"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Enter course code"
                          value={courseCode}
                          onChange={(e) => setCourseCode(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="block w-full bg-transparent rounded-md border-2 p-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={""}
                        placeholder="Write a few sentences about the course."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="noOFlectures"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Price (USD)
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="noOFlectures"
                          id="noOFlectures"
                          autoComplete="noOFlectures"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Price in USD"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="banner_image"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Banner Image
                    </label>
                    {bannerImage ? (
                      <img src={bannerImage} className="rounded w-24" />
                    ) : null}
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          {/* {bannerImage ? (
                            <img
                              src={bannerImage}
                              alt="banner"
                              className="h-16 w-16 rounded-md"
                            />
                          ) : null} */}
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none hover:text-indigo-500"
                          >
                            <span>Upload a file</span>

                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={uplaodImage}
                            />
                            {bannerUplaoding && (
                              <p className="text-blue-600 bg-blue-200 p-3">
                                Uploading...
                              </p>
                            )}
                          </label>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeStep === 1 && (
            <div className="space-y-12">
              <CardActions className="justify-between">
                <Button onClick={handleBack}>Back</Button>
                {courseCode &&
                courseName &&
                price &&
                quizQuestion &&
                noOfLectures ? (
                  <Button onClick={handleNext}>Next</Button>
                ) : (
                  <div className="text-red-400">Please fill all the Fields</div>
                )}
              </CardActions>
              <div className="border-b border-gray-900/10 pb-12">
                {/* {steps0To3Complete ? (
                  <div className="text-green-700 font-bold bg-green-200 p-3 rounded">
                    Previous fields are completed, Review the data and click
                    Submit
                  </div>
                ) : (
                  <div className="text-red-900 font-bold bg-red-100 p-3 rounded">
                    You Have Missed Some Fields, Please Fill All The Fields
                  </div>
                )} */}

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"></div>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="noOFlectures"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Number of Lectures
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="noOFlectures"
                          id="noOFlectures"
                          autoComplete="noOFlectures"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="janesmith"
                          value={noOfLectures}
                          onChange={(e) => setNoOfLectures(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="noOfQuizzes"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Number of Quizzes
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md text-center shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <div className="flex justify-center items-center flex-col h-full m-2">
                          {noOfQuizzes === 0 ? (
                            <div className="text-red-400">
                              No Quiz Added Yet
                            </div>
                          ) : (
                            <div>{noOfQuizzes}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="banner_image"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      {quizQuestion.length + 1}. Question
                    </label>

                    <div className="mt-2">
                      <textarea
                        id="question"
                        name="question"
                        rows={3}
                        className="block w-full bg-transparent rounded-md border-2 p-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={""}
                        placeholder="Add your question."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* for loop with 4 repetition */}
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="sm:col-span-3">
                      <label
                        htmlFor={`option${i + 1}`}
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Option {i + 1}
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="text"
                            name={`option${i + 1}`}
                            id={`option${i + 1}`}
                            autoComplete={`option${i + 1}`}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder={`Answer Option ${i + 1}`}
                            value={options[i]}
                            onChange={(e) =>
                              setOptions((prevOptions) => {
                                const updatedOptions = [...prevOptions];
                                updatedOptions[i] = e.target.value;
                                return updatedOptions;
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="mt-2">
                    <label
                      htmlFor="answer"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Correct Answer
                    </label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="answer"
                        id="answer"
                        autoComplete="answer"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Correct Answer (1/2/3/4)"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <CardActions className="justify-end">
                  <Button onClick={handleAddQuiz}>Add to Quiz</Button>
                </CardActions>
              </div>
              <h2 className="text-center font-semibold leading-7 text-gray-900 bg-primary-50 ">
                Added Quizzes
              </h2>
              {quizQuestion.length > 0 ? (
                quizQuestion.map((quiz, i) => (
                  <div key={i}>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 bg-primary-50 p-5 rounded-lg">
                      <div className="col-span-full">
                        <label
                          htmlFor="question"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          {i + 1}. {quiz.question}
                        </label>
                        <div>
                          {quiz.options.map((option, j) => (
                            <div key={j} className="ml-5 sm:col-span-3">
                              <label htmlFor="answer" className="text-gray-900">
                                {j + 1}. {option}
                              </label>
                            </div>
                          ))}
                        </div>
                        <div>Correct Answer is : {quiz.correctAnswer}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-red-400">No Quiz Added Yet</div>
              )}
            </div>
          )}
          {activeStep === 2 && (
            <div className="space-y-12">
              <CardActions className="justify-between">
                {courseCreated ? (
                  <Button>Course Created</Button>
                ) : steps0To3Complete ? (
                  <Button onClick={handleSubmit}>Submit</Button>
                ) : (
                  <div className="text-red-400">Please fill all the Fields</div>
                )}
              </CardActions>
              <div className="border-b border-gray-900/10 pb-12">
                {steps0To3Complete ? (
                  <div className="text-green-700 font-bold bg-green-200 p-3 rounded">
                    Previous fields are completed, Review the data and click
                    Submit
                  </div>
                ) : (
                  <div className="text-red-900 font-bold bg-red-100 p-3 rounded">
                    You Have Missed Some Fields, Please Fill All The Fields
                  </div>
                )}
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="banner_image"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Lecture Note
                    </label>
                    {lectureNoteUrl ? (
                      <div className="w-100 h-7 bg-primary-50 text-wrap overflow-hidden p-2 rounded">
                        Note Uploaded : {lectureNoteUrl}
                      </div>
                    ) : null}

                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={handleFileChange}
                            />
                          </label>
                          {fileUploading && (
                            <p className="text-blue-600 bg-blue-200 p-3">
                              Uploading...
                            </p>
                          )}
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          pdf up to 20MB
                        </p>
                      </div>
                    </div>

                    {/* upload video */}
                    <div className="col-span-full">
                      <label
                        htmlFor="banner_image"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Lecture Video
                      </label>
                      {lectureVideoUrl ? (
                        <div className="w-100 h-7 bg-primary-50 text-wrap overflow-hidden p-2 rounded">
                          Video Uploaded : {lectureVideoUrl}
                        </div>
                      ) : null}
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none hover:text-indigo-500"
                            >
                              <input
                                type="file"
                                id="fileInput"
                                onChange={handleVideoChange}
                              />
                            </label>
                            {uploading && (
                              <p className="text-blue-600 bg-blue-200 p-3">
                                Uploading...
                              </p>
                            )}
                            {/* <p className="pl-1">or drag and drop</p> */}
                          </div>
                          <p className="text-xs leading-5 text-gray-600">
                            pdf up to 20MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </Container>
    </main>
  );
}
