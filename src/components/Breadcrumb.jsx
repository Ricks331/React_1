import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Typography, Link, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom/dist";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function CustomSeparator(props) {
  const navigate = useNavigate()

  return (
    <Stack spacing={3} style={{ marginTop: "-15px", marginBottom: "10px" }}>
      <Breadcrumbs separator="/" aria-label="breadcrumb">
        {props.titles.map((element, index) => {
        if (!element.link) {
          return <Typography key="3" className="text-secondary">
             {element.icon}{" "}
             {element.title}
           </Typography>;
        }

        return <Link underline="hover" key="1" color="inherit" onClick={()=>navigate(element.path)}>
           {element.icon}{" "}
           {""}{element.title}
         </Link>;
      })}
      </Breadcrumbs>
    </Stack>
  );
}
