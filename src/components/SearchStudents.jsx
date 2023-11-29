import FlexBetween from "./FlexBetween";
// import ImageWithErrorHandling from "./DummyImage";
import {
  Box,
  useMediaQuery,
  CardContent,
  Card,
  CardMedia,
  Button,
  Typography,
  CardActions,
  IconButton,
  InputBase,
  Input,
  Paper,
  Divider,
} from "@mui/material";

import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
  //   DirectionsIcon,
  //   SearchIcon,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import MenuIcon from "@mui/icons-material/Menu";
import LinearProgress from "@mui/material/LinearProgress";

import { useState, useEffect } from "react";
// import * as React from 'react';
const ariaLabel = { "aria-label": "description" };
const X_AUTH_TOKEN = "tq355lY3MJyd8Uj2ySzm";
let morePage = true;
let skip = 30;
const AutocompleteSearch = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [searchQuery, setSearchQuery] = useState("");
  let [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(5);
  const [isLoading, setLoader] = useState(false)
  let itemsPerPage = 5;
  // Function to fetch autocomplete suggestions from the API
  const fetchSuggestions = async (query) => {
    let req = {
      admission_no: query,
      school_id: "CPpbKPQTcuG97i3kv",
      from_dashboard: true,
      FILE_SERVER_URL: "https://teamsqa4000.educore.guru",
      academic_year: "2023-2024",
      skip: currentPage,
    };
    const loggedInResponse = await fetch(
      "http://localhost:3005/v3/getStudentsByString",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": X_AUTH_TOKEN,
        },
        body: JSON.stringify(req),
      }
    );
    const loggedIn = await loggedInResponse.json();
    console.log(loggedIn);
    if (loggedIn.status) {
      if (loggedIn.status.code == 200) {
        /**success */
        
        console.log(loggedIn.data.details.response)
        setSuggestions(...suggestions, ...loggedIn.data.details.response);
        // setCurrentPage(currentPage+ loggedIn.data.details.skip)
        return loggedIn.data.details.response
      } else {
        /**Login Api error */
        //   handleLoginError(loggedIn.error)
      }
    }
  };
  const handleLoadMore = () => {
    setLoading(true);
    setCurrentPage(currentPage + 5);
    console.log(searchQuery)
    fetchSuggestions(searchQuery)
    
  };
  // Function to handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Fetch suggestions when the input value changes
    if (value.trim().length >= 3) {
      setLoading(true);
      fetchSuggestions(value)
        .then((data) => {
          console.log(data, ">>>>>>>>>>>>");
          setSuggestions(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching suggestions:", error);
          setLoading(false);
        });
    } else {
      setSuggestions([]);
    }
  };
  const handleImageError = (event) => {
    event.target.src = "https://iau.edu.lc/wp-content/uploads/2016/09/dummy-image.jpg"; 
  };
  return (
    <div>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Students here..."
          inputProps={{ "aria-label": "Search Students" }}
          value={searchQuery}
          onChange={handleInputChange}
          label="Outlined secondary"
          color="secondary"
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
          <DirectionsIcon />
        </IconButton>
      </Paper>
      {loading ? (
        // <p>Loading suggestions...</p>
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          {suggestions &&
            suggestions.map((item, index) => (
              <FlexBetween key={index}>
                <Card
                  width={isNonMobileScreens ? "30%" : "100%"}
                  
                  sx={{ display: "block", p: 1, m: 1 }}
                >
                  <CardMedia
                    sx={{ height: 100, width: 100 }}
                    image={item.image}
                    title={item.name}
                    onError={handleImageError}
                  />
                  <CardActions>
                    <Button size="large">{item.admission_number}</Button>
                  </CardActions>
                </Card>
              </FlexBetween>
              
            ))}
            <button onClick={handleLoadMore}>Load More</button>
        </Box>
      )}
    </div>
  );
};
export default AutocompleteSearch;

// const SearchStudents = () => {
//   return <div>SearchStudents</div>;
// };

// export default SearchStudents;
