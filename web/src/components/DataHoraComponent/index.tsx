import React, { useEffect, useState } from "react";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';
import blueGrey from "@material-ui/core/colors/blueGrey";
import amber from "@material-ui/core/colors/amber";
import "./styles.css";

type overridesNameToClassKey = {
  [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey extends overridesNameToClassKey {}
}

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: amber
  },
});



interface DataHoraProps {
  setDataHora: Function;
}

const DataHoraComponent: React.FC<DataHoraProps> = (props) => {

  const [selectedDate, handleDateChange] = useState<Date | null>(new Date());

  
  useEffect(() => {

    let diaMesAno = selectedDate?.toLocaleDateString();
    let horaMin = selectedDate?.toLocaleTimeString().substring(0,5);
    let dataOrdenada = diaMesAno + " " + horaMin;
    props.setDataHora(dataOrdenada);

  }, [selectedDate]);

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      {/* <DateTimePicker
        variant="inline"
        label="Basic example"
        value={selectedDate}
        onChange={handleDateChange}
      />
 */}
      <KeyboardDateTimePicker
        variant="inline"
        ampm={false}
        value={selectedDate}
        onChange={handleDateChange}
        onError={console.log}
        format="dd/MM/yyyy HH:mm"
        datatype="inline"
        strictCompareDates= {false}
      />
    </ThemeProvider>
  );
}
export default DataHoraComponent;
