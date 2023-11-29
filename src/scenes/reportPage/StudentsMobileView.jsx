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
import GroupIcon from "@mui/icons-material/Group";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommonService from "services/commonService";
import { useParams } from "react-router";
import ApiService from "services/apiService";
import APPCONSTANTS from "configs/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "underscore";
import NumbersIcon from "@mui/icons-material/Numbers";

const StudentsMobileView = (props) => {
  const [sort, setSort] = useState("");
  const userData = useSelector((state) => state.user);
  let url_params = useParams();
  const [allStudents, setStudents] = useState({});
  const [filteredStudents, setFilteredStudents] = useState([]);
  const dispatch = useDispatch();
  CommonService.loaderOFF(dispatch);
  const navigate = useNavigate();

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

  const handleViewReport = (student = {}) => {
    toast.success("Selected " + student.name);
    navigate("/student/report/" + student._id);
  };

  function CharacterLimitPipe({ text, limit }) {
    // Truncate the text if it exceeds the character limit
    let truncatedText =
      text.length > limit ? text.slice(0, limit) + "..." : text;

    return <span>{truncatedText}</span>;
  }
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
  const handleImageError = (event) => {
    event.target.src = "/assets/dummy-image.jpg"; // Replace with the path to your fallback image
  };
  return (
    <Box>
      {/* <Navbar /> */}
      <Box padding="2rem 6%" sx={{ gap: 1 }}>
        <Typography variant="h1" className="text-primary Outfit">
          Student Progression Reports
        </Typography>
        <br />
        <Divider>
          Sort By{" "}
          <Select
            id="sort"
            sx={{
              width: "165px",
              height: "32px",
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
          {/* <IconButton aria-label="menu">
            <IconLogo image={"/assets/menu.png"} size="30" />
          </IconButton>
          <IconButton aria-label="grid">
            <IconLogo image={"/assets/grid.png"} size="30" />
          </IconButton> */}
        </Divider>
        <br />
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
                        <span style={{ color: "grey" }}>Admission Number </span>
                        <br />
                        <NumbersIcon sx={{ marginBottom: "-4px" }} />
                        <span style={{ color: "#f7993b", fontSize: 15 }}>
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
                          <IconButton sx={{ background: "#77C4FD26" }}>
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
                  <Divider />
                </Grid>
              ))}
          </Grid>
        ) : (
          ""
        )}
        <br />
        <br />
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
            <IconButton aria-label="filter">
              <IconLogo image={"/assets/document-filter.png"} size="20" />
            </IconButton>
            Change Filters
          </Button>
        </Grid> */}
      </Box>
    </Box>
  );
};

export default StudentsMobileView;
