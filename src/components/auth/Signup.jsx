import React from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import NotificationBox from "../utils/NotificationBox";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [viewPassword, setViewPassword] = React.useState(false);
  const [interests, setInterests] = React.useState("");

  const [notification, setNotification] = React.useState({
    open: false,
    for: "",
    title: "",
    description: "",
  });

  const mutation = useMutation({
    mutationFn: (newUser) => {
      return axios.post(
        "https://library-management-apis.onrender.com/api/signup",
        newUser,
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
        title: "Registration successful!",
        description: "You will be redirected to home page.",
      });
    },
    onError: (error) => {
      setLoading(false);
      setNotification({
        open: true,
        for: "fail",
        title: "Registration failed!",
        description: error.message,
      });
    },
  });

  const onSubmit = async () => {
    setLoading(true);
    mutation.mutate({
      name: name,
      username: username,
      email: email,
      password: password,
      interests: interests,
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
            Create an account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to={"/signin"}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
          {/* form starts */}
          <div>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Credentials
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  This information will help you to sign in to the application.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          autoComplete="email"
                          className="block flex-1 border-0 bg-transparent p-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-0"
                          placeholder="person@example.com"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="relative mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type={viewPassword ? "text" : "password"}
                          name="password"
                          id="password"
                          autoComplete="password"
                          className="block flex-1 border-0 bg-transparent p-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-0"
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
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Please add username, name and your interests.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-0"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Username
                    </label>
                    <div className="mt-2">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-0"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="interests"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Interests
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="interests"
                        id="interests"
                        autoComplete="interests"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-0"
                        onChange={(e) => setInterests(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                disabled={!email && !password}
                onClick={onSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin text-xl font-bold" />
                ) : (
                  "Sign up"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden min-h-full flex-1 flex-col justify-center col-span-1 lg:flex">
        <img
          src={
            "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          className="h-full w-full object-cover object-center"
        />
      </div>
      <NotificationBox notification={notification} />
    </div>
  );
};

export default Signup;
