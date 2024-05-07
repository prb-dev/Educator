import React, { useState } from "react";
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

  const data = [
    {
      id: 1,
      name: "Jon Snow",
      email: "jonsnow@gmail.com",
      age: 35,
      phone: "(665)121-5454",
      access: "admin",
    },
    {
      id: 2,
      name: "Cersei Lannister",
      email: "cerseilannister@gmail.com",
      age: 42,
      phone: "(421)314-2288",
      access: "manager",
    },
    {
      id: 3,
      name: "Jaime Lannister",
      email: "jaimelannister@gmail.com",
      age: 45,
      phone: "(422)982-6739",
      access: "user",
    },
    {
      id: 4,
      name: "Anya Stark",
      email: "anyastark@gmail.com",
      age: 16,
      phone: "(921)425-6742",
      access: "admin",
    },
    {
      id: 5,
      name: "Daenerys Targaryen",
      email: "daenerystargaryen@gmail.com",
      age: 31,
      phone: "(421)445-1189",
      access: "user",
    },
    {
      id: 6,
      name: "Ever Melisandre",
      email: "evermelisandre@gmail.com",
      age: 150,
      phone: "(232)545-6483",
      access: "manager",
    },
    {
      id: 7,
      name: "Ferrara Clifford",
      email: "ferraraclifford@gmail.com",
      age: 44,
      phone: "(543)124-0123",
      access: "user",
    },
    {
      id: 8,
      name: "Rossini Frances",
      email: "rossinifrances@gmail.com",
      age: 36,
      phone: "(222)444-5555",
      access: "user",
    },
  ];

  const columns = [
    {
      field: "id",
      headerName: "#",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "email",
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
            }}
            rows={data}
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
