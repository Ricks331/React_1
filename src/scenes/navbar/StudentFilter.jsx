import React, { useState, useEffect } from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Search } from "@mui/icons-material";
import {
  IconButton,
  InputBase,
  useTheme,
  Stack,
  Popper,
  ButtonGroup,
  Button,
  Grid,
  InputAdornment,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import axios from "axios";
import APPCONSTANTS from "configs/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const API_BASE_URL = APPCONSTANTS.API_BASE_URL; // Replace with your API's base URL
const V0_API_BASE_URL = APPCONSTANTS.V0_API_BASE_URL;
const customHeaders = {
  "Content-Type": "application/json", // You can add other headers as needed
  "X-Auth-Token": APPCONSTANTS.X_AUTH_TOKEN,
};
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: customHeaders,
});
const StudentFilter = () => {
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [morePage, SetmorePage] = useState(true);
  const [changeType, setChangeType] = useState(true);
  const [skip, setSkip] = useState(0);
  const navigate = useNavigate();
  const [selectedVal, selectedValue] = useState(null);

  const handleInputChange = (event, newInputValue) => {
    if (event.type == "click") {
      selectedValue(options[event.target.dataset.optionIndex]._id);
      toast.success(
        "Selected " + options[event.target.dataset.optionIndex].name
      );
      navigate(
        "/student/report/" + options[event.target.dataset.optionIndex]._id,
        { replace: true }
      );
    } else {
      setSkip(0);
      SetmorePage(true);
      setInputValue(newInputValue);
      setChangeType(event.type);
    }
  };

  const loadMoreOptions = (e) => {
    let req = {
      admission_no: inputValue,
      school_id: user.school_id,
      from_dashboard: true,
      FILE_SERVER_URL: APPCONSTANTS.FILE_SERVER_URL,
      academic_year: user.academic_year,
      skip: skip,
    };
    fetchData(inputValue, "");
  };

  const fetchData = (searchValue, type) => {
    let cancelToken;
    let searchQuery = searchValue.trim();
    // if (searchQuery && searchQuery.length && searchQuery.length >= 4) {

    // Cancel previous requests to avoid race conditions
    if (cancelToken) {
      cancelToken.cancel();
    }
    if (inputValue.length >= 4) {
      setLoading(true);
    }
    cancelToken = axios.CancelToken.source();
    let req = {
      admission_no: searchQuery,
      school_id: user.school_id,
      from_dashboard: true,
      FILE_SERVER_URL: APPCONSTANTS.FILE_SERVER_URL,
      academic_year: user.academic_year,
      skip: skip,
    };
    axiosInstance
      .post("getStudentsByString", req, {
        cancelToken: cancelToken.token,
      })
      .then((response) => {
        console.log(inputValue.length);
        if (inputValue.length >= 4) {
          console.log(response.data.data.details.response);
          SetmorePage(response.data.data.details.morePage);
          setSkip(response.data.data.details.skip);
          setLoading(false);
          if (type == "click") {
            let value = response.data.data.details.response;
            navigate("/student/report/" + value[0]._id, { replace: true });
          } else if (type == "") {
            setOptions((options) => [
              ...options,
              ...response.data.data.details.response,
            ]);
          } else {
            setOptions(response.data.data.details.response);
          }
        } else {
          SetmorePage(false);
          setOptions([]);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          // Request was canceled
        } else {
          console.error("Error fetching data:", error);
        }
        setLoading(false);
      });
    // } else {
    //   setOptions([]);
    //   setLoading(false);
    // }

    return () => {
      if (cancelToken) {
        cancelToken.cancel();
      }
    };
  };
  useEffect(() => {
    fetchData(inputValue, changeType);
  }, [inputValue, changeType]);

  const buttonOption = (
    <Button
      onClick={(e) => {
        console.log("CLICK SUCCESSFUL");
        e.stopPropagation();
      }}
    >
      No results! Click me
    </Button>
  );

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option) => option.name + option.admission_number,
  });

  return (
    <FlexBetween
      backgroundColor={neutralLight}
      borderRadius="9px"
      gap="3rem"
      // padding="0.1rem 1.5rem"
    >
      {/* <InputBase placeholder="Search name or Ad. No...." /> */}
      <Stack spacing={2} sx={{ width: 300 }}>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          value={options.find((option) => option._id === selectedVal)}
          options={options}
          getOptionLabel={(option) => option.name} // Replace with your API response data structure
          filterOptions={filterOptions}
          loading={loading}
          onInputChange={handleInputChange}
          renderInput={(params) => (
            //   <TextField {...params} label="Search" variant="outlined" />
            // <InputBase placeholder="Search name or Ad. No...."  {...params} />
            <TextField
              sx={{ borderRadius: "9px", marginRight: "20px" }}
              {...params}
              placeholder="Search name or Ad. No...."
              InputProps={{
                ...params.InputProps,
                type: "search",
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      {options.length > 0 && morePage ? (
                        <Button
                          variant="contained"
                          sx={{ background: "gray", color: "white" }}
                          onClick={loadMoreOptions}
                        >
                          LOAD MORE..
                        </Button>
                      ) : (
                        <Search />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.stopPropagation();
                }
              }}
            />
          )}
        />
      </Stack>
    </FlexBetween>
  );
};

export default StudentFilter;
