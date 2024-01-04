import React from "react";
import "./App.css";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";

const stripePromise = loadStripe("<your public key here>");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });


    if (!error) {
      // console.log(paymentMethod)
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post(
          "http://localhost:3001/api/checkout",
          {
            id,
            amount: 10000, //cents
          }
        );
        console.log(data);

        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  console.log(!stripe);

  return (
    <form className="card card-body" onSubmit={handleSubmit}>
      {/* Product Information */}
      <img
        src="https://imgs.search.brave.com/jc5jP2sRicpRh5n14zFnqLCXvxMwxNkJBacUFfZh41w/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9sb2dv/dHlwLnVzL2ZpbGUv/c3RyaXBlLnN2Zw.svg"
        alt="Corsair Gaming Keyboard RGB"
        className="img-fluid"
      />

      <h3 className="text-center my-2">Price: 100$</h3>

      {/* User Card Input */}
      <div className="form-group">
        <CardElement />
      </div>

      <button disabled={!stripe} className="btn btn-success">
         (
          "Buy"
        )
      </button>
    </form>
  );
};

function StripePaymentApp() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row h-100">
          <div className="col-md-4 offset-md-4 h-100">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default StripePaymentApp;
