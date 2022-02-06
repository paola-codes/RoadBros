import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const LoginRequired = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container py-4 px-3 text-center text-light fs-4 mt-3">
      <h1 className="my-4">
        Please Login or Sign Up to access RoadBros Services
      </h1>

      <div className="my-4">
        <Link to="/SignUpPage">
          <button className="btn btn-warning btn-lg">Sign Up Now!</button>
        </Link>
      </div>

      <div className="my-4">
        <Link to="/LoginPage">
          <button className="btn btn-warning btn-lg mb-5">Sign In</button>
        </Link>
      </div>
    </div>
  );
};
