import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const TruckerAcceptedRequest = () => {
  const { store, actions } = useContext(Context);

  const { id } = useParams();

  let request = store.listOfRequests.find((item, index) => {
    if (item.id == id) {
      return item;
    }
  });

  if (request) {
    return (
      <div className="container py-4 px-3 text-center text-light fs-4 mt-3">
        <h1 className="my-4">You have accepted a request</h1>
        <ul className="list-group position-relative">
          <div className="row my-3 d-flex justify-content-center">
            <div className="col-9">
              <div className="text-start p-1">
                <div className="d-flex text-dark flex-column mx-1 mt-3 border border-warning p-3 bg-light border-4 rounded-3">
                  <h5 className="text-center mb-3">
                    Thank you for helping others, here is the information about
                    your client:
                  </h5>
                  <p className="mx-2 m-1 text-start">
                    <strong>Full Name:</strong> {request.client_name}
                  </p>
                  <p className="mx-2 m-1 text-start">
                    <strong>Phone:</strong> {request.client_phone}
                  </p>
                  <p className="mx-2 m-1 text-start">
                    <strong>Zip Code:</strong> {request.zip_code}
                  </p>
                  <p className="mx-2 m-1 text-start">
                    <strong>Vehicle:</strong> {request.vehicle}
                  </p>
                  <p className="mx-2 m-1 mb-3 text-start">
                    <strong>Service:</strong> {request.service}
                  </p>
                  <p className="mx-2 m-1 mb-3 text-center">
                    <Link to="/TruckerServiceManagement">
                      <button
                        type="button"
                        className="btn btn-warning m-1"
                        onClick={() => {
                          actions.getRequests();
                        }}
                      >
                        Manage Service
                      </button>
                    </Link>
                    <Link to="/TruckerHomePage">
                      <button
                        type="button"
                        className="btn btn-dark m-1"
                        onClick={() => {
                          actions.getRequests();
                        }}
                      >
                        Back to Home
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
    );
  }
  return <h1>Loading</h1>;
};
