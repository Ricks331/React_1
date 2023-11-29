import { Box } from "@mui/material";

const IconLogo = ({
  image,
  size = "60px",
  radius = "50%",
  right = "0px",
  bottom = "-5px",
  top = "",
  title = "",
}) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{
          objectFit: "cover",
          borderRadius: radius,
          marginBottom: bottom,
          marginRight: right,
          marginTop: top,
        }}
        width={size}
        height={size}
        src={image}
        title={title}
      />
    </Box>
  );
};

export default IconLogo;
