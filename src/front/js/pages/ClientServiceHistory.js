import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const ClientServiceHistory = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getRequests();
  }, []);

  const filteredRequests = (request) => {
    return (
      request["completed"] == "yes" &&
      request["user_id"] == `${store.loggedUser.id}` &&
      request["finished"] == "yes"
    );
  };

  const filteredList = Object.values(store.listOfRequests).filter(
    filteredRequests
  );

  return (
    <div className="container p-4 text-center text-light fs-6 mt-3">
      <h1 className="text-center my-4">Service History</h1>
      <ul
        className="list-group position-relative mx-auto"
        style={{ width: "80%" }}
      >
        {filteredList.map((item, index) => {
          return (
            <li
              className="list-group-item d-flex flex-column mx-1 mb-3 shadow-lg border border-warning border-4 rounded-3"
              key={index}
            >
              <p className="mx-2 m-1 text-start">
                <strong>Trucker Name:</strong> {item.trucker_name}
              </p>
              <p className="mx-2 m-1 text-start">
                <strong>Vehicle:</strong> {item.vehicle}
              </p>
              <p className="mx-2 m-1 text-start">
                <strong>Service:</strong> {item.service}
              </p>
            </li>
          );
        })}
      </ul>
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
  );
};
