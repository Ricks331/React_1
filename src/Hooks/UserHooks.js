import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
const getLoggedinUser = () => {
  const user = localStorage.getItem('authUser');
  if (!user) {
    return null;
  }
  return JSON.parse(user);
};

const useProfile = () => {
  const userProfileSession = getLoggedinUser();
  const [userProfile, setUserProfile] = useState(userProfileSession || null);

  useEffect(() => {
    const userProfileSession = getLoggedinUser();
    setUserProfile(userProfileSession || null);
  }, []);

  return { userProfile };
};

export { useProfile };
