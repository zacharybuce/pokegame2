import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#353C51",
      paper: "#353C51",
    },
    text: {
      primary: "#ededed",
      secondary: "#b8b8b8",
    },
    pokeicon: {
      main: "#ffffff",
      dark: "#fafafa",
    },
  },
});

export default theme;
