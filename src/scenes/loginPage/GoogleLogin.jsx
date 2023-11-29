import React, { useEffect } from "react";
import APPCONSTANTS from "configs/constants";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { setLogout, setLogin } from "state";
import {
  GoogleLogin,
  useGoogleOneTapLogin,
  googleLogout,
} from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const CLIENT_ID = APPCONSTANTS.GC_CLIENT_ID; // Replace with your OAuth Client ID
const GoogleLoginComp = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const is1400Screens = useMediaQuery("(min-width: 1400px)");
  const is1300Screens = useMediaQuery("(min-width: 1300px)");
  const is1200Screens = useMediaQuery("(min-width: 1200px)");
  const is700Screens = useMediaQuery("(min-width: 700px)");
  const is400Screens = useMediaQuery("(min-width: 400px)");
  const is300Screens = useMediaQuery("(min-width: 300px)");
  const is375Screens = useMediaQuery("(min-width: 375px)");
  const is200Screens = useMediaQuery("(min-width: 200px)");

  let size = "310";
  if (is1400Screens) {
    size = "330";
  } else if (is1300Screens) {
    size = "307";
  } else if (is1200Screens) {
    size = "290";
  } else if (isNonMobileScreens) {
    size = "200";
  } else if (is700Screens) {
    size = "400";
  } else if (is400Screens) {
    size = "270";
  } else if (is375Screens) {
    size = "235";
  } else if (is300Screens) {
    size = "190";
  } else if (is200Screens) {
    size = "175";
  }
  let dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {}, []);
  const initializeGoogle = () => {
    console.log(window);
  };
  const clearSession = () => {
    localStorage.removeItem("authUser");
    dispatch(setLogout());
  };
  const parseJwt = (token) => {
    try {
      const user = token.profileObj;
      console.log(user);
      let base64Url = token.split(".")[1];
      let base64 = base64Url.replace("-", "+").replace("_", "/");
      return JSON.parse(window.atob(base64));
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  function _handleLoginSuccess(apiResult) {
    if (apiResult) {
      dispatch(
        setLogin({
          user: apiResult[0],
          token: apiResult[0].user_id,
        })
      );
      toast.success("Loggged in as " + apiResult[0].username);
      navigate("/home");
    }
  }
  const tryLogin = async (credentials) => {
    // credentials.email = "admin@nimsdxb.com";
    const loggedInResponse = await fetch(
      APPCONSTANTS.LOGIN_API_BASE_URL + "v1/gsuit_login_auth",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": APPCONSTANTS.X_AUTH_TOKEN,
        },
        body: JSON.stringify(credentials),
      }
    );
    const loggedIn = await loggedInResponse.json();
    if (loggedIn.error) {
      if (loggedIn.error.message) {
        toast.error(loggedIn.error.message);
      }
    } else {
      if (loggedIn.data && loggedIn.data.data) {
        _handleLoginSuccess(loggedIn.data.data);
      }
    }
  };
  console.log(size, "sizesizesizesizesize");
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID} theme="dark" >
      {" "}
      <GoogleLogin
        width={size}
        shape='circle'
        theme='filled_blue'
        onSuccess={(credentialResponse) => {
          let parsedItems = parseJwt(credentialResponse.credential);
          if (parsedItems) {
            clearSession();
            tryLogin(parsedItems);
          } else {
            console.log("Login Failed");
          }
          console.clear();
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        useOneTap
        cancel_on_tap_outside={false}
      />
    </GoogleOAuthProvider>

    // <button type="button" className="login-with-google-btn" onClick={handleSignIn}>
    //     Sign in with Google
    //     </button>
    // <div>
    //     <div id="gSignInWrapper">
    //         <span class="label">Sign in with:</span>
    //         <div id="customBtn" class="customGPlusSignIn">
    //         <span class="icon"></span>
    //         <span class="buttonText">Google</span>
    //         </div>
    //     </div>

    //   <button onClick={handleSignIn}>Login with Google</button>
    // </div>
  );
};

export default GoogleLoginComp;
