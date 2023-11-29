import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route } from "react-router-dom";
import { useProfile } from "Hooks/UserHooks";
import { setLogout } from "state";
import { useNavigate } from "react-router-dom";

const AuthProtected = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userProfile } = useProfile();
  useEffect(() => {
    if (!userProfile) {
        console.log('oooooooooooooo')
      localStorage.removeItem('authUser');
      dispatch(setLogout());
      navigate('/')
    }
  }, []);
  if (!userProfile) {
    return <Navigate to={{ pathname: "/", state: { from: props.location } }} />;
  }
  return <>{props.children}</>;
};
const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            {" "}
            <Component {...props} />{" "}
          </>
        );
      }}
    />
  );
};
export { AuthProtected, AccessRoute };
