import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
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

const PreviewMarks = (props) => {
  const dispatch = useDispatch();
  CommonService.loaderOFF(dispatch);
  const userData = useSelector((state) => state.user);
  let url_params = useParams();
  const [studentListResponse, setStudentListResponse] = useState({});
  const [studentList, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

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

  const handleClose = () => {
    //setOpen(false);
  };

  const getValueByKey = (dataArray, key) => {
    // Iterate through the array to find the object with the specified key
    for (let i = 0; i < dataArray.length; i++) {
      const obj = dataArray[i];
      // Check if the key exists in the current object
      if (Object.keys(obj)[0] === key) {
        // Return the value associated with the key
        return Object.values(obj)[0];
      }
    }
    // If the key is not found, you can return a default value or null
    return null;
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Mark</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component={"th"} scope="row">
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
                      src={row.student_img}
                      width={30}
                      height={30}
                    />
                    <Typography
                      className="text-primary"
                      sx={{
                        fontSize: 14,
                        fontWeight: 400,
                        marginLeft: "15px",
                      }}
                      title={row.name}
                    >
                      {row.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  {getValueByKey(
                    props.students ? props.students : [],
                    row._id
                  ) || (
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 400,
                      }}
                    >
                      Enter Mark
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PreviewMarks;
