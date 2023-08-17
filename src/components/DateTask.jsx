import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function DateTask({ startDateInput, endDateInput }) {
  const startDateInput2 = new Date(startDateInput)
  const endDateInput2 = new Date(endDateInput);

  const [dateRange, setDateRange] = useState([startDateInput2, endDateInput2])
  const [startDate, endDate] = dateRange

  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update)
      }}
      disabled
    />
  )
}

export default DateTask
