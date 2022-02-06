import React, { useState, useContext } from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const ClientAddVehicles = () => {
  const { actions, store } = useContext(Context);

  const [newVehicle, setnewVehicle] = useState({
    vehicle_model: "",
    vehicle_make: "",
    vehicle_year: "",
    vehicle_type: "",
    vehicle_color: "",
    vehicle_plate: "",
    user_id: store.loggedUser.id,
  });

  const handleChange = (e) =>
    setnewVehicle({ ...newVehicle, [e.target.name]: e.target.value });

  return (
    <div className="container p-4 text-center text-light fs-6 m-auto mt-3">
      <div>
        <h1 className="text-center my-4">Add Vehicles</h1>
        <form className="text-start">
          <div className="form-group my-2">
            <label>Type</label>
            <input
              type="text"
              className="form-control"
              placeholder="Type"
              name="vehicle_type"
              onChange={handleChange}
            />
          </div>
          <div className="form-group my-2">
            <label>Make</label>
            <input
              type="text"
              className="form-control"
              placeholder="Make"
              name="vehicle_make"
              onChange={handleChange}
            />
          </div>
          <div className="form-group my-2">
            <label>Model</label>
            <input
              type="text"
              className="form-control"
              placeholder="Model"
              name="vehicle_model"
              onChange={handleChange}
            />
          </div>
          <div className="form-group my-2">
            <label>Year</label>
            <input
              type="text"
              className="form-control"
              placeholder="Year"
              name="vehicle_year"
              onChange={handleChange}
            />
          </div>
          <div className="form-group my-2">
            <label>Color</label>
            <input
              type="text"
              className="form-control"
              placeholder="Color"
              name="vehicle_color"
              onChange={handleChange}
            />
          </div>
          <div className="form-group my-2">
            <label>Plate Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Plate"
              name="vehicle_plate"
              onChange={handleChange}
            />
          </div>
        </form>
        <Link to="/ClientVehiclesList">
          <button
            className="btn btn-warning btn-lg p-2 m-3"
            onClick={() => {
              actions.addVehicle(newVehicle);
              actions.getVehicles(store.loggedUser.id);
            }}
          >
            Add Vehicle
          </button>
        </Link>
        <Link to="/ClientHomePage">
          <button
            className="btn btn-warning btn-lg p-2 m-3"
            onClick={() => {
              actions.getRequests();
            }}
          >
            Home
          </button>
        </Link>
      </div>
    </div>
  );
};

ClientAddVehicles.propTypes = {
  history: PropTypes.object,
};
