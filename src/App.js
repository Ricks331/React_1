import { BrowserRouter, Outlet } from "react-router-dom";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import AppRoutes from "routes";
import "./index.css";
import SimpleBackdrop from "components/backdrop";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import $ from "jquery";
function App() {
  function loadPreventDuplicate() {
    try {
      let self = this;
      $(document).ready(function () {
        if (window.IsDuplicate()) {
          // if (self.authService.isLogged()) {
          toast.error("Duplicate Window");
          // }

          // window.location.href='/duplicate'
          // window.open("about:blank", "_self");
          // window.close();
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
  // loadPreventDuplicate();
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SimpleBackdrop />
          <ToastContainer autoClose={1000} />
          <AppRoutes />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
