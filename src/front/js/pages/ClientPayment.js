import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { StripeCheckoutButton } from "../component/stripe-button";

export const ClientPayment = () => {
  const { store, actions } = useContext(Context);
  const [truckerRating, setTruckerRating] = useState("");
  const [hover, setHover] = useState(undefined);

  let { trucker_id } = useParams();
  let { request_id } = useParams();

  let stringRating = String(truckerRating);

  const newRating = {
    rating: stringRating,
  };
  const finished = { finished: "yes" };

  return (
    <div className="container py-4 px-3 text-center text-light fs-4 mt-3">
      <h1 className="text-center my-3 mt-4 p-0">
        Thank you for using Roadbros. <br /> How how would you rate your
        experience?
      </h1>
      <div className="row my-2 d-inline-flex justify-content-center">
        <div className="star-rating col-1 d-inline-flex justify-content-center">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={
                  index <= (hover || truckerRating)
                    ? "on starButton"
                    : "off starButton"
                }
                onClick={() => setTruckerRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(truckerRating)}
              >
                <span className="star">&#9733;</span>
              </button>
            );
          })}
        </div>
        <p className="my-4 fs-5">Your Rating is {truckerRating} Stars</p>

        <div className="col-5 mb-2">
          <button
            className="btn btn-success"
            onClick={() => {
              actions.getRequests();
              actions.updateTruckerRating(newRating, trucker_id);
              actions.finishRequest(finished, request_id);
            }}
          >
            Send Rating
          </button>
        </div>
      </div>
      <h1 className="text-center my-3 mt-4 p-0">
        Now, Please click below to pay your trucker
      </h1>
      <div className="row my-2 d-flex justify-content-center">
        <div className="col mb-2">
          <div className="my-3">
            <StripeCheckoutButton price={150} />
          </div>
        </div>
      </div>
      <Link to="/ClientServiceManagement">
        <button className="btn btn-warning m-3">Back to Home</button>
      </Link>
    </div>
  );
};
