import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

export default function SimpleBackdrop() {
  const dispatch = useDispatch();
  const states = useSelector((state) => state.back_drop);
  const isAuth = useSelector((state) => state.token);
  const [isLoading, setLoader] = React.useState(false);
  const handleClose = () => {
    setLoader(false);
  };
  const handleOpen = () => {
    setLoader(true);
  };
  useEffect(() => {
    console.log(states);
    if (isAuth) {
      setLoader(states);
    }
    // dispatch(
    //     setBackDropOnOFF({
    //         back_drop : true
    //     })
    // )
  });
  return (
    <div>
      {/* <Button onClick={handleOpen}>Show backdrop</Button> */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={handleClose}
        className="custom--"
      >
         
        <Typography variant="h6" color="inherit">
          Loading...
        </Typography>
        &nbsp;&nbsp;
        <CircularProgress color="inherit"></CircularProgress>
      </Backdrop>
    </div>
  );
}
