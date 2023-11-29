import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src="https://iau.edu.lc/wp-content/uploads/2016/09/dummy-image.jpg"
      />
    </Box>
  );
};

export default UserImage;
