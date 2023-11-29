import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Container,
  Grid,
  IconButton,
  Button,
  useMediaQuery,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CustomSeparator from "components/Breadcrumb";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ApiService from "services/apiService";
import APPCONSTANTS from "configs/constants";
import CommonService from "services/commonService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "underscore";
import SaveIcon from "@mui/icons-material/Save";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import PreviewIcon from "@mui/icons-material/Preview";
import PreviewMarks from "./PreviewMarks";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import MobileAddMark from "./MobileAddMark";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const AddMark = () => {
  const isMobileScreens = useMediaQuery("(max-width: 1000px)");
  const isNonMobileScreens = useMediaQuery("(min-width: 1300px)");
  const [studentListResponse, setStudentListResponse] = useState({});
  const [studentList, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [inputName, setName] = useState("");
  const [maxMark, setMaxMark] = useState("");
  const [singleMark, setSingleMark] = useState([]);
  const [ids, setChecked] = useState([]);
  const [eachMark, setEachMark] = useState([]);
  const dispatch = useDispatch();
  CommonService.loaderOFF(dispatch);
  const userData = useSelector((state) => state.user);
  let url_params = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState([]);
  const [inputerrors, setInputErrors] = useState([]);

  const _list = async () => {
    let ret_val = {};
    try {
      const marks = JSON.parse(
        sessionStorage.getItem(url_params.class + "_" + url_params.batch)
      );
      let item = [];
      if (marks && marks[url_params.key]) {
        item = marks[url_params.key];
        setName(item.ExamName);
        setMaxMark(item.max_mark);
      }

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
        if (item && item.marks) {
          one.marks = getValueByKey(item.marks, one._id) ?? "";
        }

        // const val = item.marks
        //   .map((obj) => Object.values(obj)[0])
        //   .filter((value) => value !== "");
        // console.log(val);
      });
      setStudents(ret_val.students);
      setFilteredStudents(ret_val.students);
      CommonService.loaderOFF(dispatch);
      // return ret_val
    } catch (error) {
      console.log(error);
      CommonService.loaderOFF(dispatch);
      // return ret_val
    }
  };

  const getValueByKey = (data, key) => {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const itemKey = Object.keys(item)[0]; // Assuming each object has only one key
      if (itemKey === key) {
        return item[itemKey];
      }
    }
    return null; // If the key is not found
  };

  const handleImageError = (event) => {
    event.target.src = "/assets/dummy-image.jpg"; // Replace with the path to your fallback image
  };
  useEffect(() => {
    const user = localStorage.getItem("authUser");
    if (user) {
      _list(url_params, userData, dispatch);
      setInputErrors([]);
      setErrors([]);
    } else {
      toast.error("Your not logged in.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, []);

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
    // console.log(student, e);
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
    setInputErrors([]);
    if (inputName == "" && maxMark == "") {
      setInputErrors((oldArray) => [...oldArray, "exam"]);
      setInputErrors((oldArray) => [...oldArray, "mark"]);
      return toast.error(
        "Name should not be empty and Max mark should not be empty or should be in a range of 3 digit number"
      );
    }
    if (inputName == "") {
      setInputErrors((oldArray) => [...oldArray, "exam"]);
      return toast.error("Enter exam name");
    }
    if (maxMark == "" || maxMark.length > 3) {
      setInputErrors((oldArray) => [...oldArray, "mark"]);
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

    if (url_params.key) {
      let storedval = JSON.parse(
        sessionStorage.getItem(url_params.class + "_" + url_params.batch)
      );
      storedval[url_params.key].ExamName = inputName;
      storedval[url_params.key].max_mark = maxMark;
      storedval[url_params.key].marks = students;

      sessionStorage.setItem(
        url_params.class + "_" + url_params.batch,
        JSON.stringify(storedval)
      );
      toast.success("Marks Updated.");
    } else {
      let storedval =
        JSON.parse(
          sessionStorage.getItem(url_params.class + "_" + url_params.batch)
        ) || [];
      let obj = [
        ...storedval,
        {
          ExamName: inputName,
          max_mark: maxMark,
          marks: students,
          class_id: studentListResponse.header.xclass,
          batch_id: studentListResponse.header.batch,
        },
      ];

      sessionStorage.setItem(
        url_params.class + "_" + url_params.batch,
        JSON.stringify(obj)
      );

      toast.success("Marks created.");
    }
    navigate(
      "/marks/" +
        url_params.session +
        "/" +
        url_params.curriculum +
        "/" +
        url_params.class +
        "/" +
        url_params.batch
    );
  };

  const handleGoBack = () => {
    navigate(
      "/marks/" +
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
    const students = filteredStudents.map((item, index) => {
      const newVal = { [item._id]: document.getElementById(item._id).value };
      return newVal;
    });
    setEachMark(students);

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
    setInputErrors([]);
    setErrors([]);
  };
  console.log(inputerrors);
  return (
    <>
      {isMobileScreens ? (
        <MobileAddMark />
      ) : (
        <Box padding="2rem 6%" sx={{ gap: 1 }}>
          <Container>
            <CustomSeparator
              titles={[
                {
                  title: "Home",
                  icon: <HomeIcon sx={{ marginBottom: "-5px" }} />,
                  link: true,
                  path: "/",
                },
                {
                  title: "Add Marks",
                  icon: <ArticleIcon sx={{ marginBottom: "-5px" }} />,
                  link: false,
                  path: "/reports",
                },
              ]}
            />
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="stretch"
            >
              <Grid item xs={12} sm={12}>
                <Card sx={{ borderRadius: "20px !important" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", gap: "1rem" }} spacing={3}>
                      <ArrowBackIcon
                        title="Go Back"
                        onClick={() => handleGoBack()}
                        fontSize="large"
                        sx={{ "&:hover": { border: "2px solid orange" } }}
                      />
                      <Box sx={{ display: "flex", gap: "1rem" }} spacing={3}>
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
                          {studentListResponse.header
                            ? studentListResponse.header.batch
                            : ""}
                        </Button>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "1rem",
                          marginLeft: isNonMobileScreens ? "395px" : "",
                        }}
                        spacing={3}
                      >
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
                    </Box>
                    <br />
                    <Grid container spacing={3}>
                      <Grid item xs={5}>
                        <FormGroup>
                          <TextField
                            value={inputName}
                            label="Name"
                            required
                            error={
                              inputerrors.indexOf("exam") !== -1 ||
                              inputName.length > 100
                                ? true
                                : false
                            }
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
                            helperText={
                              inputerrors.indexOf("exam") !== -1
                                ? "Exam name should not be empty"
                                : ""
                            }
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={5}>
                        <FormGroup sx={{ float: "right" }}>
                          <TextField
                            id="outlined-size-small"
                            value={maxMark}
                            label="Max Mark"
                            size="small"
                            name="max-mark"
                            onChange={handleMaxChange}
                            error={
                              inputerrors.indexOf("mark") !== -1 ? true : false
                            }
                            helperText={
                              inputerrors.indexOf("mark") !== -1
                                ? "Max mark should not be empty or should be in a range of 3 digit number"
                                : ""
                            }
                          />
                        </FormGroup>
                      </Grid>

                      {filteredStudents && filteredStudents.length ? (
                        filteredStudents.map((student, index) => (
                          <Grid
                            item
                            xs={isNonMobileScreens ? 4 : 6}
                            key={index}
                          >
                            <Card
                              sx={{
                                background: "#f7e4d1",
                              }}
                              className="no-shadow"
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
                                    {student.name.length > 15
                                      ? `${student.name.substring(0, 15)}...`
                                      : student.name}
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
                                      focused={
                                        ids.includes(student._id) ? true : false
                                      }
                                      value={student.marks || ""}
                                      disabled={
                                        student.marks == "Absent" ? true : false
                                      }
                                      onChange={(e) =>
                                        handleMarkChange(student, e)
                                      }
                                      helperText={
                                        errors.some(
                                          (item) => student.marks === item
                                        )
                                          ? "Mark should be less than or equal to max mark."
                                          : ""
                                      }
                                      error={
                                        errors.some(
                                          (item) => student.marks === item
                                        )
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
                                          checked={
                                            student.marks == "Absent"
                                              ? false
                                              : true
                                          }
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
                          </Grid>
                        ))
                      ) : (
                        <Grid item xs={4} key={1}>
                          <p>No Results Found</p>
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>

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
                  Exam : {inputName}
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
              <PreviewMarks students={eachMark} />
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
      )}
    </>
  );
};

export default AddMark;
