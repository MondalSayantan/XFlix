import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#ffffff", // white
      main: "#fafafa",
      dark: "#eeeeee",
      contrastText: "#586069",
    },
  },
});

export default theme;
