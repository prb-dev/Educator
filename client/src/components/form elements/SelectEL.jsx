import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";

export default function SelectEL({ label, helper, minWidth }) {
  const [x, setX] = useState("");

  const handleChange = (event) => {
    setX(event.target.value);
  };

  return (
    <main>
      <InputLabel id="course-label">{label}</InputLabel>
      <Select
        labelId="course-label"
        id="course-select"
        sx={{
          minWidth: {minWidth},
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.8)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
        }}
        value={x}
        onChange={handleChange}
        autoWidth
        label={label}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Twenty</MenuItem>
        <MenuItem value={21}>Twenty one</MenuItem>
        <MenuItem value={22}>Twenty one and a half</MenuItem>
      </Select>
      <FormHelperText sx={{ color: "rgb(255, 255, 255, .8)" }}>
        {helper}
      </FormHelperText>
    </main>
  );
}
