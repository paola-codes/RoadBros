import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import RoadBrosLogo from "../../img/RoadBrosLogo.png";
import "../../styles/index.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container p-4 text-center text-light fs-6 m-auto mt-3">
      <h1>Welcome to RoadBros</h1>
      <span>
        <img
          alt=""
          src={RoadBrosLogo}
          width="200"
          height="200"
          className="d-inline-block align-top my-4"
        />
      </span>
      <h2 className="my-3">
        The app that helps you get road assistance near you!
      </h2>
      <h3 className="my-3">
        If you want to get help now, or become a trucker to help others, sign up
        now!
      </h3>
      <div className="my-4">
        <Link to="/SignUpPage">
          <button className="btn btn-warning btn-lg">Sign Up Now!</button>
        </Link>
      </div>

      <h3 className="my-3">Already memeber?</h3>
      <h3 className="my-3">Sign in below!</h3>
      <div className="my-4">
        <Link to="/LoginPage">
          <button className="btn btn-warning btn-lg mb-5">Sign In</button>
        </Link>
      </div>

      <footer className="footer">
        <h3>
          RoadBros Copyrigth{" "}
          <i className="fa fa-registered" aria-hidden="true" />
        </h3>
      </footer>
    </div>
  );
};
