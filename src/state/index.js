import { createSlice } from "@reduxjs/toolkit";
import { Navigate, Route } from "react-router-dom";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('authUser', JSON.stringify(action.payload.user));
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("authUser");
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setBackDropOn: (state, action) => {
      state.back_drop = action.payload.back_drop;
    },
    getBackDropOFF: (state, action) => {
      state.back_drop = action.payload.back_drop;
    },
    setClassCombo: (state, action) => {
      state.class_combo = action.payload
    }
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, 
  setBackDropOn, getBackDropOFF, setClassCombo } =
  authSlice.actions;
export default authSlice.reducer;
