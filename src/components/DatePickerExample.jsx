import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { SketchPicker } from 'react-color';
import { format } from 'date-fns'; // Import the format function from date-fns
import './DatePicker.css'; // Import CSS file for custom styling

function DatePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedColor, setSelectedColor] = useState('#3498db');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };

  // Format selectedDate using date-fns
  const formattedDate = format(selectedDate, 'dd/MM/yyyy HH:mm:ss');

  return (
    <div className="date-picker-container">
      <h1 className="date-picker-title">Chọn Ngày và Giờ</h1>
      <div className="date-picker-content">
        <DateTimePicker
          onChange={handleDateChange}
          value={selectedDate}
          className="custom-datetime-picker"
        />
        <div className="color-picker">
          <SketchPicker color={selectedColor} onChange={handleColorChange} />
        </div>
        <div className="selected-date" style={{ color: selectedColor }}>
          Ngày và Giờ Được Chọn: {formattedDate}
        </div>
      </div>
    </div>
  );
}

export default DatePicker;
