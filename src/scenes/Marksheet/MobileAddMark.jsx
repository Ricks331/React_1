import {
  Box,
  Typography,
  Grid,
  Divider,
  IconButton,
  Card,
  Button,
  useMediaQuery,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import CommonService from "services/commonService";
import { useParams } from "react-router";
import ApiService from "services/apiService";
import APPCONSTANTS from "configs/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "underscore";
import { styled } from "@mui/material/styles";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import PreviewIcon from "@mui/icons-material/Preview";
import PreviewMarks from "./PreviewMarks";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const MobileAddMark = (props) => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1300px)");
  const [studentListResponse, setStudentListResponse] = useState({});
  const [studentList, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [inputName, setName] = useState("");
  const [maxMark, setMaxMark] = useState("");
  const [singleMark, setSingleMark] = useState([]);
  const [ids, setChecked] = useState([]);
  const [eachMark, setEachMark] = useState([]);
  const [mark, setMark] = useState([]);
  const dispatch = useDispatch();
  CommonService.loaderOFF(dispatch);
  const userData = useSelector((state) => state.user);
  let url_params = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("authUser");
    if (user) {
      getList(url_params, userData, dispatch);
    } else {
      toast.error("Your not logged in.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, []);

  const getList = async () => {
    let ret_val = {};
    try {
      CommonService.loaderON(dispatch);
      let req = {
        session_id: url_params.session,
        curriculum_id: url_params.curriculum,
        class_id: url_params.class,
        batch_id: url_params.batch,
        school_id: userData.school_id,
        academic_year: userData.academic_year,
        user_id: userData.user_id,
        FILE_SERVER_CLIENT: APPCONSTANTS.FILE_SERVER_URL,
      };
      let apiResult = await ApiService.post("bmr/student/list", req);
      console.log(apiResult);
      ret_val = apiResult.details.response;
      setStudentListResponse(ret_val);
      _.each(ret_val.students, function (one) {
        if (one.image && one.image.original) {
          one.student_img = APPCONSTANTS.LIVEFS + one.image.original;
        }
      });
      setFilteredStudents(ret_val.students);
      CommonService.loaderOFF(dispatch);
      // return ret_val
    } catch (error) {
      console.log(error);
      CommonService.loaderOFF(dispatch);
      // return ret_val
    }
  };
  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setName(searchTerm);
  };
  const handleMaxChange = (e) => {
    if (Number(e.target.value)) {
      const mark = e.target.value;
      setMaxMark(mark);
    } else {
      setMaxMark("");
    }
  };

  const handleCheckboxChange = (student, isChecked) => {
    let updatedList = [...ids];
    console.log(student, isChecked);
    if (!isChecked) {
      student.marks = "Absent";
      updatedList = [...ids, student._id];

      let newval = { [student._id]: "Absent" };
      setSingleMark(newval);
    } else {
      updatedList.splice(ids.indexOf(student._id), 1);
      student.marks = "";
      let newval = { [student._id]: "" };
      setSingleMark(newval);
    }
    setChecked(updatedList);
  };

  const handleMarkChange = (student, e) => {
    if (Number(e.target.value)) {
      console.log(Number(e.target.value));
      let newval = { [e.target.id]: e.target.value };
      student.marks = e.target.value;
      setSingleMark(newval);
    } else {
      student.marks = "";
      console.log(student, e.target.value);
      setSingleMark({ [e.target.id]: "" });
    }
  };

  const submitMark = async (e) => {
    e.preventDefault();
    console.log(mark);
    if (inputName == "" && maxMark == "") {
      return toast.error(
        "Name should not be empty and Max mark should not be empty or should be in a range of 3 digit number"
      );
    }
    if (inputName == "") {
      return toast.error("Enter exam name");
    }
    if (maxMark == "" || maxMark.length > 3) {
      return toast.error(
        "Max mark should not be empty or should be in a range of 3 digit number"
      );
    }

    const students = filteredStudents.map((item, index) => {
      const newVal = { [item._id]: document.getElementById(item._id).value };
      return newVal;
    });
    setEachMark(students);

    const greater = students
      .map((obj) => Object.values(obj)[0])
      .filter((value) => value !== "" && Number(value) > maxMark);
    if (greater.length > 0) {
      setErrors(greater);
      return toast.error("Mark should be less than or equal to max mark.");
    }

    let obj = { ExamName: inputName, max_mark: maxMark, marks: students };
    console.log(obj);
    sessionStorage.setItem("termMarks", JSON.stringify(obj));
  };

  const handleGoBack = () => {
    navigate(
      "/student/list/" +
        url_params.session +
        "/" +
        url_params.curriculum +
        "/" +
        url_params.class +
        "/" +
        url_params.batch
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleReset = () => {
    const students = filteredStudents.map((item, index) => {
      item.marks = "";
    });
    setName("");
    setMaxMark("");
    setEachMark([]);
    setChecked([]);
  };
  const handleImageError = (event) => {
    event.target.src = "/assets/dummy-image.jpg"; // Replace with the path to your fallback image
  };
  return (
    <Box>
      <Box padding="2rem 6%" sx={{ gap: 1 }}>
        <Box sx={{ display: "flex", gap: "1rem" }} spacing={3}>
          <ArrowBackIcon
            onClick={() => handleGoBack()}
            fontSize="large"
            sx={{ "&:hover": { border: "2px solid orange" } }}
          />
          <Typography
            className="text-primary subHead"
            variant="h3"
            sx={{ marginLeft: "30px" }}
            noWrap
          >
            Add Marks{" "}
          </Typography>
          <Button
            variant="contained"
            sx={{
              background: "#1E1C59",
              color: "white",
              minWidth: "37px",
            }}
          >
            {studentListResponse.header
              ? studentListResponse.header.xclass
              : ""}
          </Button>
          <Button
            variant="contained"
            sx={{
              background: "#F7993B",
              color: "white",
              minWidth: "37px",
            }}
          >
            {studentListResponse.header ? studentListResponse.header.batch : ""}
          </Button>
        </Box>
        <br />
        <Box sx={{ display: "flex", gap: "1rem" }} spacing={3}>
          <Button
            variant="contained"
            sx={{
              background: "#1E1C59",
              color: "white",
            }}
            onClick={submitMark}
          >
            <SaveIcon />
            &nbsp; Save
          </Button>
          <Button
            variant="contained"
            sx={{
              background: "#1E1C59",
              color: "white",
            }}
            onClick={handleClickOpen}
          >
            <PreviewIcon />
            &nbsp; Preview
          </Button>

          <Button
            variant="contained"
            sx={{
              background: "#1E1C59",
              color: "white",
            }}
            onClick={handleReset}
          >
            <RefreshIcon />
            &nbsp; Reset
          </Button>
        </Box>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <FormGroup>
              <TextField
                value={inputName}
                label="Name"
                required
                error={inputName.length > 100 ? true : false}
                id="outlined-error-helper-text"
                size="small"
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {inputName.length}/100
                    </InputAdornment>
                  ),
                }}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={4}>
            <FormGroup sx={{ float: "right" }}>
              <TextField
                id="outlined-size-small"
                value={maxMark}
                label="Max Mark"
                size="small"
                name="max-mark"
                onChange={handleMaxChange}
              />
            </FormGroup>
          </Grid>
        </Grid>
        {filteredStudents.length > 0 ? (
          <Grid container alignItems="stretch">
            {filteredStudents &&
              filteredStudents.map((student, index) => (
                <Grid item xs={12} key={index}>
                  <Card
                    className="no-shadow"
                    sx={{
                      background: "#f7e4d1",
                      marginTop: "5px",
                    }}
                  >
                    <Box
                      sx={{
                        padding: "15px",
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 1,
                        gridTemplateRows: "auto",
                        gridTemplateAreas: `"header header header header"
                          "main main . sidebar"
                          "footer footer footer footer"`,
                      }}
                    >
                      <Box
                        sx={{
                          gridArea: "header",
                          display: "flex",
                        }}
                      >
                        <img
                          style={{
                            padding: "5px 5px",
                          }}
                          src={student.student_img}
                          width={30}
                          height={30}
                          onError={handleImageError}
                        />
                        <Typography
                          className="text-primary"
                          sx={{
                            fontSize: 14,
                            fontWeight: 400,
                            marginLeft: "15px",
                          }}
                          title={student.name}
                        >
                          {student.name}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          gridArea: "main",
                          width: "150px",
                        }}
                      >
                        {" "}
                        <FormGroup>
                          <TextField
                            id={student._id}
                            label="Enter Mark"
                            size="small"
                            focused={ids.includes(student._id) ? true : false}
                            value={student.marks || ""}
                            disabled={ids.includes(student._id) ? true : false}
                            onChange={(e) => handleMarkChange(student, e)}
                            helperText={
                              errors.some((item) => student.marks === item)
                                ? "Mark should be less than or equal to max mark."
                                : ""
                            }
                            error={
                              errors.some((item) => student.marks === item)
                                ? true
                                : false
                            }
                          />
                        </FormGroup>
                      </Box>
                      <Box
                        sx={{
                          gridArea: "sidebar",
                        }}
                      >
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                id={student._id}
                                value={student.marks}
                                name={student._id}
                                defaultChecked
                                onChange={(e) =>
                                  handleCheckboxChange(
                                    student,
                                    e.target.checked
                                  )
                                }
                              />
                            }
                            label="Present"
                          />
                        </FormGroup>
                      </Box>
                    </Box>
                  </Card>
                  <Divider />
                </Grid>
              ))}
          </Grid>
        ) : (
          ""
        )}
        <br />
      </Box>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="xl"
      >
        <DialogTitle sx={{ m: 0, p: 4 }} id="customized-dialog-title">
          Preview Marks
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box>
            <Typography
              className="text-primary"
              sx={{
                fontSize: 14,
                fontWeight: 400,
                marginLeft: "15px",
              }}
            >
              {" "}
              Exam :{inputName}
            </Typography>
            <Typography
              className="text-primary"
              sx={{
                fontSize: 14,
                fontWeight: 400,
                marginLeft: "15px",
              }}
            >
              {" "}
              Maximum Mark : {maxMark}
            </Typography>
            <br />
          </Box>
          <PreviewMarks />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{
              background: "#F7993B",
              color: "white",
              minWidth: "37px",
            }}
            autoFocus
            onClick={handleClose}
          >
            Edit <EditIcon fontSize="small" />
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
};

export default MobileAddMark;
