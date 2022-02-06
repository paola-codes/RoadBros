import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const TruckerServiceManagement = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getRequests();
  }, []);

  const AcceptedRequestsFilter = (request) => {
    return (
      request["completed"] == "" &&
      request["trucker_id"] == `${store.loggedUser.id}`
    );
  };

  const AcceptedRequests = Object.values(store.listOfRequests).filter(
    AcceptedRequestsFilter
  );

  const completed = {
    completed: "yes",
  };

  return (
    <div className="container py-4 px-3 text-center text-light fs-4 mt-3">
      <h1 className="my-4">Manage your Service</h1>
      <ul className="list-group position-relative">
        <div className="row my-3 d-flex justify-content-center">
          <div className="col-9">
            <div className="text-start p-1">
              {store.listOfRequests.length > 0 ? (
                AcceptedRequests.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="d-flex text-dark flex-column mx-1 mt-3 border border-warning p-3 bg-light border-4 rounded-3"
                    >
                      <h3 className="text-center mb-3">PENDING REQUEST</h3>
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
                      <p className="mx-2 m-1 mb-3 text-start">
                        <Link to="/TruckerCompletedRequest">
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => {
                              actions.getRequests();
                              actions.completeRequest(completed, item.id);
                            }}
                          >
                            End Service
                          </button>
                        </Link>
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="container py-4 px-3 text-center bg-light text-dark fs-4 mt-3 border border-info border-4 rounded-3">
                  <h1 className="my-4">No Active Service at the Time</h1>
                </div>
              )}
            </div>
          </div>
        </div>
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
