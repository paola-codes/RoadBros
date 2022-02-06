import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const TruckerHomePage = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getRequests();
  }, []);

  const AcceptedRequestsFilter = (request) => {
    return (
      request["trucker_id"] == `${store.loggedUser.id}` &&
      request["completed"] == ""
    );
  };

  const AcceptedRequests = Object.values(store.listOfRequests).filter(
    AcceptedRequestsFilter
  );

  return (
    <div className="container py-4 px-3 text-center text-light fs-4 my-3">
      <h1 className="text-center my-4">Home Page</h1>
      <div className="row my-3 d-flex flex-column justify-content-center">
        <Link to="/TruckerRequestsList">
          <button
            className="btn btn-warning btn-lg p-2 w-75 m-auto my-3"
            onClick={() => {
              actions.getRequests();
            }}
          >
            Requests List
          </button>
        </Link>

        {store.listOfRequests && AcceptedRequests.length > 0 ? (
          <div
            className="border mx-auto border-warning border-5 rounded-3 py-2 px-1 my-3 bg-white text-dark"
            style={{ width: "71%" }}
          >
            <p className="pt-2 p-0 m-0">REQUEST OPEN</p>
            <p className="pb-2 p-0 m-0">You have an open request</p>
            <Link to="/TruckerServiceManagement">
              <button
                className="btn btn-warning btn-lg w-75 m-auto my-3"
                onClick={() => {
                  actions.getRequests();
                }}
              >
                Service Management
              </button>
            </Link>
          </div>
        ) : (
          <div
            className="mx-auto border border-info border-5 rounded-3 py-2 px-1 my-3 bg-white text-dark"
            style={{ width: "71%" }}
          >
            <p className="pt-2 p-0 m-0">NO REQUESTS OPEN</p>
            <p className="pb-2 p-0 m-0">You have no open requests</p>
          </div>
        )}

        <Link to="/TruckerServiceHistory">
          <button
            className="btn btn-warning btn-lg p-2 w-75 m-auto my-3"
            onClick={() => {
              actions.getRequests();
            }}
          >
            Service History
          </button>
        </Link>
        <Link to="/TruckerProfile">
          <button className="btn btn-warning btn-lg p-2 w-75 m-auto my-3">
            Profile
          </button>
        </Link>
      </div>
    </div>
  );
};
