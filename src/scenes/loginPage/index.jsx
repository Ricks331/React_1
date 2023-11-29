import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
  Avatar,
  Stack,
} from "@mui/material";
import Form from "./Form";
import GoogleLoginComp from "./GoogleLogin";
import IconLogo from "components/IconLogo";
// import SignIn from "./signin";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const is1400Screens = useMediaQuery("(min-width: 1500px)");
  const is700Screens = useMediaQuery("(min-width: 700px)");
  const is400Screens = useMediaQuery("(min-width: 400px)");
  const is200Screens = useMediaQuery("(min-width: 200px)");

  let size = 18;
  if (is1400Screens) {
    size = 15;
  } else if (is700Screens) {
    size = 12;
  } else if (isNonMobileScreens) {
    size = 9;
  } else if (is400Screens) {
    size = 2;
  } else if (is200Screens) {
    size = 0;
  }
  return (
    <Box>
      <Typography
        fontWeight="bold"
        sx={{ marginTop: "8px", marginLeft: "15px" }}
      >
        <img
          style={{
            objectFit: "cover",
            marginBottom: "-5px",
          }}
          src={"/assets/logo.png"}
        />
      </Typography>
      <Box display={"flex"}>
        <Box width={isNonMobileScreens ? "55%" : "100%"}>
          <Box
            width={isNonMobileScreens ? "50%" : "80%"}
            p="2rem"
            m="2rem auto"
            borderRadius="1.5rem"
            backgroundColor={theme.palette.background.alt}
          >
            <Typography textAlign={"center"} fontWeight="500" variant="h5">
              Welcome Back
            </Typography>
            <Typography
              textAlign={"center"}
              sx={{ mb: "1.5rem", color: "grey" }}
            >
              Please enter your details to sign in
            </Typography>
            <Stack direction="row" spacing={size}>
              <GoogleLoginComp />
            </Stack>

            <br />
            <Divider>or continue with</Divider>
            <br />
            <Form />
          </Box>

          {/* <SignIn/> */}
        </Box>
        {isNonMobileScreens ? (
          <Box
            backgroundColor="#f7993b"
            sx={{ borderRadius: "10px", width: "42%" }}
          >
            <Box width={"75%"} p="1rem" m="1rem auto">
              <Typography variant="h6" sx={{ mb: "1.5rem", color: "white" }}>
                The Simplest way to manage your workforce
              </Typography>
              <Typography
                variant="caption"
                sx={{ mb: "1.5rem", color: "white" }}
              >
                Enter your crenditails to access your account
              </Typography>
              <br />
              <br />
              <br />
              <br />
              <br />
              <Box className="parent">
                <img
                  src="/assets/horizontal.png"
                  width={"230"}
                  height={"170"}
                />
                <Box className="child">
                  <img src="/assets/vertical.png" width={"90"} height={"130"} />
                </Box>
              </Box>
              <br />
              <br />
              <br />
              
              <Box>
                <Typography whiteSpace={4} variant="h6" sx={{ color: "white", marginTop:'80px'}}>
                  WeChat &nbsp;&nbsp; Booking.com &nbsp;&nbsp; Google
                  &nbsp;&nbsp; Spotify &nbsp;&nbsp; Stripe &nbsp;&nbsp; LOGOS
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default LoginPage;
