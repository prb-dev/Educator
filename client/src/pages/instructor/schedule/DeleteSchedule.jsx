import React from "react";
import FormControl from "@mui/material/FormControl";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SelectEL from "../../../components/form elements/SelectEL";

export default function DeleteSchedule() {
  return (
    <main className="content text-white flex flex-col">
      <h1 className="text-2xl m-5 min-w-fit">
        Delete Schedules <CalendarMonthOutlinedIcon />
      </h1>
      <div className="flex justify-between items-center">
        <FormControl
          sx={{
            ".MuiInputLabel-root, .MuiSelect-outlined": {
              color: "white",
            },
            "&, .MuiSvgIcon-root, .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
              { color: "white" },
          }}
        >
          <SelectEL label="Course" helper="Selcet a course" minWidth={120} />
        </FormControl>
      </div>
    </main>
  );
}
