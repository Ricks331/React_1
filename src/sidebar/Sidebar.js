import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import IconLogo from "components/IconLogo";
import {
  Assignment,
  ChevronLeft,
  ChevronRight,
  Home,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom/dist";

const drawerWidth = 180;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  backgroundColor: "white",
  overflowX: "hidden",
});

const closedMixin = (theme, isnonmobile) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#BD8442",
  width: "86px",
  borderTopLeftRadius: isnonmobile ? "30px" : "",
  borderBottomLeftRadius: isnonmobile ? "30px" : "",
  marginLeft: isnonmobile ? "5px" : "",
  marginTop: isnonmobile ? "5px" : "",
  maxHeight: isnonmobile ? "97%" : "",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  minHeight: "70px !important",
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, isnonmobile }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme, isnonmobile),
  }),
}));

const menuList = [
  {
    path: "/home",
    title: "Dashboard",
    icon: (
      <IconLogo image={"/assets/dashboard_icon.png"} size="50" radius="0" />
    ),

    // submenu: [
    //   { path: "/", title: "Help" },
    //   { path: "/", title: "Settings" },
    //   { path: "/", title: "About" },
    // ],
  },
  {
    path: "/reports",
    title: "Reports",
    icon: <IconLogo image={"/assets/report_icon.png"} size="50" radius="0" />,
  },
];

export default function MiniDrawer(props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedItem, setselectedItem] = React.useState(
    window.location.pathname
  );
  const isNonMobileScreens = useMediaQuery("(min-width: 700px)");

  const handleClick = (event) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handlePathClick = () => {
    setselectedItem(window.location.pathname);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    props.toggleDrawer(false);
  };
  const handleRedirect = (path) => {
    const user = localStorage.getItem("authUser");
    if (user) {
      navigate(path);
    } else {
      window.location.reload();
    }
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{ width: "86px" }}
      isnonmobile={isNonMobileScreens ? 1 : 0}
    >
      {isNonMobileScreens ? (
        <DrawerHeader>
          <IconLogo
            image={"/assets/bm_icon.png"}
            size="50"
            radius="0"
            right="10px"
          />
        </DrawerHeader>
      ) : (
        <DrawerHeader>
          <IconLogo
            image={"/assets/bm_icon.png"}
            size="50"
            radius="0"
            right="-8px"
            top="17px"
          />
          <IconButton
            onClick={handleDrawerClose}
            sx={{ marginTop: "-25px", marginRight: "-18px" }}
          >
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
      )}
      <List>
        {menuList.map((text, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{
              display: "block",
              color: "white",
              borderRadius: "16px",
            }}
          >
            <ListItemButton
              onMouseOver={text.submenu ? handleClick : handlePathClick}
              sx={{
                minHeight: 60,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                display: "block",
                paddingLeft: "8px",
              }}
              className={selectedItem == text.path ? "menu_selected" : ""}
              onClick={() => handleRedirect(text.path)}
            >
              <IconButton
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                  color: selectedItem == text.path ? "white" : "",
                }}
              >
                {text.icon}
              </IconButton>
              <br />
              <Typography color={"white"} sx={{ textAlign: "center" }}>
                {text.title}
              </Typography>
            </ListItemButton>
            {text.submenu && (
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{ onMouseLeave: handleClose }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                {text.submenu.map((menu, subIndex) => (
                  <MenuItem key={subIndex} onClick={handleClose}>
                    {menu.title}
                  </MenuItem>
                ))}
              </Menu>
            )}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
