import React, { useState } from 'react';
import { Calendar } from '@mui/x-date-pickers/CalendarPicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <h2>Calendar View</h2>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Calendar date={selectedDate} onChange={(date) => setSelectedDate(date)} />
      </LocalizationProvider>
    </div>
  );
};

export default CalendarView;
