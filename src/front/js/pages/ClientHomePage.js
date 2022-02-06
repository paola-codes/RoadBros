import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const ClientHomePage = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getRequests();
  }, []);

  const PendingRequestsFilter = (request) => {
    return (
      request["user_id"] == `${store.loggedUser.id}` &&
      request["finished"] == ""
    );
  };

  const PendingRequests = Object.values(store.listOfRequests).filter(
    PendingRequestsFilter
  );

  return (
    <div className="container py-4 px-3 text-center text-light fs-4 mt-3">
      <h1 className="my-4">Home Page</h1>
      <div className="row m-0 d-flex justify-content-center">
        <Link to="/ClientRequestHelp">
          <button
            className="btn btn-warning btn-lg p-2 w-75 m-auto my-3"
            onClick={() => actions.getVehicles(store.loggedUser.id)}
          >
            Request Help
          </button>
        </Link>
      </div>

      {PendingRequests.length > 0 ? (
        <div
          className="border mx-auto border-warning border-5 rounded-3 py-2 px-1 my-3 bg-white text-dark"
          style={{ width: "71%" }}
        >
          <p className="pt-2 p-0 m-0">REQUEST ACTIVE</p>
          <p className="pb-2 p-0 m-0">You have an active request</p>
          <Link to="/ClientServiceManagement">
            <button className="btn btn-warning btn-lg w-75 m-auto my-3">
              Service Management
            </button>
          </Link>
        </div>
      ) : (
        <div
          className="mx-auto border border-info border-5 rounded-3 py-2 px-1 my-3 bg-white text-dark"
          style={{ width: "71%" }}
        >
          <p className="pt-2 p-0 m-0">NO REQUESTS ACTIVE</p>
          <p className="pb-2 p-0 m-0">You have no active requests</p>
        </div>
      )}

      <div className="row m-0 d-flex flex-column justify-content-center">
        <Link to="/ClientVehiclesList">
          <button
            className="btn btn-warning btn-lg p-2 w-75 m-auto my-3"
            onClick={() => actions.getVehicles(store.loggedUser.id)}
          >
            Vehicles List
          </button>
        </Link>
        <Link to="/ClientServiceHistory">
          <button
            className="btn btn-warning btn-lg w-75 m-auto my-3"
            onClick={() => actions.getRequests()}
          >
            Service History
          </button>
        </Link>
        <Link to="/ClientProfile">
          <button className="btn btn-warning btn-lg p-2 w-75 m-auto my-3">
            Profile
          </button>
        </Link>
      </div>
    </div>
  );
};
