import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Container,
  Grid,
  IconButton,
  Button,
  CardHeader,
  useMediaQuery,
  Stack,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import IconLogo from "components/IconLogo";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomSeparator from "components/Breadcrumb";
import TermMobileView from "./TermMobileView";
import { useDispatch, useSelector } from "react-redux";
import CommonService from "services/commonService";
import ApiService from "services/apiService";
import ApiServiceTwo from "services/apiService2";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import _ from "underscore";
import { toast } from "react-toastify";
import APPCONSTANTS from "configs/constants";
// import ExamplePDFViewer from "pdfViewer";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core";
import PdfViewer from "scenes/pdfs/PdfViewer";
// Import the styles
// import "@react-pdf-viewer/core/lib/styles/index.css";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ExtraInfo from "./ExtraInfo";

const TermList = () => {
  const [selectedYear, setselectedYear] = useState("NIL");
  const navigate = useNavigate();
  const isMobileScreens = useMediaQuery("(max-width: 1000px)");
  const isNonMobileScreens = useMediaQuery("(min-width: 1300px)");
  const [isLoading, setLoader] = useState(false);
  const [results, setResults] = useState([]);
  const [curriculum, setCurriculum] = useState("");
  const [classId, setClass] = useState("");
  const [batch, setBatch] = useState("");
  const [allCurriculums, getAllCurriculums] = useState([]);
  const userData = useSelector((state) => state.user);
  const back_drop = useSelector((state) => state.back_drop);
  const [open, setOpen] = useState(false);
  const [arrayToClient, setarrayToClient] = useState([]);
  const [studentReportData, setStudentReportData] = useState({});
  const dispatch = useDispatch();
  let url_params = useParams();
  const [sss, setus] = useState("");
  const [base64Pdf, setbase64Pdf] = useState(null);
  const [apiRes, setApiRes] = useState(null);
  const [dataFromChild, setDataFromChild] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  let calledApi = false;
  function CharacterLimitPipe({ text, limit }) {
    // Truncate the text if it exceeds the character limit
    let truncatedText =
      text.length > limit ? text.slice(0, limit) + "..." : text;

    return <span>{truncatedText}</span>;
  }
  const getOneItem = (array = [], key = "", val = "", isSingle = false) => {
    let ex = null;
    if (array.length) {
      if (!isSingle) {
        ex = _.find(array, function (one) {
          return one[key] == val;
        });
      }
    }
    return ex;
  };
  const callReportList = async (year) => {
    setbase64Pdf(null);
    setApiRes(null);
    setselectedYear(year);
    let requestBody = {
      args: {
        schoolId: userData.school_id,
        user_id: url_params.student_id,
        passedSelectedYear: year,
        forCt: true,
        is_web: true,
        parent_status: false,
        student_status: false,
      },
    };
    console.log(requestBody);
    // return
    CommonService.loaderON(dispatch);
    let report_data = await ApiServiceTwo.post(
      "/reportcards/published/list",
      requestBody
    );
    console.log(report_data);
    setarrayToClient(report_data.details.arrayToClient);
    CommonService.loaderOFF(dispatch);
  };
  const handleChange = (event) => {
    console.log(event.target.value);
    // setselectedYear(event.target.value);
    toast.success("Selected " + event.target.value);
    callReportList(event.target.value);
  };
  const sbsgmt = "Student Progression Reports";
  const firstCall = async () => {
    let req = {
      school_id: userData.school_id,
      user_id: url_params.student_id,
      LIVEFS: APPCONSTANTS.LIVEFS,
    };
    CommonService.loaderON(dispatch);
    let initData = await ApiService.post(
      "/bmr/getSchoolDetailsAndStudent",
      req
    );
    console.log(initData);
    let obj = initData.details;
    setStudentReportData(obj);
    let latest_year_pos = obj.schoolDet.academic_year.length - 1;
    // getOneItem(obj.schoolDet.academic_year)
    // setselectedYear(obj.schoolDet.academic_year[latest_year_pos].year)

    CommonService.loaderOFF(dispatch);
    callReportList(obj.schoolDet.academic_year[latest_year_pos].year);
  };
  const download = async (report) => {
    setbase64Pdf(null);
    setApiRes(null);
    if (calledApi) {
      toast.warning("Please wait.");
      return;
    }
    console.log(report);
    calledApi = true;
    toast.info("Selected " + report.name);
    setSelectedItem(report);
    let obj = {
      args: {
        studentId: url_params.student_id,
        rc_id: report.report_console_id,
        is_consolidated: report.type ? report.type : false,
        pdfFalg: false,
        school_id: userData.school_id,
        template_view: "cbse",
        asset_format: report.asset_format ? report.asset_format : false,
        yearFromClient: selectedYear,
        kb_consolidatedFlag: report.kg_consolidated ? true : false,
        forCT: true,
        FILE_UPLOAD_URL: APPCONSTANTS.FILE_SERVER_URL,
        SITE_URL: APPCONSTANTS.SITE_URL,
        clientFileServer: APPCONSTANTS.FILE_SERVER_URL,
        kg_consolidated: false,
        montessori_consolidated: report.montessori_consolidated ? true : false,
        is_web: true,
        parent_status: false,
        student_status: false,
      },
    };
    CommonService.loaderON(dispatch);
    console.log(userData, back_drop);
    let data = await ApiServiceTwo.post(
      "reportcards/published/getReportCardPublished",
      obj
    );
    CommonService.loaderOFF(dispatch);
    if (data && data.details && data.details.response) {
      console.log(data.details.response.pdf_data);
      setbase64Pdf(data.details.response.pdf_data);
      setApiRes(data.details.response);
      // CommonService.downloadPdf(data.details.response.pdf_data, report.name);
      // toast.success("Downloaded Report Successfully.");
    }
    calledApi = false;
    console.log(data);
  };
  const handleImageError = (event) => {
    event.target.src = "/assets/dummy-image.jpg"; // Replace with the path to your fallback image
  };
  useEffect(() => {
    const user = localStorage.getItem("authUser");
    if (user) {
      firstCall();
    } else {
      toast.error("Your not logged in.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    console.log(selectedYear, "selectedYearselectedYear");
  }, [url_params.student_id]);

  const handlePdf = () => {
    setus("use");
  };
  const handleGoBack = () => {
    window.history.back();
  };
  const handleDataFromChild = (data) => {
    setDataFromChild(data);
    let report = selectedItem;
    let obj = {
      args: {
        studentId: url_params.student_id,
        rc_id: report.report_console_id,
        is_consolidated: report.type ? report.type : false,
        pdfFalg: false,
        school_id: userData.school_id,
        template_view: "cbse",
        asset_format: report.asset_format ? report.asset_format : false,
        yearFromClient: selectedYear,
        kb_consolidatedFlag: report.kg_consolidated ? true : false,
        forCT: true,
        FILE_UPLOAD_URL: APPCONSTANTS.FILE_SERVER_URL,
        SITE_URL: APPCONSTANTS.SITE_URL,
        clientFileServer: APPCONSTANTS.FILE_SERVER_URL,
        kg_consolidated: false,
        montessori_consolidated: report.montessori_consolidated ? true : false,
        is_web: true,
        parent_status: false,
        student_status: false,
      },
    };
    if (data) {
      let keys = Object.keys(data);
      if (keys && keys.length) {
        for (let index = 0; index < keys.length; index++) {
          let element = keys[index];
         // if (data[element]) {
            obj.args[element] = data[element];
         // }
        }
      }
    }

    console.log(obj, "dd");
     updateReport(obj);
  };
  const updateReport = async (obj) => {
    let report = selectedItem;
    setbase64Pdf(null);
    setApiRes(null);
    if (calledApi) {
      toast.warning("Please wait.");
      return;
    }
    console.log(report);
    calledApi = true;
    toast.info("Report Updated.");
    setSelectedItem(report);
    CommonService.loaderON(dispatch);
    console.log(userData, back_drop);
    let data = await ApiServiceTwo.post(
      "reportcards/published/getReportCardPublished",
      obj
    );
    CommonService.loaderOFF(dispatch);
    if (data && data.details && data.details.response) {
      console.log(data.details.response.pdf_data);
      setbase64Pdf(data.details.response.pdf_data);
      setApiRes(data.details.response);
      // CommonService.downloadPdf(data.details.response.pdf_data, report.name);
      // toast.success("Downloaded Report Successfully.");
    }
    calledApi = false;
    console.log(data);
  };
  return (
    <>
      {isMobileScreens ? (
        <TermMobileView />
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
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={4} lg={8}>
                        <Stack spacing={1} flex="1 1 0">
                          <Box
                            sx={{ display: "flex", gap: "1rem" }}
                            spacing={3}
                          >
                            <ArrowBackIcon
                              onClick={() => handleGoBack()}
                              fontSize="large"
                              sx={{ "&:hover": { border: "2px solid orange" } }}
                            />
                            {/* <Typography
                              className="text-primary subHead"
                              variant="h3"
                              sx={{ marginLeft: "30px" }}
                              noWrap
                            >
                              Manage Students{"  "}
                            </Typography> */}
                            <Typography
                              className="text-primary subHead"
                              variant="h3"
                              sx={{ marginLeft: "30px", fontSize: "16px" }}
                              noWrap
                            >
                              {studentReportData && studentReportData.user_doc
                                ? studentReportData.user_doc.name
                                : "NIL"}
                              {"  "}
                            </Typography>
                            <Button
                              variant="contained"
                              sx={{
                                background: "#1E1C59",
                                color: "white",
                                minWidth: "37px",
                              }}
                            >
                              {studentReportData && studentReportData.user_doc
                                ? studentReportData.user_doc.xclass
                                : "NIL"}
                            </Button>
                            <Button
                              variant="contained"
                              sx={{
                                background: "#F7993B",
                                color: "white",
                                minWidth: "37px",
                              }}
                            >
                              {studentReportData && studentReportData.user_doc
                                ? studentReportData.user_doc.xbatch
                                : "NIL"}
                            </Button>
                          </Box>{" "}
                          <Box sx={{ marginLeft: "21px !important" }}>
                            <InputLabel
                              htmlFor="outlined-required"
                              sx={{ color: "black" }}
                            >
                              Select year
                            </InputLabel>
                            <Select
                              sx={{
                                width: "262px",
                                height: "52px",
                                borderRadius: "10px",
                              }}
                              id="student-select"
                              value={selectedYear}
                              onChange={handleChange}
                            >
                              {studentReportData &&
                              studentReportData.schoolDet &&
                              studentReportData.schoolDet.academic_year &&
                              studentReportData.schoolDet.academic_year
                                .length ? (
                                studentReportData.schoolDet.academic_year.map(
                                  (year, yIndex) => (
                                    <MenuItem key={yIndex} value={year.year}>
                                      {year.year}
                                    </MenuItem>
                                  )
                                )
                              ) : (
                                <MenuItem value="NIL">NIL</MenuItem>
                              )}
                            </Select>
                          </Box>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={4} lg={4}>
                        <Box sx={{ display: "flex" }}>
                          <Box>
                            <Typography variant="h6">Basic Details </Typography>
                            <span>
                              Admn No :{" "}
                              {studentReportData && studentReportData.user_doc
                                ? studentReportData.user_doc.admission_number
                                : " NIL"}
                            </span>
                            <br />
                            <span>
                              BOB :{" "}
                              {studentReportData && studentReportData.user_doc
                                ? studentReportData.user_doc.birth_date
                                : " NIL"}
                            </span>
                            <br />
                            <span>
                              Blood Group :{" "}
                              {studentReportData && studentReportData.user_doc
                                ? studentReportData.user_doc.blood_group
                                : " NIL"}
                            </span>
                            <br />
                            <span>
                              Phone :{" "}
                              {studentReportData && studentReportData.user_doc
                                ? studentReportData.user_doc.phone
                                : " NIL"}
                            </span>
                          </Box>{" "}
                          &nbsp;&nbsp;
                          <img
                            // src="/assets/dummy-image.jpg"
                            src={
                              studentReportData &&
                              studentReportData.user_doc &&
                              studentReportData.user_doc.image
                                ? APPCONSTANTS.LIVEFS +
                                  studentReportData.user_doc.image.original
                                : "/assets/dummy-image.jpg"
                            }
                            onError={handleImageError}
                            width={150}
                            height={120}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                    <Card
                      sx={{
                        borderRadius: "20px !important",
                        padding: "10px",
                        margin: "15px",
                      }}
                    >
                      <CardContent>
                        <Grid container spacing={3}>
                          {arrayToClient && arrayToClient.length ? (
                            arrayToClient.map((report, index) => (
                              <Grid
                                item
                                xs={isNonMobileScreens ? 4 : 6}
                                key={index}
                              >
                                <Card
                                  sx={{ background: "#f7e4d1" }}
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
                                        src="/assets/clipboard-text-primary.png"
                                        width={40}
                                        height={40}
                                        style={{
                                          background: "white",
                                          padding: "5px 5px",
                                        }}
                                      />
                                      <Typography
                                        className="text-primary"
                                        sx={{
                                          fontSize: 14,
                                          fontWeight: 500,
                                          marginLeft: "15px",
                                        }}
                                      >
                                        {report.name}
                                      </Typography>
                                    </Box>
                                    <Box
                                      sx={{
                                        gridArea: "main",
                                        width: "150px",
                                      }}
                                    >
                                      <span style={{ color: "grey" }}>
                                        Published Date
                                      </span>
                                      <br />
                                      <CalendarMonthIcon
                                        sx={{ marginBottom: "-4px" }}
                                      />
                                      <span style={{ color: "#f7993b" }}>
                                        {new Date(report.last_updated)
                                          .toISOString()
                                          .substring(0, 10)}
                                      </span>
                                    </Box>
                                    <Box
                                      sx={{
                                        gridArea: "sidebar",
                                      }}
                                    >
                                      <Box
                                        onClick={() => download(report)}
                                        sx={{
                                          display: "flex",
                                          gap: "0rem",
                                          borderRadius: "9px",
                                          background: "#fcecdc",
                                          width: "110px",
                                        }}
                                      >
                                        <IconButton
                                          sx={{ background: "#77C4FD26" }}
                                        >
                                          <IconLogo
                                            image={"/assets/file-pdf.png"}
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
                                          View Report
                                        </span>
                                      </Box>
                                    </Box>
                                  </Box>
                                </Card>
                              </Grid>
                            ))
                          ) : (
                            <Grid item xs={4} key={1000}>
                              <p>No Results Found</p>
                            </Grid>
                          )}
                        </Grid>
                      </CardContent>
                    </Card>
                  </CardContent>
                  {base64Pdf && base64Pdf != null ? (
                    <div>
                      <div id="pdf_box">
                        <PdfViewer base64={base64Pdf}></PdfViewer>
                      </div>
                      <div>
                        <ExtraInfo
                          sendDataToParent={handleDataFromChild}
                          apiRes={apiRes}
                        ></ExtraInfo>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </>
  );
};

export default TermList;
