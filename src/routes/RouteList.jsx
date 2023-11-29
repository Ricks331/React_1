
import React from 'react'
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
// import ProfilePage from "scenes/profilePage";
import ReportPage from "scenes/reportPage";
import StudentList from "scenes/studentList/StudentList";

// const RouteList = () => {
    const authProtectedRoutes = [
        { path: '/home', component: <HomePage /> },
        { path: '/reports', component: <ReportPage /> },
        { path: '/student/list', component: <StudentList /> }
    ]
    
//   return authProtectedRoutes
// }

export  {authProtectedRoutes}