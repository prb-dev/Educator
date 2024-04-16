import React from "react";
import TextField from "@mui/material/TextField";

export default function TextFieldEl({ label, minWidth, helper }) {
  return (
    <TextField
      label={label}
      variant="outlined"
      helperText={helper}
      InputLabelProps={{ style: { color: "white" } }}
      inputProps={{
        style: {
          color: "white",
        },
      }}
      FormHelperTextProps={{
        style: {
          color: "white",
        },
      }}
      sx={{
        minWidth: { minWidth },
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(255, 255, 255, 0.8)",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
          ".MuiFormLabel-root": {
            color: "white",
          },
        },
      }}
    />
  );
}
