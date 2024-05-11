import { Link } from "react-router-dom";
import paymentSuccess from "../../assets/paymentSucess.png";
import { useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContainerDesign = {
  marginTop: "140px",
};

export default function SuccessPayment() {
  const sucessTost = () => toast.success("Enrollment Successful!");
  // const { user } = useSelector((state) => state.user);

  const sendPaymentDataTOBackend = async (paymentData) => {
    console.log("Sending payment data to backend");
    if (!paymentData) {
      console.log("No payment data found");
      return;
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8006/payment/new",
          paymentData
        );
        sucessTost();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const createNewPaymentInDb = async (paymentData) => {
    console.log(paymentData);
    console.log("Creating new payment in db");

    if (!paymentData) {
      console.log("No payment data found");
      return;
    } else {
      try {
        fetch(
          `http://localhost:80/enrollment/${paymentData.user._id}/${paymentData.course._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).catch((err) => {
          console.log(err);
        });
        sendPaymentDataTOBackend(paymentData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const sendEmail = async (payload) => {
    console.log("Sending email");
    if (!payload) {
      console.log("No payment data found");
      return;
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8007/send_email/event_handler",
          payload
        );
        console.log(response);
        //clear paymentData from local storage
        localStorage.removeItem("paymentData");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    //get paymentData from local storage
    const paymentData = localStorage.getItem("paymentData");
    if (!paymentData) {
      console.log("No payment data found");
      return;
    }
    console.log(paymentData);

    const data = JSON.parse(paymentData);

    const formattedPaymentData = {
      course: {
        _id: data.course._id,
        name: data.course.name,
      },
      user: {
        _id: data.user._id,
        name: data.user.name,
        email: data.user.email,
      },
      amount: data.amount,
    };

    const emailPayload = {
      receiverEmail: data.user.email,
      courseName: data.course.name,
      event: "ENROLL_SUCCESS",
    };

    createNewPaymentInDb(formattedPaymentData);
    // sendEmail(emailPayload);
  }, []);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div
        className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
        style={ContainerDesign}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-80 w-auto"
            src={paymentSuccess}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-700">
            Your Payment was Successful.
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo"
            >
              Start the Course
            </button>
            <div className="text-center mt-3">
              <Link
                to="/"
                className=" leading-6 text-blue-600  hover:text-green-A200"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-5 text-center text-sm text-gray-200">
          Thank you for your payment.
          <p className="mt-2">We will send you a confirmation email.</p>
        </p>
      </div>
      <ToastContainer />
    </>
  );
}
