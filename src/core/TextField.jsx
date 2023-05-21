import React from "react";
import TextField from "@mui/material/TextField";

import "./TextField.css";

export default function TextBox(props) {
  return (
    <div className="form">
      <TextField
        label={props.label}
        value={props.value}
        onChange={props.onChange}
        type={props.type}
        variant="outlined"
        style={{ width: "100%" }}
      />
    </div>
  );
}
