import { useSelector } from "react-redux";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import ReportPage from "scenes/reportPage";
import { Navigate, Routes, Route } from "react-router-dom";
import Students from "scenes/reportPage/students";
import NormalLayout from "layouts/NormalLayout";
import NonAuthLayout from "layouts/NonAuthLayout";
import { AuthProtected } from "./AuthProtected";
import NotFound from "components/NotFound";
import TermList from "scenes/reportPage/TermList";
import React, { Suspense, lazy } from "react";
import MiniDrawer from "../sidebar/Sidebar";
import { Box, useMediaQuery } from "@mui/material";
import DuplicateWindow from "components/DuplicateWindow";
import AddMark from "scenes/Marksheet/AddMark";
import MarkList from "scenes/Marksheet/MarkList";

const AppRoutes = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 700px)");
  const authProtectedRoutes = [
    { path: "/home", component: <HomePage /> },
    { path: "/reports", component: <ReportPage /> },
    {
      path: "/student/list/:session/:curriculum/:class/:batch",
      component: <Students />,
    },
    {
      path: "/student/report/:student_id",
      component: <TermList />,
    },
    {
      path: "/students/mark/:session/:curriculum/:class/:batch",
      component: <AddMark />,
    },
    {
      path: "/students/mark/:session/:curriculum/:class/:batch/:key",
      component: <AddMark />,
    },
    {
      path: "/marks/:session/:curriculum/:class/:batch",
      component: <MarkList />,
    },
  ];
  const publicRoutes = [{ path: "/", component: <LoginPage /> }];
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <Routes>
      {/* <Route path="/" element={isAuth ? <HomePage /> : <LoginPage />} />

      <Route path="/reports" element={isAuth ? <ReportPage /> : <LoginPage />} />
      <Route
        path="/home"
        element={isAuth ? <HomePage /> : <Navigate to="/" />}
      /> */}
      {/* {publicRoutes.map((route, idx) => (
        <Route
        path={route.path}
        element={<NonAuthLayout><LoginPage /></NonAuthLayout>}
          key={idx}
          exact
        />
      ))} */}
      <Route path="*" element={<NotFound />} />
      <Route path="/duplicate" element={<DuplicateWindow />} />
      <Route
        path="/"
        element={
          isAuth ? (
            <AuthProtected>
              <Box>
                {isNonMobileScreens ? (
                  <Box sx={{ width: "6%" }}>
                    <MiniDrawer />
                  </Box>
                ) : (
                  ""
                )}

                <main
                  style={{
                    float: "right",
                    width: isNonMobileScreens ? "94%" : "100%",
                  }}
                >
                  <NormalLayout />
                  <HomePage />
                </main>
              </Box>
            </AuthProtected>
          ) : (
            <NonAuthLayout>
              <LoginPage />
            </NonAuthLayout>
          )
        }
      />
      {authProtectedRoutes.map((route, idx) => (
        <Route
          path={route.path}
          element={
            <AuthProtected>
              <Suspense>
                <Box width={"100%"}>
                  {isNonMobileScreens ? (
                    <Box sx={{ width: "6%" }}>
                      <MiniDrawer />
                    </Box>
                  ) : (
                    ""
                  )}
                  <main
                    style={{
                      float: "right",
                      width: isNonMobileScreens ? "94%" : "100%",
                    }}
                  >
                    <NormalLayout />
                    {route.component}
                  </main>
                </Box>
              </Suspense>
            </AuthProtected>
          }
          key={idx}
          exact
        />
      ))}
    </Routes>
  );
};

export default AppRoutes;
