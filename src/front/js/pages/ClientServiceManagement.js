import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const ClientServiceManagement = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getRequests();
    actions.clientPendingRequests(store.loggedUser.id);
  }, []);

  const PendingRequestsFilter = (request) => {
    return request["finished"] == "";
  };

  const PendingRequests = Object.values(store.pendingRequests).filter(
    PendingRequestsFilter
  );

  return (
    <div className="container py-4 px-3 text-center text-light fs-4 mt-3">
      <h1 className="my-4">Service Management</h1>
      <div className="row m-0 d-flex justify-content-center">
        {PendingRequests.length > 0 ? (
          PendingRequests.map((item, index) => {
            return (
              <div key={index}>
                {item.completed.length > 0 && item.trucker_id.length > 0 ? (
                  <div
                    className="col-9 border border-danger border-5 rounded-3 py-2 px-1 my-3 mx-auto bg-white text-dark"
                    style={{ width: "71%" }}
                  >
                    <p className="pt-2 p-0 m-0">REQUEST COMPLETED!</p>
                    <p className="pb-2 p-0 m-0">
                      Your request has been completed
                    </p>
                    <Link
                      to={`/ClientPayment/${item.trucker_id}/${item.id}`}
                      onClick={() => {
                        actions.getRequests();
                      }}
                    >
                      <button className="btn btn-warning">Pay Trucker</button>
                    </Link>
                  </div>
                ) : item.completed.length == 0 && item.trucker_id.length > 0 ? (
                  <div
                    className="col-9 border border-success border-5 rounded-3 py-2 px-1 my-3 mx-auto bg-white text-dark"
                    style={{ width: "71%" }}
                  >
                    <p className="pt-2 p-0 m-0">REQUEST ACCEPTED!</p>
                    <p className="p-0 m-0">
                      Your request has been accepted by trucker{" "}
                      {item.trucker_name}
                    </p>
                    <p className="pb-2 p-0 m-0">
                      Please contact your trucker at {item.trucker_phone} for
                      further information.
                    </p>
                  </div>
                ) : (
                  <div
                    className="col-9 border border-warning border-5 rounded-3 py-2 px-1 my-3 mx-auto bg-white text-dark"
                    style={{ width: "71%" }}
                  >
                    <p className="pt-2 p-0 m-0">REQUEST PENDING</p>
                    <p className="pb-2 p-0 m-0">You have a pending request</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div
            className="col-9 border border-info border-5 rounded-3 py-2 px-1 my-3 mx-auto bg-white text-dark"
            style={{ width: "71%" }}
          >
            <p className="pt-2 p-0 m-0">NO REQUESTS PENDING</p>
            <p className="pb-2 p-0 m-0">You have no pending requests</p>
          </div>
        )}
      </div>
      <Link to="/ClientHomePage">
        <button
          className="btn btn-warning btn-lg p-2 m-3"
          onClick={() => actions.getRequests()}
        >
          Home
        </button>
      </Link>
    </div>
  );
};
