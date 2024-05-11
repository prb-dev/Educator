import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Backdrop, Box, Button, Fade, IconButton, Modal } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
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
import { useDispatch } from "react-redux";
import { signoutStart, signoutSuccess } from "../../redux/user/userSlice";

export default function AdminCourses() {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  const handleSignout = () => {
    try {
      dispatch(signoutStart());
      dispatch(signoutSuccess());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    setCourses([]);
    fetch(`http://localhost:80/course/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.forEach((d, i) => {
          if (!d.approved) {
            d.id = i + 1;
            if (d.schedule) d.hasSchedule = true;
            else d.hasSchedule = false;

            setCourses((c) => [...c, d]);
          }
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleApprove = (cid) => {
    fetch(`http://localhost:80/course/approve/${cid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      field: "id",
      headerName: "#",
    },
    {
      field: "code",
      headerName: "Code",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "hasSchedule",
      headerName: "Schedule exist",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
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
                  onClick={() => handleApprove(params.row._id)}
                  variant="text"
                  startIcon={<VisibilityOutlinedIcon />}
                >
                  Approve
                </Button>
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
          <Button
            size="small"
            onClick={handleSignout}
            sx={{
              position: "absolute",
              top: "10px",
              right: "30px",
            }}
            startIcon={<LogoutOutlinedIcon />}
          >
            Signout
          </Button>

          <h1 className="text-slate-700 text-2xl m-5 mb-6">
            Monitor courses <ShowChartOutlinedIcon />
          </h1>

          <h2 className="text-slate-700 text-xl m-5 mb-6"></h2>
          <div className="cursor-pointer">
            <Box sx={{ height: "100%", width: "100%", overflow: "hidden" }}>
              {courses.length != 0 ? (
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
                  rows={courses}
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
                  description={<h3 className="text-slate-500">No courses</h3>}
                />
              )}
            </Box>
          </div>
        </main>
      </Spin>
    </>
  );
}
