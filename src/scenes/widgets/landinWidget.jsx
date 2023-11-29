// import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import { useSelector } from "react-redux";
import { Box, useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";
import FlexBetween from "components/FlexBetween";
import AutocompleteSearch from "components/SearchStudents";
import SimpleSearch from "components/SimpleSearch";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
function Card(props) {
  const { sx, ...other } = props;
  
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "grey.100",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

Card.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};
const LandingWidget = () => {
  const userData = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  let needed = _takeNeededMenus(userData);
  console.log(needed);
  return (
    // <Container>
      <Box
        width="100%"
        padding="8rem 8%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "25%" : undefined}>
          <div className="">
            <img
              width={300}
              src="/assets/comingsoon.png"
              alt=""
              className="error-basic-img move-animation"
            />
          </div>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "75%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <div className="mt-n4">
            <h1 className="display-1 fw-medium">Stay updated!</h1>
            {/* <h3 className="text-uppercase">Sorry, Page not Found 😭</h3> */}
            <p className="text-muted mb-4">
            Our new dashboard is just around the corner.
            </p>
            {/* <Link to="/reports" className="btn btn-success">
              <i className="mdi mdi-home me-1" />
              Go to Reports
            </Link> */}
          </div>
        </Box>
      </Box>
    // </Container>
    // <div style={{ width: "100%" }} sx={{display: "flex",
    // flexDirection: "row"}}>
    //   <Box
    //     sx={{
    //       display: "flex",
    //       flexDirection: "row",
    //       p: 1,
    //       m: 1,
    //       bgcolor: "background.paper",
    //       borderRadius: 1,
    //     }}
    //   >
    // <div style={{ width: "100%" }}>
    //   <FlexBetween gap="1rem">
    //     {needed.map((item, k) => (
    //       <Card
    //         key={item.module_id + (k + 1) + "-" + item.state}

    //       >
    //         <CardMedia
    //           image="https://elektroautomatik.com/shop/themes/Frontend/Ea2/frontend/_public/src/img/placeholder_image.jpg"
    //           title="green iguana"
    //         />
    //         <CardActions>
    //           <Button size="large">{item.name}</Button>
    //         </CardActions>
    //       </Card>
    //     ))}
    //   </FlexBetween>
    //   </div>
    //   </Box>
    // </div>
    // <FlexBetween >
    //   <Box>
    //     {needed.map((item, k) => (
    // 			<Card
    // 				key={item.module_id + (k + 1) + "-" + item.state}
    // 				sx={{ maxWidth: 345 }}
    // 			>
    // 				<CardMedia
    // 				sx={{ height: 140 }}
    // 				image="https://elektroautomatik.com/shop/themes/Frontend/Ea2/frontend/_public/src/img/placeholder_image.jpg"
    // 				title="green iguana"
    // 				/>
    // 				<CardActions>

    // 				<Button size="large">{item.name}</Button>
    // 				</CardActions>
    // 			</Card>
    //     ))}
    //   </Box>
    // </FlexBetween>
	// <AutocompleteSearch/>
	// <SimpleSearch/>
	// <SimpleSearch/>
	
    // <Box
    //   sx={{
    //     display: "flex",
    //     flexWrap: 'wrap',

    //     p: 1,
    //     m: 1,
    //     bgcolor: "background.paper",
    //     borderRadius: 1,
    //   }}
    // >
    //   {needed.map((item, k) => (
    //     <Card
	// 		width={isNonMobileScreens ? "20%" : "100%"}
	// 		key={item.module_id + (k + 1) + "-" + item.state}
	// 		// sx={{ width: 250 }}
	// 	>
	// 		<CardMedia
	// 		sx={{ height: 140 }}
	// 		image="https://elektroautomatik.com/shop/themes/Frontend/Ea2/frontend/_public/src/img/placeholder_image.jpg"
	// 		title="green iguana"
	// 		/>
	// 		<CardActions>
	// 		<Button size="large">{item.name}</Button>
	// 		</CardActions>
	// 	</Card>
    //   ))}
    // </Box>
  );
};

let whiteLists = [
  "announcements",
  "utilities",
  "userEndorsement",
  "myPlanner",
  "initialSetting",
  "authdashboard",
  "fpiListFeature",
  "schoolDetails",
  "addSubAdmin",
  "privilegeDashboard",
  "reportcard",
  "parentPortalHome",
  "clubPost",
  "cpdSections",
  "setAvailability",
  "publishReports",
  "approveReports",
  "consoleSetting",
  "commonSurveyList",
  "medicalFeatureList",
  "manageReportCards",
  "timetableattendance",
  "myTimetable",
  "reports",
  "calendarTask",
  "viewUserManual",
  "archives",
  "attendancePreview",
  "attendanceReport",
  "attnd-list",
  "archiveResources",
  "classteacherApproval",
  "peopleSearch",
  "attendanceLite",
  "rimsSettings",
  "recieverFeedbackList",
  "myStudentsList",
  "khdaMainModule",
  "messageMainModule",
  "attendanceMarkedController",
  "LibraryBooks",
  "studentsDocumentList",
  "activityApprovalsList",
  "feedueList",
  "eduConnectMeet",
  "qpToOtherSchoolsController",
  "studentEndorsementController",
  "endorsementByHosController",
  "viewActivityAttendeesSheet",
  "CatfourMainController",
  "learning_evaluation",
  "policyManagement",
  "BenchmarkUtilitiesMain",
  "leaveManagement",
  "examCalendarMainModule",
  "documentController",
  "khdaAttendanceController",
  "examReminder",
  "khdaReportController",
  "houses",
  "lessonPlan",
  "syllabus",
  "aflReportListCtrl",
  "sodStudentsReports",
  "arabiclevelreport",
  "learningOutcomeTracker",
  "prevReportEditCtrl",
  "activityExportCtrl",
];
function _takeNeededMenus(userData = []) {
  let array = [];
  let module_privileges = userData.module_privileges;
  for (let index = 0; index < module_privileges.length; index++) {
    let element = module_privileges[index];
    if (whiteLists.indexOf(element.state) !== -1) {
      array.push(element);
    }
  }
  return array;
}
export default LandingWidget;
