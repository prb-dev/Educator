import { Link, useParams } from "react-router-dom";
import paymentSuccess from "../../assets/paymentSucess.png";

const ContainerDesign = {
  marginTop: "140px",
};

export default function SuccessPayment() {
  const params = useParams();
  console.log(params); // log the parameters to see what's available
  return (
    <>
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
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Your Payment was Successful.
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo"
            >
              Start the Course
            </button>
            <div className="text-center mt-3">
              <Link
                to="/"
                className=" leading-6 text-primary  hover:text-accent"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-5 text-center text-sm text-gray-500">
          Thank you for your payment.
          <p className="mt-2">We will send you a confirmation email.</p>
        </p>
      </div>
    </>
  );
}
