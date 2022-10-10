import { updateStart, updateSuccess, updateError } from "./userSlice";
import React from "react";
import { Navigate, Route } from "react-router-dom";

const apiCall = async (dispatch) => {
  dispatch(updateStart());
  try {
    const getUser = async () => {
      let res = await fetch("http://localhost:4000/auth/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          // "Content-Type": "application/json",
          // "Access-Control-Allow-Credentials": true,
        },
      });
      const ress = await res.json();
      console.log(ress);
      dispatch(updateSuccess(ress.user));
    };
    getUser();
  } catch (err) { }
};

export const logoutCall = async () => {
  try {
    let logout = await fetch("http://localhost:4000/api/p", {
      method: "GET",
      headers: {
        Accept: "application/json",

      },
    });
  } catch (err) { }
}





export default apiCall;
