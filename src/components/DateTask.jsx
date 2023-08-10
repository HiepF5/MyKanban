import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "./DateTask.css"; // Import tệp CSS vừa tạo

function DateTask({ startDateInput, endDateInput }) {
  const [dateRange, setDateRange] = useState([startDateInput, endDateInput]);
  const [startDate, endDate] = dateRange;

  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      withPortal
    />
  );
}

export default DateTask;
