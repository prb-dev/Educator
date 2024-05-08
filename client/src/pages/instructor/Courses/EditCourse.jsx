import { CardActions, Container } from "@mui/material";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const steps = ["Course Details", "Lectures", " Quizzes", "Pricing and Submit"];

export default function EditCourse() {
  const location = useLocation();
  const courseData = location.state.course;
  console.log(courseData);

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [steps0To3Complete, SetSteps0To3Complete] = useState(false);

  const [courseName, setCourseName] = useState(courseData.name);
  const [courseCode, setCourseCode] = useState(courseData.id);
  const [description, setDescription] = useState(courseData.description);
  const [bannerImage, setBannerImage] = useState(
    "https://getblogo.com/wp-content/uploads/2020/06/1-8.jpg"
  );
  const [noOfLectures, setNoOfLectures] = useState(courseData.noOfLectures);
  const [noOfQuizzes, setNoOfQuizzes] = useState(courseData.noOfQuizzes);
  const [lectureNoteUrl, setLectureNoteUrl] = useState(
    "https://getblogo.com/wp-content/uploads/2020/06/1-8.jpg"
  );
  const [lectureVideoUrl, setLectureVideoUrl] = useState(
    "https://getblogo.com/wp-content/uploads/2020/06/1-8.jpg"
  );
  const [quizQuestion, setQuizQuestion] = useState(courseData.quizQuestion);

  const [question, setQuestion] = useState();
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState();

  const [price, setPrice] = useState(courseData.price);

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
        correctAnswer: answer,
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
      lectureNoteUrl &&
      lectureVideoUrl &&
      noOfQuizzes &&
      quizQuestion
    ) {
      SetSteps0To3Complete(true);
    }
  };

  useEffect(() => {
    checkStepZeroToThreeComplete();
  });

  const handleSubmit = () => {
    console.log("Course Details", {
      courseCode,
      courseName,
      description,
      bannerImage,
    });
    console.log("Lectures", {
      noOfLectures,
      lectureNoteUrl,
      lectureVideoUrl,
    });
    console.log("Quizzes", { noOfQuizzes, quizQuestion });
    console.log("Pricing and Submit", { price });

    //alert
    alert("Course Added Successfully");
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
                {courseCode && courseName && description && bannerImage ? (
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

                  <div className="col-span-full">
                    <label
                      htmlFor="banner_image"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Banner Image
                    </label>
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
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
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
                {noOfLectures && lectureNoteUrl && lectureVideoUrl ? (
                  <Button onClick={handleNext}>Next</Button>
                ) : (
                  <div className="text-red-400">Please fill all the Fields</div>
                )}
              </CardActions>
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

                  <div className="col-span-full">
                    <label
                      htmlFor="banner_image"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Lecture Note
                    </label>
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
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
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
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
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
          {activeStep === 2 && (
            <div className="space-y-12">
              <CardActions className="justify-between">
                <Button onClick={handleBack}>Back</Button>
                {noOfQuizzes && quizQuestion ? (
                  <Button onClick={handleNext}>Next</Button>
                ) : (
                  <div className="text-red-400">Please fill all the Fields</div>
                )}
              </CardActions>

              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
          {activeStep === 3 && (
            <div className="space-y-12">
              <CardActions className="justify-between">
                <Button onClick={handleBack}>Back</Button>
                {SetSteps0To3Complete && price ? (
                  <Button onClick={handleSubmit}>
                    <div className="text-green-700 font-bold">Submit</div>
                  </Button>
                ) : (
                  <div className="text-red-400">Please fill all the Fields</div>
                )}
              </CardActions>

              <div className="border-b border-gray-900/10 pb-12">
                {steps0To3Complete ? (
                  price ? (
                    <div className="text-green-900 font-bold bg-green-200 rounded p-3">
                      Your Course is Ready to Submit, Please Review The Details
                    </div>
                  ) : (
                    <div className="text-blue-900 font-bold bg-blue-100 p-3 rounded">
                      Previous fields are completed, Please Fill The Price Field
                    </div>
                  )
                ) : (
                  <div className="text-red-900 font-bold bg-red-100 p-3 rounded">
                    You Have Missed Some Fields, Please Fill All The Fields
                  </div>
                )}

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                </div>
              </div>
            </div>
          )}
        </form>
      </Container>
    </main>
  );
}
