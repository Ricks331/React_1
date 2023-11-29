import FlexBetween from "./FlexBetween";
import ApiService from "services/apiService";
import APPCONSTANTS from "configs/constants";
import React, { useState, useEffect } from "react";
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
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import MenuIcon from "@mui/icons-material/Menu";
import LinearProgress from "@mui/material/LinearProgress";

const X_AUTH_TOKEN = "tq355lY3MJyd8Uj2ySzm";

const SimpleSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(5);
  const [results, setResults] = useState([]);
  const [itemsPerPage, setitemsPerPage] = useState(5);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [isLoading, setLoader] = useState(false);
  // Function to fetch data from the API based on the search query and current page
  
  const fetchData = async (isNew = false) => {
    try {
      setLoader(true);
      let req = {
        admission_no: searchQuery,
        school_id: "CPpbKPQTcuG97i3kv",
        from_dashboard: true,
        FILE_SERVER_URL: APPCONSTANTS.FILE_SERVER_URL,
        academic_year: "2023-2024",
        skip: itemsPerPage,
      };
      const apiResult = await ApiService.post('getStudentsByString', req)
    //   const response = await fetch(
    //     "http://localhost:3005/v3/getStudentsByString",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "X-Auth-Token": X_AUTH_TOKEN,
    //       },
    //       body: JSON.stringify(req),
    //     }
    //   );
      const data = apiResult.details
      setLoader(false);
      if (isNew) {
        setResults(data.response);
      } else {
        setResults([...results, ...data.response]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to handle search query changes
  const handleSearchQueryChange = (event) => {
    let value = event.target.value;
    console.log(value, value.trim().length);

    setResults([]);
    setCurrentPage(5); // Reset to the first page when a new search is performed
    setitemsPerPage(5);

    setSearchQuery(event.target.value);
  };
  const handleImageError = (event) => {
    console.log('pppppppppp')
    event.target.src =
      APPCONSTANTS.DUMMY_USER_ICON;
  };
  // Function to handle "Load More" button click
  const handleLoadMore = () => {
    setCurrentPage(currentPage + 5);
    setitemsPerPage(itemsPerPage + 5);
  };

  // Function to handle search submission
  const handleSearch = () => {
    setResults([]);
    setitemsPerPage(5);
    setCurrentPage(5); // Reset to the first page when a new search is performed
    // Clear previous results
    let isNew = true;
    fetchData(isNew);
  };
  function CharacterLimitPipe({ text, limit }) {
    // Truncate the text if it exceeds the character limit
    let truncatedText =
      text.length > limit ? text.slice(0, limit) + "..." : text;

    return <span>{truncatedText}</span>;
  }
  useEffect(() => {
    console.log("useEffectuseEffectuseEffect");
    if (searchQuery && searchQuery.trim().length >= 3 && currentPage > 0) {
      if (currentPage == 5) {
        fetchData(true);
      } else {
        fetchData();
      }
    }
  }, [searchQuery, currentPage]);

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
          onChange={handleSearchQueryChange}
          label="Outlined secondary"
          color="secondary"
          disabled={isLoading}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon onClick={handleSearch} />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
          <DirectionsIcon onClick={handleSearch} />
        </IconButton>
      </Paper>
      {/* Search input */}
      {/* <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchQueryChange}
      /> */}

      {/* Render search results */}
      <Paper>
        {isLoading ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : (
          ""
        )}

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
          {results &&
            results.map((item, index) => (
              <FlexBetween key={index}>
                {/* <Card
                  width={isNonMobileScreens ? "30%" : "100%"}
                  sx={{ display: "flex", p: 1, m: 1 }}
                >
                  <CardContent>
                    <CardMedia
                      sx={{ height: 100, width: 100 }}
                      image={item.image}
                      title={item.name}
                      alt="My Image"
                      onError={handleImageError}
                    />
                    <Typography variant="h5" component="div">
                      <CharacterLimitPipe
                        text={item.name}
                        limit={5}
                      ></CharacterLimitPipe>
                    </Typography>
                    <CardActions>
                      <Button size="large">{item.admission_number}</Button>
                    </CardActions>
                  </CardContent>
                </Card> */}
                <Card
                  className="card_class"
                  sx={{ maxWidth: 265 }}
                  // width={isNonMobileScreens ? "30%" : "100%"}
                  // sx={{  p: 1, m: 1 ,
                  // }}
                >
                  <CardMedia
                    component="img"
                    alt={item.name}
                    height="100"
                    image={item.image}
                  />
                  <Box sx={{ display: "flex", p: 1, m: 1 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {/* {item.name.length > 15
                          ? `${item.name.substring(0, 15)}...`
                          : item.name} */}
                        <CharacterLimitPipe
                          text={item.name}
                          limit={15}
                        ></CharacterLimitPipe>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.admission_number}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" disableRipple>
                        Profile
                      </Button>
                      <Button size="small" disableRipple>
                        Reports
                      </Button>
                    </CardActions>
                  </Box>
                </Card>
              </FlexBetween>
            ))}
        </Box>
      </Paper>

      {/* "Load More" button */}
      {results.length > 0 && (
        <Button onClick={handleLoadMore} variant="contained">
          Load More
        </Button>
      )}
    </div>
  );
};

export default SimpleSearch;
