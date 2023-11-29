import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconLogo from "components/IconLogo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    console.log(token)
    // const response = await fetch(`http://localhost:3001/users/${userId}`, {
    //   method: "GET",
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    // const data = await response.json();
    setUser(token);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    name,
    lastName,
    primary_role_id,
    school_name,
    viewedProfile,
    impressions,
    username,
    employeeNo

  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
              className="home_text">
              {name} {lastName}
            </Typography>
            
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          {/* <LocationOnOutlined fontSize="large" sx={{ color: main }} /> */}
          <IconLogo
            image={"../assets/teacher.png"}
            size="20"
          />{" "}
          <Typography className="home_text" fontWeight="500">{primary_role_id}</Typography>
          
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          {/* <WorkOutlineOutlined fontSize="large" sx={{ color: main }} /> */}
          
          <IconLogo
            image={"../assets/icon-park-outline_school.png"}
            size="20"
          />{" "}
          <Typography  fontWeight="500" className="home_text">{school_name}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      {/* <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box> */}

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Personal Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
          <img src="../assets/mail.svg" alt="linkedin" />
            <Box>
              <Typography className="home_text" fontWeight="500">
              {username}
              </Typography>
              <Typography color={medium}>Email</Typography>
            </Box>
          </FlexBetween>
          {/* <EditOutlined sx={{ color: main }} /> */}
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
          <img src="../assets/hash.svg" alt="linkedin" />
            <Box>
              <Typography className="home_text" fontWeight="500">
              {employeeNo}
              <FontAwesomeIcon icon="fa-solid fa-envelope" />
              </Typography>
              <Typography color={medium}>Emp. Number</Typography>
            </Box>
          </FlexBetween>
          {/* <EditOutlined sx={{ color: main }} /> */}
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
