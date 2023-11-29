import { useState } from "react";
import { toast } from "react-toastify";

import APPCONSTANTS from "configs/constants";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const X_AUTH_TOKEN = APPCONSTANTS.X_AUTH_TOKEN;
const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};
const errorInfo = {
  error_code: "",
  message: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const [isChecked, setIsChecked] = useState(localStorage.isChecked);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [type, setType] = useState("password");

  console.log();

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  //   const [error, setError] = useState(false);
  let [
    errorMessage = {
      username_error: "",
      password_error: "",
      common_error: "",
    },
    setErrorMessage,
  ] = useState(""); // State for error message

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    let req = {
      password: values.password,
      username: values.email,
      userAgent: "web",
    };
    console.log(APPCONSTANTS.LOGIN_API_BASE_URL + "v1/login_auth");
    const loggedInResponse = await fetch(
      APPCONSTANTS.LOGIN_API_BASE_URL + "v1/login_auth",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": X_AUTH_TOKEN,
        },
        body: JSON.stringify(req),
      }
    );
    const loggedIn = await loggedInResponse.json();
    console.log(loggedIn);
    if (loggedIn.status) {
      if (loggedIn.status.code == 200) {
        /**success */
        // toast('Hello Geeks')
        toast.success("Logged in Successfully");
        onSubmitProps.resetForm();
        _handleLoginSuccess(loggedIn.data.data);
      } else {
        /**Login Api error */
        toast.error("Cannot Login With The Credentials");
        handleLoginError(loggedIn.error);
      }
    }
    return;
  };
  const handleLoginError = (error) => {
    // Handle and display the error message to the user
    // errorMessage = 'Error Occured'
    errorMessage = {};
    if (error.message) {
      errorMessage.common_error = error.message;
    }
  };

  function _handleLoginSuccess(apiResult) {
    if (apiResult) {
      console.log(apiResult);
      dispatch(
        setLogin({
          user: apiResult[0],
          token: apiResult[0].user_id,
        })
      );
      navigate("/home");
    }
  }
  const handleBoxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);

    if (isLogin && isChecked) {
      localStorage.setItem("isChecked", isChecked);
      localStorage.setItem("email", values.email);
      localStorage.setItem("password", values.password);
    } else if (!isChecked) {
      localStorage.removeItem("isChecked");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
  };

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
      //   errorInfo={errorInfo}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email Address"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email ?? localStorage.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type={type}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password ?? localStorage.password}
              name="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <span
                      className="flex justify-around items-center"
                      onClick={handleToggle}
                    >
                      {type == "password" ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </span>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
            {errorMessage && errorMessage.username_error && (
              <p className="error-message">{errorMessage.username_error}</p>
            )}
          </Box>
          <Box display={isNonMobileScreens ? "flex" : ""}>
            <FormControlLabel
              sx={{ width: "133px" }}
              control={
                <Checkbox onChange={handleBoxChange} checked={isChecked} />
              }
              label="Remember me"
            />
            {/* {isNonMobileScreens ? "" : <br />} */}
            {/* <Link
              href="#"
              color="inherit"
              sx={{
                width: "131px",
                marginLeft: isNonMobileScreens ? "66px" : "",
                marginTop: isNonMobileScreens ? "10px" : "",
              }}
            >
              {"Forgot password?"}
            </Link> */}
          </Box>
          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                backgroundColor: "#f7993b",
                textTransform: "capitalize",
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "Sign in" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin ? "" : ""}
            </Typography>
            {errorMessage && errorMessage.password_error && (
              <p className="error-message">{errorMessage.password_error}</p>
            )}
          </Box>
          {errorMessage && errorMessage.common_error && (
            <p className="error-message">{errorMessage.common_error}</p>
          )}
        </form>
      )}
    </Formik>
  );
};

export default Form;
