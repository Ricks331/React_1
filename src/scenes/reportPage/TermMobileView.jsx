import {
  Box,
  Typography,
  Grid,
  Select,
  MenuItem,
  Divider,
  IconButton,
  Card,
  Button,
  CardHeader,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import IconLogo from "components/IconLogo";
import React, { useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommonService from "services/commonService";
import { useParams } from "react-router";
import ApiService from "services/apiService";
import APPCONSTANTS from "configs/constants";
import ApiServiceTwo from "services/apiService2";
import _ from "underscore";
import { toast } from "react-toastify";
import PdfViewer from "scenes/pdfs/PdfViewer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const TermMobileView = (props) => {
  const userData = useSelector((state) => state.user);
  let url_params = useParams();
  const dispatch = useDispatch();
  const [arrayToClient, setarrayToClient] = useState([]);
  const [studentReportData, setStudentReportData] = useState({});
  const [selectedYear, setselectedYear] = useState("NIL");
  let calledApi = false;
  const back_drop = useSelector((state) => state.back_drop);
  const [base64Pdf, setbase64Pdf] = useState(null);
  function CharacterLimitPipe({ text, limit }) {
    // Truncate the text if it exceeds the character limit
    let truncatedText =
      text.length > limit ? text.slice(0, limit) + "..." : text;

    return <span>{truncatedText}</span>;
  }
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
  }, [url_params.student_id]);

  const getList = async () => {
    let req = {
      school_id: userData.school_id,
      user_id: url_params.student_id,
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

  const callReportList = async (year) => {
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

  const download = async (report) => {
    if (calledApi) {
      toast.warning("Please wait.");
      return;
    }
    calledApi = true;
    toast.info("Selected " + report.name);
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
      // CommonService.downloadPdf(data.details.response.pdf_data, report.name);
      // toast.success("Downloaded Report Successfully.");
    }
    calledApi = false;
  };

  return (
    <Box>
      <Box padding="2rem 6%" sx={{ gap: 1 }}>
        <Typography variant="h1" className="text-primary Outfit">
          Student Progression Reports
        </Typography>
        <br />
        <Divider>
          Selected Year{" "}
          <Select
            id="year"
            sx={{
              width: "165px",
              height: "32px",
              borderRadius: "10px",
            }}
            className="primary"
            value={selectedYear}
            onChange={handleChange}
          >
            {studentReportData &&
            studentReportData.schoolDet &&
            studentReportData.schoolDet.academic_year &&
            studentReportData.schoolDet.academic_year.length ? (
              studentReportData.schoolDet.academic_year.map((year, yIndex) => (
                <MenuItem value={year.year} key={yIndex}>
                  {year.year}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="NIL">NIL</MenuItem>
            )}
          </Select>
          {/* <IconButton aria-label="filter">
            <IconLogo image={"/assets/document-filter.png"} size="30" />
          </IconButton> */}
        </Divider>
        <Typography
          className="text-primary subHead"
          variant="h6"
          sx={{ textAlign: "center" }}
        >
          {studentReportData && studentReportData.user_doc
            ? studentReportData &&
              studentReportData.user_doc &&
              studentReportData.user_doc.name.length > 18
              ? `${studentReportData.user_doc.name.substring(0, 18)}...`
              : studentReportData.user_doc.name
            : "NIL"}
          {"  "}
        </Typography>
        <br />
        <Grid container alignItems="stretch">
          {arrayToClient && arrayToClient.length ? (
            arrayToClient.map((report, index) => (
              <Grid item xs={12} key={index}>
                <Card
                  className="no-shadow"
                  sx={{ background: "#f7e4d1", marginTop: "3px" }}
                >
                  <Box
                    sx={{
                      padding: "15px",
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gridTemplateRows: "auto",
                      gridTemplateAreas: `"header header header header"
        "main main . sidebar"`,
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
                      <span style={{ color: "grey" }}>Published Date</span>
                      <br />
                      <CalendarMonthIcon sx={{ marginBottom: "-4px" }} />
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
                        <IconButton sx={{ background: "#77C4FD26" }}>
                          <IconLogo image={"/assets/file-pdf.png"} size="25" />
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
                <Divider />
              </Grid>
            ))
          ) : (
            <Grid item xs={4} key={1000}>
              <p>No Results Found</p>
            </Grid>
          )}
        </Grid>
        <br />
        <br />
        {base64Pdf && base64Pdf != null ? (
          <div id="pdf_box">
            <PdfViewer base64={base64Pdf}></PdfViewer>
          </div>
        ) : (
          ""
        )}
        {/* <Grid justifyContent="center" alignItems="stretch" textAlign="center">
          <Button
            variant="contained"
            sx={{
              background: "#7c7df0",
              color: "white",
              textTransform: "capitalize",
              borderRadius: "20px",
            }}
          >
            <IconLogo image={"/assets/export.png"} size="20" /> Export All
            Reports
          </Button>
        </Grid> */}
      </Box>
    </Box>
  );
};

export default TermMobileView;
