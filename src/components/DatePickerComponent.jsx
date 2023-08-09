import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';

class DatePickerComponent extends Component {
  state = {
    startDate: null,
    endDate: null,
  };

  handleDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });
  };

  render() {
    const { startDate, endDate } = this.state;

    return (
      <div>
        <DateRangePicker
          startDate={startDate}
          startDateId="start_date_id"
          endDate={endDate}
          endDateId="end_date_id"
          onDatesChange={this.handleDatesChange}
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({ focusedInput })}
        />
      </div>
    );
  }
}

export default DatePickerComponent;
