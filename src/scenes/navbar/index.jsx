import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Tooltip,
  Menu,
  Avatar,
  Grid,
  Toolbar,
  Badge,
  Stack,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Close,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import DrawerAppBar from "./NavIndex";
// import SideNav from "sidenav/SideNav";
import StudentFilter from "./StudentFilter";
import DrawerWithHeader from "components/drawer";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import APPCONSTANTS from "configs/constants";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.name}`;
  const userImage = `${user.image}`;
  const empNo = `${user.employeeNo}`;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutClick = () => {
    setAnchorEl(null);
    localStorage.removeItem("authUser");
    dispatch(setLogout());
    navigate("/");
  };
  const handleImageError = (event) => {
    event.target.src = "/assets/dummy-image.jpg"; // Replace with the path to your fallback image
  };
  return (
    <>
      <FlexBetween
        padding="1rem 6%"
        backgroundColor={alt}
        sx={{ marginTop: isNonMobileScreens ? "5px" : "" }}
      >
        <FlexBetween gap="1.75rem">
          {!isNonMobileScreens && <DrawerWithHeader />}
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="#BD8442"
            onClick={() => navigate("/home")}
            sx={{
              "&:hover": {
                color: "#BD8442",
                cursor: "pointer",
              },
              marginLeft: isNonMobileScreens ? "-25px" : "",
            }}
          >
            BM REPORTS
          </Typography>
          {isNonMobileScreens && (
            <div style={{ marginLeft: "150px", borderRadius: "9px" }}>
              <StudentFilter></StudentFilter>
            </div>
          )}
        </FlexBetween>

        {/* DESKTOP NAV */}
        {isNonMobileScreens ? (
          <Grid
            container
            spacing={0}
            justifyContent="flex-end"
            sx={{ width: "18%" }}
          >
            <FlexBetween gap="0rem">
              <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
              <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleClick}
              >
                {/* <Avatar>
                  {userImage ? (
                    <img
                      src={APPCONSTANTS.FILE_SERVER_URL + userImage}
                      width={25}
                      height={25}
                      onError={handleImageError}
                    />
                  ) : (
                    ""
                  )}
                </Avatar>{" "} */}
                <div className="circular-image">
                  <img
                    src={APPCONSTANTS.FILE_SERVER_URL + userImage}
                    alt="Your Image"
                    onError={handleImageError}
                  />
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <Tooltip title={fullName} placement="top">
                    <>
                      {" "}
                      {fullName.length > 10
                        ? `${fullName.substring(0, 10)}...`
                        : fullName}
                      <br />
                      <span style={{ color: "darkgray" }}>{empNo}</span>
                    </>
                  </Tooltip>
                </div>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                sx={{ top: "35px" }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={logoutClick}>
                  <PowerSettingsNewIcon /> Logout
                </MenuItem>
              </Menu>

              {/*          
          <FormControl variant="standard" value={fullName}>
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>{" "}
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl> */}
            </FlexBetween>
          </Grid>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* MOBILE NAV */}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box
            className="chumma"
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="90px"
            minWidth="50px"
            backgroundColor={background}
          >
            {/* CLOSE ICON */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close />
              </IconButton>
            </Box>

            {/* MENU ITEMS */}
            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="2rem"
            >
              <IconButton
                onClick={() => dispatch(setMode())}
                sx={{ fontSize: "25px" }}
              >
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
              <LogoutIcon title="Logout" onClick={() => logoutClick()} />
              {/* <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
              </Select>
            </FormControl> */}
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>
      {!isNonMobileScreens && (
        <Stack
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: "20px" }}
        >
          <StudentFilter></StudentFilter>
        </Stack>
      )}
    </>
  );
};

export default Navbar;
