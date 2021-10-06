import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import './App.css';
import TableDisplay from './components/TableDisplay'

function App() {
  const [currency, setCurrency] = React.useState('USD');
  const setCurrencyHandler = React.useCallback((e) => setCurrency(e.target.value), []);
  
  return (
    <div className="App">
      <FormControl margin="dense">
        <InputLabel id="currency-label">Currency</InputLabel>
        <Select
          labelId="currency-label"
          id="currency-select"
          value={currency}
          label="Currency"
          onChange={setCurrencyHandler}
        >
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="RUB">RUB</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
        </Select>
      </FormControl>
      <TableDisplay currency={currency} />
    </div>
  );
}

export default App;
