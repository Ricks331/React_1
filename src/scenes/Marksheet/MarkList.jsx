import {
  Box,
  Grid,
  Button,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  Card,
  CardContent,
  Link,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CustomSeparator from "components/Breadcrumb";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MarkList = () => {
  const [markList, setMarkList] = useState([]);
  const userData = useSelector((state) => state.user);
  let url_params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("authUser");
    if (user) {
      const marks = JSON.parse(
        sessionStorage.getItem(url_params.class + "_" + url_params.batch)
      );
      setMarkList(marks);
    } else {
      toast.error("Your not logged in.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, []);

  const handleAddMark = () => {
    navigate(
      "/students/mark/" +
        url_params.session +
        "/" +
        url_params.curriculum +
        "/" +
        url_params.class +
        "/" +
        url_params.batch
    );
  };
  const handleGoBack = () => {
    navigate(
      "/student/list/" +
        url_params.session +
        "/" +
        url_params.curriculum +
        "/" +
        url_params.class +
        "/" +
        url_params.batch
    );
  };

  const handleEdit = (index) => {
    navigate(
      "/students/mark/" +
        url_params.session +
        "/" +
        url_params.curriculum +
        "/" +
        url_params.class +
        "/" +
        url_params.batch +
        "/" +
        index
    );
  };

  const handleDelete = (index) => {
    const marks = JSON.parse(
      sessionStorage.getItem(url_params.class + "_" + url_params.batch)
    );
    marks.splice(index, 1);
    setMarkList(marks);
    sessionStorage.setItem(
      url_params.class + "_" + url_params.batch,
      JSON.stringify(marks)
    );
  };
  return (
    <>
      <Box padding="2rem 6%" sx={{ gap: 1 }}>
        <Container>
          <CustomSeparator
            titles={[
              {
                title: "Home",
                icon: <HomeIcon sx={{ marginBottom: "-5px" }} />,
                link: true,
                path: "/",
              },
              {
                title: "Reports",
                icon: <ArticleIcon sx={{ marginBottom: "-5px" }} />,
                link: true,
                path: "/reports",
              },
              {
                title: "Students",
                icon: <ArticleIcon sx={{ marginBottom: "-5px" }} />,
                link: true,
                path:
                  "/student/list/" +
                  url_params.session +
                  "/" +
                  url_params.curriculum +
                  "/" +
                  url_params.class +
                  "/" +
                  url_params.batch,
              },
              {
                title: "Marks",
                icon: <PictureAsPdfIcon sx={{ marginBottom: "-5px" }} />,
                link: false,
              },
            ]}
          />
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="stretch"
          >
            <Grid item xs={12}>
              <Card
                className="card_class"
                sx={{ borderRadius: "20px !important" }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", gap: "1rem" }} spacing={3}>
                    <ArrowBackIcon
                      onClick={() => handleGoBack()}
                      fontSize="large"
                      sx={{ "&:hover": { border: "2px solid orange" } }}
                    />
                    <Typography
                      className="text-primary subHead"
                      variant="h3"
                      sx={{ marginLeft: "30px" }}
                      noWrap
                    >
                      Marks List{" "}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        background: "#1E1C59",
                        color: "white",
                        minWidth: "37px",
                      }}
                      onClick={handleAddMark}
                    >
                      Add Mark
                    </Button>
                  </Box>
                  <br />
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell align="center">Class/Batch</TableCell>
                          <TableCell align="center">Max Mark</TableCell>
                          <TableCell align="center">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {markList && markList ? (
                          markList.map((row, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell scope="row">
                                <Typography
                                  className="text-primary"
                                  sx={{
                                    fontSize: 14,
                                    fontWeight: 400,
                                  }}
                                  title={row.ExamName}
                                >
                                  {row.ExamName}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Typography
                                  sx={{
                                    fontSize: 14,
                                    fontWeight: 400,
                                  }}
                                >
                                  {row.class_id}/{row.batch_id}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Typography
                                  sx={{
                                    fontSize: 14,
                                    fontWeight: 400,
                                  }}
                                >
                                  {row.max_mark}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Link
                                  href="#"
                                  onClick={() => handleEdit(index)}
                                >
                                  <EditIcon />
                                </Link>
                                <Link
                                  href="#"
                                  onClick={() => handleDelete(index)}
                                >
                                  <DeleteIcon />
                                </Link>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell align="center" colSpan={4}>
                              No exams found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
export default MarkList;
