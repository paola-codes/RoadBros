import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const TruckerRequestsList = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getRequests();
  }, []);

  const accepted = {
    trucker_id: store.loggedUser.id,
    trucker_name: store.loggedUser.full_name,
    trucker_phone: store.loggedUser.phone,
  };

  const filteredRequests = (request) => {
    return request["trucker_id"] == "" && request["trucker_name"] == "";
  };

  const filteredList = Object.values(store.listOfRequests).filter(
    filteredRequests
  );

  console.log("Available for Requests List", filteredList);

  const [zipCode, setzipCode] = useState("");

  return (
    <div className="container p-4 text-center text-light fs-6 mt-3">
      <h1 className="text-center my-4">Requests List</h1>
      <ul
        className="list-group position-relative mx-auto"
        style={{ width: "80%" }}
      >
        <div className="input-group mb-3 m-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by Zip Code"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            onChange={(e) => setzipCode(e.target.value)}
          />
        </div>
        {store.listOfRequests.length > 0
          ? !zipCode
            ? filteredList.map((item, index) => {
                return (
                  <li
                    className="list-group-item d-flex flex-column mx-1 mt-3 shadow-lg border border-warning border-4 rounded-3"
                    key={index}
                  >
                    <p className="mx-2 m-1 text-start">
                      <strong>Full Name:</strong> {item.client_name}
                    </p>
                    <p className="mx-2 m-1 text-start">
                      <strong>Phone:</strong> {item.client_phone}
                    </p>
                    <p className="mx-2 m-1 text-start">
                      <strong>Zip Code:</strong> {item.zip_code}
                    </p>
                    <p className="mx-2 m-1 text-start">
                      <strong>Vehicle:</strong> {item.vehicle}
                    </p>
                    <p className="mx-2 m-1 mb-3 text-start">
                      <strong>Service:</strong> {item.service}
                    </p>
                    <Link to={`/TruckerAcceptedRequest/${item.id}`}>
                      <button
                        className="btn btn-success mx-2 mb-1 px-2"
                        onClick={() => {
                          actions.getRequests();
                          actions.acceptRequest(accepted, item.id);
                        }}
                      >
                        Accept
                      </button>
                    </Link>
                  </li>
                );
              })
            : filteredList
                .filter((value, index) => value.zip_code.includes(zipCode))
                .map((item, index) => {
                  return (
                    <li
                      className="list-group-item d-flex flex-column mx-1 mt-3 shadow-lg border border-warning border-4 rounded-3"
                      key={index}
                    >
                      <p className="mx-2 m-1 text-start">
                        <strong>Full Name:</strong> {item.client_name}
                      </p>
                      <p className="mx-2 m-1 text-start">
                        <strong>Phone:</strong> {item.client_phone}
                      </p>
                      <p className="mx-2 m-1 text-start">
                        <strong>Zip Code:</strong> {item.zip_code}
                      </p>
                      <p className="mx-2 m-1 text-start">
                        <strong>Vehicle:</strong> {item.vehicle}
                      </p>
                      <p className="mx-2 m-1 mb-3 text-start">
                        <strong>Service:</strong> {item.service}
                      </p>
                      <Link to={`/TruckerAcceptedRequest/${item.id}`}>
                        <button
                          className="btn btn-success mx-2 mb-1 px-2"
                          onClick={() => {
                            actions.getRequests();
                            actions.acceptRequest(accepted, item.id);
                          }}
                        >
                          Accept
                        </button>
                      </Link>
                    </li>
                  );
                })
          : "Loading..."}
      </ul>

      <Link to="/TruckerHomePage">
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
