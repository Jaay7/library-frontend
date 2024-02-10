import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import NotificationBox from "../utils/NotificationBox";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [viewPassword, setViewPassword] = React.useState(false);

  const [notification, setNotification] = React.useState({
    open: false,
    for: "",
    title: "",
    description: "",
  });

  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return axios.post(
        "https://library-management-apis.onrender.com/api/login",
        newTodo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
    onSuccess: (response) => {
      localStorage.setItem("token", response.data);
      setLoading(false);
      setNotification({
        open: true,
        for: "success",
        title: "Login successful!",
        description: "You will be redirected to home page.",
      });
    },
    onError: (error) => {
      setLoading(false);
      setNotification({
        open: true,
        for: "fail",
        title: "Login failed!",
        description: error.message,
      });
    },
  });

  const onSubmit = () => {
    setLoading(true);
    mutation.mutate({
      email: email,
      password: password,
    });
  };

  React.useEffect(() => {
    if (notification.open) {
      setTimeout(() => {
        setNotification({
          open: false,
          for: "",
          title: "",
          description: "",
        });
      }, 2500);
    }
  }, [notification]);

  if (localStorage.getItem("token") && localStorage.getItem("token") !== "") {
    return <Navigate to="/" />;
  }

  return (
    <div className="grid min-h-screen flex-1 grid-cols-1 lg:grid-cols-2">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 col-span-1">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              to={"/signup"}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-0"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="relative mt-2">
                <input
                  id="password"
                  name="password"
                  type={viewPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-0"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center transition-all duration-75 pr-2 cursor-pointer"
                  onClick={() => setViewPassword(!viewPassword)}
                >
                  {viewPassword ? <RxEyeOpen /> : <RxEyeClosed />}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-checkbox"
                  name={"Remember me"}
                  type="checkbox"
                  defaultChecked={false}
                  className="h-4 w-4 rounded border-gray-200 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor={"remember-checkbox"}
                  className="ml-3 min-w-0 flex-1 text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={!email && !password}
                onClick={onSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin text-xl font-bold" />
                ) : (
                  "Sign in"
                )}
              </button>

              <div className="text-xs text-gray-500 mt-3">
                <p>Email: jayakrishna.madem@gmail.com</p>
                <p>Password: Books@777</p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-1 items-center space-x-3 sm:space-x-6">
            <span className="h-px w-full bg-gray-200" aria-hidden="true"></span>
            <p className="text-sm font-medium text-gray-700 w-full">
              Or continue with
            </p>
            <span className="h-px w-full bg-gray-200" aria-hidden="true"></span>
          </div>
          <div className="mt-8 flex flex-1 items-center space-x-6">
            <button className="w-full flex gap-x-2 p-2 items-center justify-center text-sm font-semibold shadow-sm outline-none rounded-md border text-gray-800">
              <FcGoogle className="h-5 w-5" /> Google
            </button>
            <button className="w-full flex gap-x-2 p-2 items-center justify-center text-sm font-semibold shadow-sm outline-none rounded-md border border-[#1877F2] bg-[#1877F2] text-white">
              <FaFacebookSquare className="h-5 w-5" /> Facebook
            </button>
          </div>
        </div>
      </div>
      <div className="hidden h-screen flex-1 flex-col justify-center col-span-1 lg:flex">
        <img
          src={
            "https://images.unsplash.com/photo-1600431521340-491eca880813?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800"
          }
          className="h-full w-full object-cover object-center"
        />
      </div>
      <NotificationBox notification={notification} />
    </div>
  );
};

export default Login;
