import React, { useState } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';

export default function Home() {
  const [datePicker1, setDate1] = useState(new Date());
  const [datePicker2, setDate2] = useState(new Date());
  const [disableDate, setDisableDate] = useState(true)

  const handleDate1Change = (event, newDate) => {
    setDate1(newDate);
    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    const updatedDate2 = new Date(year, month);
    setDate2(updatedDate2);
    setDisableDate(false);
  };

  const handleDate2Change = (event, newDate) => {
    setDate2(newDate);
  };

  return (
    <MuiThemeProvider>
    {/* 
      Use MuiThemeProvider to avoid error
      TypeError: Cannot read properties of undefined (reading 'prepareStyles') 
    */}
     <DatePicker
          label="Date 1"
          value={datePicker1}
          onChange={handleDate1Change}
      />
      <DatePicker
          label="Date 2"
          value={datePicker2}
          onChange={handleDate2Change}
          disabled={disableDate}
      />
    </MuiThemeProvider>
  );
}
