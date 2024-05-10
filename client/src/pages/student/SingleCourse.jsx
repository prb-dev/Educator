//get data form state
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const courseContainer = {
  height: "100vh",
};

export default function SingleCourse() {
  const { user } = useSelector((state) => state.user);

  const location = useLocation();
  const courseData = location.state.course;

  const courseInfo = {
    _id: courseData.id,
    price: courseData.price,
    title: courseData.name,
    description: courseData.description,
  };

  const userData = {
    _id: user.user._id,
    name: user.user.username,
    email: user.user.email,
  };

  console.log(userData);

  const enrollmentCheck = () => {
    fetch(
      `http://localhost:80/enrollment/validate/${userData._id}/${courseInfo._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.errorMessage) {
          console.log(data.errorMessage);
          return;
        } else {
          handlePayment();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePayment = () => {
    console.log("Payment initiated");
    const data = {
      course: {
        _id: courseInfo._id,
        name: courseInfo.title,
      },
      user: {
        _id: userData._id,
        name: userData.name,
        email: userData.email,
      },
      amount: courseData.price,
      successEndPoint: "success-payment",
      cancelEndPoint: "payment-cancel",
    };

    //store data in loacal storage
    localStorage.setItem("paymentData", JSON.stringify(data));

    try {
      const response = axios.post("http://localhost:8006/payment/stripe", data);

      response.then((res) => {
        console.log(res);

        window.location.href = res.data.url;
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={courseContainer}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-slate-700 mb-3 text-left">
              {courseData.name}
            </h3>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src="https://th.bing.com/th/id/OIP.mIMWbiW3KBnfVe-I8MNXdwHaDU?rs=1&pid=ImgDetMain"
                alt="Two each of gray, white, and black shirts laying flat."
                className="h-full w-full object-cover object-center"
              ></img>
            </div>
            <p className="mt-6 text-base leading-7 text-slate-700">
              {courseData.description}
            </p>
            <p className="mt-6 text-xl leading-7 text-slate-700">
              {courseData.instructor}
            </p>
          </div>

          <div className="-mt-2 p-10 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0 flex justify-center items-center">
            <div className="rounded-2xl h-full bg-grayLight py-10 text-center ring-1 ring-inset ring-gray lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-slate-700">
                  Pay once, own it forever
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-slate-700">
                    ${courseData.price}
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-slate-700">
                    USD
                  </span>
                </p>
                <button
                  onClick={enrollmentCheck}
                  className="mt-10 block w-full rounded-md  bg-blue-700 px-3 py-2 text-center text-sm font-semibold text-slate-200 shadow-sm hover:bg-green-500 ring-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                >
                  Get Enroll
                </button>
                <p className="mt-6 text-xs leading-5 text-slate-700">
                  By completing your purchase you agree to these Terms of
                  Service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
