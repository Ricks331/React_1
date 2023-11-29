import {
  Box,
  Typography,
  Container,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useMediaQuery,
  Divider,
  Stack,
  IconButton,
  Card,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import React, { useState, useEffect } from "react";
import ApiService from "services/apiService";
import APPCONSTANTS from "configs/constants";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CommonService from "services/commonService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// const dispatch = useDispatch();
function takeOneItemFromArray(array = [], _key, _value){
  console.log('fffffff')
}
const MobileView = (props) => {
  const [isLoading, setLoader] = useState(false);
  const [results, setResults] = useState([]);
  const [selectedCurriculum, setCurriculum] = useState("");
  const [selectedClass, setClass] = useState("");
  const [classes, getClass] = useState([]);
  const [batches, getBatches] = useState([]);
  const [allCurriculums, getAllCurriculums] = useState([]);
  const userData = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [batch, setBatch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const user = localStorage.getItem("authUser");
    if (user) {
     fetchMobileData();
    } else {
      toast.error("Your not logged in.");
       setTimeout(() => {
         window.location.reload();
       }, 1000);
    }    
  }, []);
  const handleBatch = async (clickedBatch, xclass = {}) => {
    console.log(clickedBatch, xclass)
    const classItem = classes.find((obj) => {
      return obj._id === selectedClass;
    });
    takeOneItemFromArray()
    console.log(clickedBatch, selectedClass)
      let batchId = clickedBatch.name;
      await setBatch(clickedBatch.name);
      toast.success("You have selected " + classItem.name + " " + clickedBatch.name)
      let req = {
        session_id : clickedBatch.session_id,
        curriculum_id : selectedCurriculum,
        batch_id : clickedBatch._id,
        class_id : selectedClass,
        school_id: userData.school_id,
        academic_year: userData.academic_year,
      }
      // CommonService.setClassCombo(dispatch, req)
      let url = clickedBatch.session_id + "/" + selectedCurriculum + "/" +
      selectedClass + "/" + clickedBatch._id
      navigate("/student/list/"+ url)
      console.log(req)
    // await navigate("/student/list?batch=" + batchId + "&class=" + classId);
  };
  const fetchMobileData = async () => {
    try {
      let req = {
        school_id: userData.school_id,
        academic_year: userData.academic_year,
        initload: true,
        user_id : userData.user_id
      };
      let apiResult = await ApiService.post("classesByPartitian", req);
      let results = apiResult.details.classesByCurriculum.data;
      getAllCurriculums(results);
      setCurriculum(results[0].curriculum_id);
      var classArr = results.find((obj) => {
        return obj.curriculum_id === results[0].curriculum_id;
      });
      getClass(classArr.class_array);
      setClass(classArr.class_array[0]._id);
      const batchArr = classArr.class_array.find((obj) => {
        return obj._id === classArr.class_array[0]._id;
      });
      getBatches(batchArr.batch_array);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCurriculumChange = async (e) => {
    setClass("");
    getBatches([]);
    setCurriculum(e.target.value);
    const classArr = props.curriculums.find((obj) => {
      return obj.curriculum_id === e.target.value;
    });
    getClass(classArr.class_array);
  };

  const handleChangeClass = async (e) => {
    setClass(e.target.value);
    getBatches([]);
    const batchArr = classes.find((obj) => {
      return obj._id === e.target.value;
    });
    getBatches(batchArr.batch_array);
  };

  return (
    <Box>
      {/* <Navbar /> */}
      <Box padding="2rem 6%" sx={{ gap: 1 }}>
        <Typography variant="h1" className="text-primary Outfit">
          Classes And Batches
        </Typography>
        <br />
        <Divider />
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Typography variant="subtitle2">Select Curriculum</Typography>
              <Select
                id="curriculum"
                sx={{
                  borderRadius: "16px",
                }}
                className="primary"
                value={selectedCurriculum}
                onChange={handleCurriculumChange}
              >
                {allCurriculums &&
                  allCurriculums.map((item, index) => (
                    <MenuItem
                      className="primary"
                      key={index}
                      value={item.curriculum_id}
                    >
                      {item.curriculum}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Typography variant="subtitle2">Select Class</Typography>
              <Select
                id="class"
                sx={{
                  borderRadius: "16px",
                }}
                className="primary"
                onChange={handleChangeClass}
                value={selectedClass}
              >
                {classes &&
                  classes.map((classItem, itemIndex) => (
                    <MenuItem
                      className="primary"
                      key={classItem._id}
                      value={classItem._id}
                    >
                      {classItem.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          {batches.length > 0 ? (
            <Grid item xs={12}>
              <Typography variant="subtitle2">Select Batch</Typography>
              <Grid container spacing={2} alignItems="stretch">
                {batches &&
                  batches.map((batch, batchIndex) => (
                    <Grid item xs={2} key={batchIndex}>
                      <IconButton
                        spacing={2}
                        key={batchIndex}
                        sx={{
                          background: "white",
                          borderRadius: "25%",
                          marginLeft: "2px",
                        }}
                        edge="start"
                        className="primary"
                        aria-label="menu"
                        onClick={() => {
                          handleBatch(batch);
                        }}
                      >
                        {batch.name}
                      </IconButton>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          ) : (
            ""
          )}
        </Grid>
        <br />
        <br />
        {/* <Grid justifyContent="center" alignItems="stretch" textAlign="center">
          <Button
            variant="contained"
            sx={{
              background: "#1E1C59",
              color: "white",
              textTransform: "capitalize",
              borderRadius: "20px",
            }}
          >
            <AssignmentOutlinedIcon /> {" "}Get Reports
          </Button>
        </Grid> */}
      </Box>
    </Box>
  );
};

export default MobileView;
