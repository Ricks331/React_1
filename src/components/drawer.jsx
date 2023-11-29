import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Typography, useMediaQuery } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import MiniDrawer from "sidebar/Sidebar";

const DrawerWithHeader = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 700px)");
  const menus = [
    {
      name: "Dashboard",
      state: "/home",
    },
    {
      name: "Reports",
      state: "/reports",
    },
  ];
  const [open, setOpen] = useState(false);

  const [selectedItem, setselectedItem] = useState(window.location.pathname);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();
  const isAuth = Boolean(useSelector((state) => state.token));
  let content = "";
  const iterate = (pos) => {
    for (let index = 0; index < menus.length; index++) {
      let element = menus[index];
      element.is_selected = false;
      if (index === pos) {
        element.is_selected = true;
      }
    }
  };
  const namicClass = (element) => {
    if (element.is_selected) {
      return "menu_selected";
    } else {
      return "menu_notselected";
    }
    // for (let index = 0; index < menus.length; index++) {
    //     let element = menus[index];
    //     element.is_selected = false
    //     if(index === pos){
    //         element.is_selected = true
    //     }
    // }
  };
  if (isAuth) {
    return (
      <div style={{ width: isNonMobileScreens ? "" : "10px" }}>
        {isNonMobileScreens ? (
          ""
        ) : (
          <IconButton
            onClick={toggleDrawer}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            {<MenuIcon />}
          </IconButton>
        )}
        {open ? <MiniDrawer toggleDrawer={toggleDrawer} /> : ""}
      </div>
    );
  } else {
    return "";
  }
};

export default DrawerWithHeader;
