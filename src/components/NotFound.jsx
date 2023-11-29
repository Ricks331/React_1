import React from "react";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import { Box, useMediaQuery } from "@mui/material";

const NotFound = () => {
  document.title = "404 Error | BM-REPORTS";
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <Container>
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
              width={400}
              src="/assets/error400-cover.png"
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
            <h1 className="display-1 fw-medium">404</h1>
            <h3 className="text-uppercase">Sorry, Page not Found 😭</h3>
            <p className="text-muted mb-4">
              The page you are looking for not available!
            </p>
            <Link to="/" className="btn btn-success">
              <i className="mdi mdi-home me-1" />
              Back to home
            </Link>
          </div>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFound;
