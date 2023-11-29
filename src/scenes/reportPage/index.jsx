import {
  Box,
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Container,
  Grid,
  ListItem,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useMediaQuery,
} from "@mui/material";
import CustomSeparator from "components/Breadcrumb";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import SearchIcon from "@mui/icons-material/Search";
import PlayArrowTwoToneIcon from "@mui/icons-material/PlayArrowTwoTone";
import IconLogo from "components/IconLogo";
import React, { useState, useEffect } from "react";
import ApiService from "services/apiService";
import APPCONSTANTS from "configs/constants";
import LinearProgress from "@mui/material/LinearProgress";
import MobileView from "./mobileView";
import CommonService from "services/commonService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const ReportPage = () => {
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(max-width: 700px)");
  const [isLoading, setLoader] = useState(false);
  const [results, setResults] = useState([]);
  const [curriculum, setCurriculum] = useState("");
  const [classId, setClass] = useState("");
  const [batch, setBatch] = useState("");
  const [allCurriculums, getAllCurriculums] = useState([]);
  const userData = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const user = localStorage.getItem("authUser");
    if (user) {
      fetchData();
    } else {
      toast.error("Your not logged in.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, []);

  const fetchData = async () => {
    CommonService.loaderON(dispatch);
    try {
      let req = {
        school_id: userData.school_id,
        academic_year: userData.academic_year,
        initload: true,
        user_id: userData.user_id,
      };
      let apiResult = await ApiService.post("classesByPartitian", req);
      const data = apiResult.details.response;
      getAllCurriculums(apiResult.details.curriculums);
      setCurriculum(apiResult.details.selected_curriculum.curriculum_id);
      CommonService.loaderOFF(dispatch);
      setResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = async (e) => {
    CommonService.loaderON(dispatch);
    setCurriculum(e.target.value);
    try {
      let req = {
        school_id: userData.school_id,
        academic_year: userData.academic_year,
        curriculum: e.target.value,
        user_id: userData.user_id,
      };
      const apiResult = await ApiService.post("classesByPartitian", req);
      const data = apiResult.details.response;
      CommonService.loaderOFF(dispatch);
      setResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClassChange = async (class_id) => {
    setClass(class_id);
  };

  const handleBatch = async (clickedBatch, xclass) => {
    let batchId = clickedBatch.name;
    await setBatch(clickedBatch.name);
    toast.success("You have selected " + xclass.name + " " + clickedBatch.name);
    let req = {
      session_id: clickedBatch.session_id,
      curriculum_id: clickedBatch.curriculum_id,
      batch_id: clickedBatch._id,
      class_id: xclass._id,
      school_id: userData.school_id,
      academic_year: userData.academic_year,
    };
    CommonService.setClassCombo(dispatch, req);
    let url =
      clickedBatch.session_id +
      "/" +
      clickedBatch.curriculum_id +
      "/" +
      xclass._id +
      "/" +
      clickedBatch._id;
    navigate("/student/list/" + url);
    console.log(req);
    // await navigate("/student/list?batch=" + batchId + "&class=" + classId);
  };

  return (
    <>
      {isNonMobileScreens ? (
        <MobileView />
      ) : (
        <Box>
          {isLoading ? (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          ) : (
            ""
          )}
          <Box padding="2rem 6%" sx={{ gap: 1 }}>
            <Container>
              <CustomSeparator titles={[{"title":'Home', "icon":<HomeIcon sx={{ marginBottom: "-5px" }} />,"link":true,"path":"/"},{"title":'Reports', "icon":<ArticleIcon sx={{ marginBottom: "-5px" }} />,"link":false},{"title":'Student Progression Reports', "icon":<PictureAsPdfIcon sx={{ marginBottom: "-5px" }} />,"link":false}]}/>
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
                        Classes And Batches
                      </Typography>{" "}
                      <br />
                      {/* <InputLabel
                        htmlFor="outlined-required"
                        sx={{ color: "black" }}
                      >
                        Advance Search
                      </InputLabel>
                      <TextField
                        sx={{
                          width: isNonMobileScreens ? "100%" : "400px",
                        }}
                        id="outlined-required"
                        placeholder="Search Students, Class, Examinations etc.."
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon className="text-secondary" />
                            </InputAdornment>
                          ),
                        }}
                      /> */}
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card sx={{ borderRadius: "20px !important" }}>
                    <CardContent>
                      <Typography className="text-primary subHead" variant="h3">
                        Select Class
                        <FormControl
                          sx={{
                            float: isNonMobileScreens ? "" : "right",
                            margin: isNonMobileScreens ? "15px" : "",
                          }}
                        >
                          <InputLabel id="curriculum-label">
                            Select Curriculum
                          </InputLabel>
                          <Select
                            labelId="curriculum-label"
                            id="curriculum"
                            sx={{
                              width: "164px",
                              height: "42px",
                              borderRadius: "16px",
                            }}
                            label="Select Curriculum"
                            onChange={handleChange}
                            value={curriculum}
                          >
                            {allCurriculums &&
                              allCurriculums.map((item, index) => (
                                <MenuItem
                                  key={index}
                                  value={item.curriculum_id}
                                >
                                  {item.curriculum}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </Typography>
                      <Grid
                        container
                        spacing={3}
                        alignItems="stretch"
                        sx={{ display: isNonMobileScreens ? "grid" : "flex" }}
                      >
                        {results &&
                          results.map((item, index) => (
                            <Grid
                              item
                              key={index}
                              xs={2.3}
                              sx={{
                                maxWidth: isNonMobileScreens ? "100%" : "25%",
                              }}
                            >
                              <Card>
                                <CardContent className="class_group">
                                  <Typography variant="subtitle2">
                                    {item.section_name}
                                  </Typography>
                                  {item.classes &&
                                    item.classes.map((stdClass, classIndex) => (
                                      <Accordion
                                        key={classIndex}
                                        onChange={() =>
                                          handleClassChange(stdClass._id)
                                        }
                                      >
                                        <AccordionSummary
                                          sx={{ background: "#fff9f3" }}
                                        >
                                          <Typography
                                            className="text-primary"
                                            sx={{
                                              display: "flex",
                                            }}
                                            component="div"
                                            gap="1rem"
                                          >
                                            <IconLogo
                                              image={"../assets/teacher.png"}
                                              size="20"
                                            />{" "}
                                            Class {stdClass.name}
                                          </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails
                                          sx={{
                                            maxHeight: "250px",
                                            overflow: "auto",
                                          }}
                                        >
                                          <Grid
                                            className="cdc"
                                            container
                                            direction="column"
                                          >
                                            {stdClass.batches &&
                                              stdClass.batches.map(
                                                (batch, batchIndex) => (
                                                  <ListItem
                                                    key={batchIndex}
                                                    button
                                                    sx={{
                                                      marginLeft: "-15px",
                                                    }}
                                                    name={batch._id}
                                                    // component="a"
                                                    // href="student/list"
                                                    onClick={() =>
                                                      handleBatch(
                                                        batch,
                                                        stdClass
                                                      )
                                                    }
                                                  >
                                                    <Typography className="text-primary">
                                                      <PlayArrowTwoToneIcon
                                                        sx={{
                                                          marginBottom: "-5px",
                                                        }}
                                                      />{" "}
                                                      Batch {batch.name}
                                                    </Typography>
                                                  </ListItem>
                                                )
                                              )}
                                          </Grid>
                                        </AccordionDetails>
                                      </Accordion>
                                    ))}
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ReportPage;
