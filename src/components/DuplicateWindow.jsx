import React from "react";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import { Box, useMediaQuery } from "@mui/material";

const DuplicateWindow = () => {
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
        <Box
          flexBasis={isNonMobileScreens ? "75%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <div className="mt-n4">
            <h3 className="text-uppercase">Sorry! 😭</h3>
            <p className="text-muted mb-4">
              You can only have one instance of this web page open at a time.
            </p>
          </div>
        </Box>
      </Box>
    </Container>
  );
};

export default DuplicateWindow;
