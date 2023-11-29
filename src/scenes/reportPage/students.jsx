import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Container,
  Grid,
  ListItem,
  FormControl,
  IconButton,
  Button,
  Select,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import CustomSeparator from "components/Breadcrumb";
import IconLogo from "components/IconLogo";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CardHeader from "@mui/material/CardHeader";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ApiService from "services/apiService";
import APPCONSTANTS from "configs/constants";
import CommonService from "services/commonService";
import StudentsMobileView from "./StudentsMobileView";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "underscore";
import NumbersIcon from "@mui/icons-material/Numbers";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const Students = () => {
  const isMobileScreens = useMediaQuery("(max-width: 1000px)");
  const isNonMobileScreens = useMediaQuery("(min-width: 1300px)");
  const [studentListResponse, setStudentListResponse] = useState({});
  const [studentList, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const dispatch = useDispatch();
  CommonService.loaderOFF(dispatch);
  const userData = useSelector((state) => state.user);
  let url_params = useParams();
  const navigate = useNavigate();
  function CharacterLimitPipe({ text, limit }) {
    // Truncate the text if it exceeds the character limit
    let truncatedText =
      text.length > limit ? text.slice(0, limit) + "..." : text;

    return <span>{truncatedText}</span>;
  }
  const _list = async () => {
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
      setStudents(ret_val.students);
      console.log(ret_val.students);
      setFilteredStudents(ret_val.students);
      CommonService.loaderOFF(dispatch);
      // return ret_val
    } catch (error) {
      console.log(error);
      CommonService.loaderOFF(dispatch);
      // return ret_val
    }
  };
  const handleImageError = (event) => {
    event.target.src = "/assets/dummy-image.jpg"; // Replace with the path to your fallback image
  };
  useEffect(() => {
    const user = localStorage.getItem("authUser");
    if (user) {
      _list(url_params, userData, dispatch);
    } else {
      toast.error("Your not logged in.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, []);
  const [sort, setSort] = useState("");
  const sbsgmt = "Student Progression Reports";

  const handleSortChange = (e) => {
    setSort(e.target.value);
    if (e.target.value == "asc") {
      const strAscending = [...filteredStudents].sort((a, b) =>
        a.name > b.name ? 1 : -1
      );
      setFilteredStudents(strAscending);
    } else {
      const strDescending = [...filteredStudents].sort((a, b) =>
        a.name > b.name ? -1 : 1
      );
      setFilteredStudents(strDescending);
    }
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = studentList.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.admission_number.includes(searchTerm)
      );
    });

    setFilteredStudents(filteredItems);
    if (searchTerm == "") {
      setFilteredStudents(studentList);
    }
  };;

  const handleMarkList = () => {
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
  

  const handleViewReport = (student = {}) => {
    toast.success("Selected " + student.name);
    navigate("/student/report/" + student._id);
  };
  const handleGoBack = () => {
    navigate("/reports");
  };
  return (
    <>
      {isMobileScreens ? (
        <StudentsMobileView />
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
                  title: "Reports",
                  icon: <ArticleIcon sx={{ marginBottom: "-5px" }} />,
                  link: true,
                  path: "/reports",
                },
                {
                  title: "Student Progression Reports",
                  icon: <PictureAsPdfIcon sx={{ marginBottom: "-5px" }} />,
                  link: false,
                },
              ]}
            />
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="stretch"
            >
              <Grid item xs={12}>
                <Card
                  className="card_class"
                  sx={{ borderRadius: "20px !important" }}
                >
                  <CardContent>
                    <Typography variant="h1" className="text-primary Outfit">
                      {sbsgmt}
                    </Typography>{" "}
                    <br />
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <InputLabel
                          htmlFor="outlined-required"
                          sx={{ color: "black" }}
                        >
                          Search By Name
                        </InputLabel>
                        <TextField
                          sx={{ width: isNonMobileScreens ? "250px" : "100%" }}
                          id="outlined-required"
                          placeholder="Type student name.."
                          onChange={handleInputChange}
                          value={searchItem}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <InputLabel
                          htmlFor="outlined-required"
                          sx={{ color: "black" }}
                        >
                          Sort By Name
                        </InputLabel>
                        <Select
                          id="sort"
                          sx={{
                            width: isNonMobileScreens ? "262px" : "100%",
                            height: "52px",
                            borderRadius: "10px",
                          }}
                          className="primary"
                          value={sort}
                          onChange={handleSortChange}
                        >
                          <MenuItem className="primary" key={1} value="asc">
                            Ascending
                          </MenuItem>
                          <MenuItem className="primary" key={2} value="desc">
                            Descending
                          </MenuItem>
                        </Select>
                      </Grid>
                      {/* <Grid item xs={3}>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            p: 2,
                            m: 1,
                            bgcolor: "background.paper",
                            maxWidth: 300,
                            borderRadius: 1,
                          }}
                        >
                          <IconButton aria-label="filter">
                            <IconLogo
                              image={"/assets/document-filter.png"}
                              size="30"
                            />
                          </IconButton>
                          <IconButton aria-label="menu">
                            <IconLogo image={"/assets/menu.png"} size="30" />
                          </IconButton>
                          <IconButton aria-label="grid">
                            <IconLogo image={"/assets/grid.png"} size="30" />
                          </IconButton>
                        </Box>
                      </Grid> */}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Card sx={{ borderRadius: "20px !important" }}>
                  <CardContent>
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
                        Manage Students{" "}
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
                    <Button
                      variant="contained"
                      sx={{
                        background: "#1E1C59",
                        color: "white",
                      }}
                      onClick={handleMarkList}
                    >
                      Mark List
                    </Button>
                    <br />
                    <Grid container spacing={3}>
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
                                  <span style={{ color: "grey" }}>
                                    Admission Number{" "}
                                  </span>
                                  <br />
                                  <NumbersIcon sx={{ marginBottom: "-4px" }} />
                                  <span
                                    style={{ color: "#f7993b", fontSize: 15 }}
                                  >
                                    {student.admission_number}
                                  </span>
                                </Box>
                                <Box
                                  sx={{
                                    gridArea: "sidebar",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      gap: "0rem",
                                      borderRadius: "9px",
                                      background: "#fcecdc",
                                      width: "110px",
                                    }}
                                    onClick={() => handleViewReport(student)}
                                  >
                                    {/* <IconButton
                                      sx={{ background: "#FDBE7926" }}
                                    >
                                      <IconLogo
                                        //image={"/assets/user.png"}
                                        image={student.student_img}
                                        onE
                                        size="25"
                                      />
                                    </IconButton> */}
                                    {/* <IconButton
                                      onClick={() => handleViewReport(student)}
                                      sx={{ background: "#77C4FD26" }}
                                    >
                                      <IconLogo
                                        title="Click here to view Reports"
                                        image={"/assets/clipboard-text.png"}
                                        size="25"
                                      /> */}
                                    <IconButton
                                      sx={{ background: "#77C4FD26" }}
                                    >
                                      <IconLogo
                                        image={"/assets/clipboard-text.png"}
                                        size="25"
                                      />
                                    </IconButton>
                                    <span
                                      style={{
                                        marginTop: "14px",
                                        fontSize: " 11px",
                                        cursor: "pointer",
                                      }}
                                    >
                                      Reports
                                    </span>
                                    {/* </IconButton> */}
                                  </Box>
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
        </Box>
      )}
    </>
  );
};

export default Students;
