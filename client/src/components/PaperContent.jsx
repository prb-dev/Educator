import React from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";

export default function PaperContent({ startAt, finishAt, lecture, deleteFn }) {
  return (
    <main className="flex flex-col m-5 p-3 text-white w-full h-full bg-slate-800 rounded-md relative">
      <p>
        {startAt} - {finishAt}
      </p>
      <p className="mb-6 mt-3">{lecture}</p>
      <IconButton
        sx={{
          position: "absolute",
          right: "4px",
          bottom: "4px",
          width: "fit-content",
        }}
        onClick={deleteFn}
      >
        <DeleteOutlineOutlinedIcon className="text-white" />
      </IconButton>
    </main>
  );
}
