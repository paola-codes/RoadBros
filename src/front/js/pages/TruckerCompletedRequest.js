import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const TruckerCompletedRequest = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container py-4 px-3 text-center text-light fs-4 mt-3">
      <h1 className="my-4">You have completed a request</h1>
      <ul className="list-group position-relative">
        <div className="row my-3 d-flex justify-content-center">
          <div className="col-9">
            <div className="text-start p-1">
              <div className="d-flex text-dark flex-column mx-1 mt-3 border border-warning p-3 bg-light border-4 rounded-3">
                <h5 className="text-center mb-3">
                  Your client will now rate and pay you for yor service.
                </h5>
                <p className="mx-2 m-1 mb-3 text-center">
                  <Link to="/TruckerHomePage">
                    <button
                      type="button"
                      className="btn btn-warning mt-3"
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
};
