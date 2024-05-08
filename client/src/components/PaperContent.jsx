import React from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";

export default function PaperContent({
  startAt,
  finishAt,
  lecture,
  deleteFn,
  fromEdit,
}) {
  if (fromEdit) {
    startAt = new Date(startAt);
    finishAt = new Date(finishAt);
  }

  const s = startAt.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const f = finishAt.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <main className="flex flex-col m-5 p-3 text-slate-700 w-full h-full bg-slate-700/5 rounded-md relative">
      <p>
        {s} - {f}
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
        <DeleteOutlineOutlinedIcon className="text-slate-700" />
      </IconButton>
    </main>
  );
}
