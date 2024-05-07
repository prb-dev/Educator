import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Backdrop, Box, Button, Fade, IconButton, Modal } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import { Popover, Progress } from "antd";
import { useLocation } from "react-router-dom";

export default function Students() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const cname = params.get("course");
  const cid = params.get("cid");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8008/user/getAllstudents/${cid}`)
      .then((res) => res.json())
      .then((data) => {
        data.users.forEach((user, i) => {
          user.id = i + 1;
          setStudents((s) => [...s, user]);
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClose = () => setOpen(false);

  const handleOpen = () => setOpen(true);

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
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "access",
      headerName: "Action",
      renderCell: () => {
        return (
          <Popover
            trigger="click"
            content={
              <Button
                variant="text"
                onClick={handleOpen}
                startIcon={<VisibilityOutlinedIcon />}
              >
                View Progess
              </Button>
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
    <main className="w-full h-[100vh] bg-gradient-to-r from-slate-200 to-white p-5 overflow-y-scroll">
      <h1 className="text-slate-700 text-2xl m-5 mb-6">
        Monitor learner progress <ShowChartOutlinedIcon />
      </h1>

      <h2 className="text-slate-700 text-xl m-5 mb-6">{cname}</h2>
      <div className="cursor-pointer">
        <Box sx={{ height: "100%", width: "100%", overflow: "hidden" }}>
          <DataGrid
            sx={{
              "&, [class^=MuiDataGrid], .MuiTablePagination-root, .MuiButtonBase-root, .MuiSvgIcon-root":
                { border: "none" },
              ".MuiDataGrid-columnHeaders": {
                backgroundColor: "rgb(15 23 42)",
                color: "rgb(226 232 240)",
              },
              minHeight:"500px"
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
            <h1 className="text-lg text-slate-700">Student Progess</h1>

            <section className="flex justify-between mt-5">
              <div className="grid place-items-center gap-5">
                <p className="text-slate-500">Lecture progress </p>
                <Progress type="circle" percent={50} />
              </div>

              <div className="grid place-items-center gap-5">
                <p className="text-slate-500">Quiz progress </p>
                <Progress type="circle" percent={100} />
              </div>
            </section>
            <section className="mt-10">
              <p className="text-slate-500">Overall progress </p>
              <Progress type="line" percent={100} />
            </section>
          </Box>
        </Fade>
      </Modal>
    </main>
  );
}
