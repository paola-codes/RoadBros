import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const ClientVehiclesList = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getVehicles(store.loggedUser.id);
  }, []);

  return (
    <div className="container text-center text-light mt-3 p-4">
      <h1 className="text-center my-4">Vehicles List</h1>
      <ul
        className="list-group position-relative mx-auto"
        style={{ width: "70%" }}
      >
        {store.listOfVehicles.length > 0
          ? store.listOfVehicles.map((item, index) => {
              return (
                <li
                  className="list-group-item d-flex flex-column mx-1 mb-3 shadow-lg border border-warning border-4 rounded-3"
                  key={index}
                >
                  <p className="mx-2 m-1 text-start">
                    <strong>Type:</strong> {item.vehicle_type}
                  </p>
                  <p className="mx-2 m-1 text-start">
                    <strong>Make:</strong> {item.vehicle_make}
                  </p>
                  <p className="mx-2 m-1 text-start">
                    <strong>Model:</strong> {item.vehicle_model}
                  </p>
                  <p className="mx-2 m-1 text-start">
                    <strong>Year:</strong> {item.vehicle_year}
                  </p>
                  <p className="mx-2 m-1 text-start">
                    <strong>Color:</strong> {item.vehicle_color}
                  </p>
                  <p className="mx-2 m-1 text-start">
                    <strong>Plate Number:</strong> {item.vehicle_plate}
                  </p>
                  <p className="text-center m-1 mt-3">
                    <button
                      type="button"
                      className="btn btn-danger mx-2 mb-0 px-1"
                      onClick={() => actions.deleteVehicles(item.id)}
                    >
                      Remove
                    </button>
                  </p>
                </li>
              );
            })
          : "Loading..."}
      </ul>
      <Link to="/ClientAddVehicles">
        <button className="btn btn-warning btn-lg p-2 m-3">Add Vehicles</button>
      </Link>
      <Link to="/ClientHomePage">
        <button className="btn btn-warning btn-lg p-2 m-3">Home</button>
      </Link>
    </div>
  );
};
