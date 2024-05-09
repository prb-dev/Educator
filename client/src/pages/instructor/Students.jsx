import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Backdrop, Box, Button, Fade, IconButton, Modal } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import {
  Popover,
  Progress,
  Spin,
  Empty,
  Statistic,
  Popconfirm,
  message,
} from "antd";
import { useLocation } from "react-router-dom";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function Students() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const cname = params.get("course");
  const cid = params.get("cid");
  const [students, setStudents] = useState([]);
  const [lecCount, setLecCount] = useState(0);
  const [quizCount, setQuizCount] = useState(0);
  const [lecProg, setLecProg] = useState(0);
  const [quizProg, setQuizProg] = useState(0);
  const [overallProg, setOverallProg] = useState(0);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    setLoading(true);
    setStudents([]);
    fetch(`http://localhost:80/user/getAllstudents/${cid}`)
      .then((res) => res.json())
      .then((data) => {
        data.users.forEach((user, i) => {
          user.courses.forEach((course) => {
            if (course.course == cid) {
              user.id = i + 1;
              user.enrolledDate = new Date(
                course.enrolledDate
              ).toLocaleDateString(undefined, {
                day: "2-digit",
                year: "numeric",
                month: "short",
              });

              setStudents((s) => [...s, user]);
            }
          });
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [cname]);

  const handleClose = () => {
    setOpen(false);
    setLecProg(0);
    setQuizProg(0);
    setOverallProg(0);
  };

  const handleOpen = (uid) => {
    setLoading(true);
    setOpen(true);

    fetch(`http://localhost:80/analyse/${uid}/${cid}`)
      .then((res) => res.json())
      .then((data) => {
        setLecProg(Math.ceil(data.lectureProgress * 100));
        setQuizProg(Math.ceil(data.quizProgress * 100));
        setOverallProg(Math.ceil(data.overallProgress * 100));
        setLecCount(data.lectureCount);
        setQuizCount(data.quizCount);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleUnenroll = (uid) => {
    setLoading(true);
    fetch(`http://localhost:80/enrollment/unenroll/${uid}/${cid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.errorMessage)
          messageApi.open({
            type: "error",
            content: "Failed to unenroll the student",
          });
        else {
          const updatedStudents = students.filter(
            (student) => student._id != uid
          );
          setStudents(updatedStudents);
          messageApi.open({
            type: "success",
            content: "Student unenrolled",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
  };

  const columns = [
    {
      field: "id",
      headerName: "#",
    },
    {
      field: "username",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "Email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "enrolledDate",
      headerName: "Enrolled Date",
      flex: 1,
    },
    {
      field: "",
      headerName: "Action",
      renderCell: (params) => {
        return (
          <Popover
            trigger="click"
            content={
              <div className="flex flex-col">
                <Button
                  variant="text"
                  onClick={() => handleOpen(params.row._id)}
                  startIcon={<VisibilityOutlinedIcon />}
                >
                  View Progess
                </Button>

                <Popconfirm
                  title="Do you want to unenroll this student?"
                  description="This is not reversable"
                  placement="bottom"
                  onConfirm={() => handleUnenroll(params.row._id)}
                >
                  <Button
                    className="self-start"
                    variant="text"
                    color="error"
                    startIcon={<DeleteOutlineOutlinedIcon />}
                  >
                    Remove
                  </Button>
                </Popconfirm>
              </div>
            }
          >
            <IconButton>
              <MoreVertOutlinedIcon />
            </IconButton>
          </Popover>
        );
      },
    },
  ];

  return (
    <>
      {contextHolder}
      <Spin spinning={loading}>
        <main className="w-full h-[100vh] bg-gradient-to-r from-slate-200 to-white p-5 overflow-y-scroll">
          <h1 className="text-slate-700 text-2xl m-5 mb-6">
            Monitor learner progress <ShowChartOutlinedIcon />
          </h1>

          <h2 className="text-slate-700 text-xl m-5 mb-6">{cname}</h2>
          <div className="cursor-pointer">
            <Box sx={{ height: "100%", width: "100%", overflow: "hidden" }}>
              {students.length != 0 ? (
                <DataGrid
                  sx={{
                    "&, [class^=MuiDataGrid], .MuiTablePagination-root, .MuiButtonBase-root, .MuiSvgIcon-root":
                      { border: "none" },
                    ".MuiDataGrid-columnHeaders": {
                      backgroundColor: "rgb(15 23 42)",
                      color: "rgb(226 232 240)",
                    },
                    minHeight: "500px",
                  }}
                  rows={students}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10,
                      },
                    },
                  }}
                  pageSizeOptions={[10]}
                  disableRowSelectionOnClick
                />
              ) : (
                <Empty
                  description={<h3 className="text-slate-500">No students</h3>}
                />
              )}
            </Box>
          </div>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={() => handleClose()}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <Spin spinning={loading}>
                  <h1 className="text-xl text-slate-700">Student Progess</h1>

                  <section className="flex justify-between mt-5 mb-10">
                    <Statistic
                      className="grid place-items-center"
                      title={
                        <p className="text-base text-slate-500">
                          Total lectures
                        </p>
                      }
                      value={lecCount}
                    />

                    <Statistic
                      className="grid place-items-center mr-5"
                      title={
                        <p className="text-base text-slate-500">Total quizes</p>
                      }
                      value={quizCount}
                    />
                  </section>

                  <section className="flex justify-between mt-5">
                    <div className="grid place-items-center gap-5">
                      <p className="text-slate-500">Lecture progress </p>
                      <Progress type="circle" percent={lecProg} />
                    </div>

                    <div className="grid place-items-center gap-5">
                      <p className="text-slate-500">Quiz progress </p>
                      <Progress type="circle" percent={quizProg} />
                    </div>
                  </section>
                  <section className="mt-10">
                    <p className="text-slate-500">Overall progress </p>
                    <Progress type="line" percent={overallProg} />
                  </section>
                </Spin>
              </Box>
            </Fade>
          </Modal>
        </main>
      </Spin>
    </>
  );
}
