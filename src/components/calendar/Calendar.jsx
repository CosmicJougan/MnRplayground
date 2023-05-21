import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";

import "./Calendar.css";

// https://retool.com/blog/how-to-build-a-react-form-component/
export default function CalendarComponent() {
  const navigate = useNavigate();

  const onClick = (value, event) => {
    var date = new Date(value);
    navigate(`/form/${date.toLocaleDateString().replaceAll("/", "-")}`);
  };

  return (
    <div>
      <div className="cardCalendar">
        <Card className="cardCalendarStyle">
          <CardContent className="cardCalendarContent">
            <Typography
              sx={{ fontSize: 18 }}
              color="text.secondary"
              gutterBottom
            >
              Selecteer een datum om de bijhorende overzicht te openen.
            </Typography>
            <Calendar onClickDay={onClick} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
