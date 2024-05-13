import { Link, useNavigate } from "react-router-dom";
import paymentCancel from "../../assets/cancledPayment.png";
import { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const containerDesign = {
  marginTop: "200px",
};

export default function PaymentCancel() {
  let navigate = useNavigate();

  const goBack = () => {
    navigate(-3);
  };

  const unsuccessToast = () => toast.error("Payment Failed!");

  const unEnroll = async (paymentData) => {
    console.log(paymentData);
    console.log("un enroll course");

    unsuccessToast();
  };

  const sendEmail = async (payload) => {
    console.log("Sending email");
    if (!payload) {
      console.log("No payment data found");
      return;
    } else {
      try {
        const response = await axios.post(
          "http://localhost:80/notification/send_email/event_handler",
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
      event: "ENROLL_FAILED",
    };

    unEnroll(formattedPaymentData);
    sendEmail(emailPayload);
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
        className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 "
        style={containerDesign}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-80 w-auto"
            src={paymentCancel}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-700">
            Your Payment was Canceled.
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <button
              onClick={goBack}
              className="flex w-full justify-center rounded-md bg-blue-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo"
            >
              Go Back
            </button>
            <div className="text-center mt-3">
              <Link
                to="/"
                className=" leading-6 text-blue-800  hover:text-green-A200"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
        {/* <p className="mt-5 text-center text-sm text-gray-500">
          Thank you for your payment.
          <p className="mt-2">We will send you a confirmation email.</p>
        </p> */}
      </div>
    </>
  );
}
