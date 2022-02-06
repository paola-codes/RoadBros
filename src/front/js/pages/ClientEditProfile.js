import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const ClientEditProfile = () => {
  const { store, actions } = useContext(Context);

  const [updatedUser, setUpdatedUser] = useState({
    full_name: store.loggedUser.full_name,
    email: store.loggedUser.email,
    phone: store.loggedUser.phone,
  });

  const handleChange = (e) =>
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });

  return (
    <div className="container py-4 px-3 text-center text-light fs-4 my-3">
      <h1 className="text-center my-4">User Information</h1>

      <h2>Change your information on the fields below</h2>

      <form className="text-start">
        <div className="form-group my-1">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Edit Full Name"
            name="full_name"
            onChange={handleChange}
            value={updatedUser.full_name}
          />
        </div>
        <div className="form-group my-1">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Edit email"
            name="email"
            onChange={handleChange}
            value={updatedUser.email}
          />
        </div>
        <div className="form-group my-1">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            placeholder="Edit Phone Number"
            name="phone"
            onChange={handleChange}
            value={updatedUser.phone}
          />
        </div>
      </form>
      <Link to="/ClientProfile">
        <button
          className="btn btn-warning btn-lg p-2 w-75 m-auto my-3"
          onClick={() => {
            actions.updateClientProfile(updatedUser, store.loggedUser.id);
          }}
        >
          Save Changes
        </button>
      </Link>
      <Link to="/ClientHomePage">
        <button
          className="btn btn-warning btn-lg p-2 w-75 m-auto my-3"
          onClick={() => {
            actions.getRequests();
          }}
        >
          Back Home
        </button>
      </Link>
    </div>
  );
};
