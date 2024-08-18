import { useContext } from "react";
import { ThemeContext } from "../contexts/themeContext";

export default function UseTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    new Error("You can't be able to call the theme context outside of the themeProvider");
  }
  return context;
}