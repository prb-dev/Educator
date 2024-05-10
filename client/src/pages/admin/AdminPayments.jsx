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

export default function AdminPayments() {
  const [open, setOpen] = useState(false);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    console.log(payments);
  }, [payments]);

  useEffect(() => {
    setLoading(true);
    setPayments([]);
    fetch(`http://localhost:80/payment/all`)
      .then((res) => res.json())
      .then((data) => {
        data.payments.forEach((d, i) => {
          let temp = {};
          temp.id = i + 1;
          temp.amount = d.amount;
          temp.courseName = d.course.name;
          temp.payUser = d.user.name;
          temp.email = d.user.email;
          temp.date = new Date(d.created_at).toLocaleDateString(undefined, {
            day: "2-digit",
            year: "numeric",
            month: "short",
          });
          setPayments((c) => [...c, temp]);
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "#",
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
    },
    {
      field: "courseName",
      headerName: "Course",
      flex: 1,
    },
    {
      field: "payUser",
      headerName: "Student",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
  ];

  return (
    <>
      {contextHolder}
      <Spin spinning={loading}>
        <main className="w-full h-[100vh] bg-gradient-to-r from-slate-200 to-white p-5 overflow-y-scroll">
          <h1 className="text-slate-700 text-2xl m-5 mb-6">
            Monitor payments <ShowChartOutlinedIcon />
          </h1>

          <h2 className="text-slate-700 text-xl m-5 mb-6"></h2>
          <div className="cursor-pointer">
            <Box sx={{ height: "100%", width: "100%", overflow: "hidden" }}>
              {payments.length != 0 ? (
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
                  rows={payments}
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
                  description={<h3 className="text-slate-500">No payments</h3>}
                />
              )}
            </Box>
          </div>
        </main>
      </Spin>
    </>
  );
}
