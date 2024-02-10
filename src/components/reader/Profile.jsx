import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoLogOutOutline, IoLockOpenOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get(
        "https://library-management-apis.onrender.com/api/currentUser",
        {
          params: { token: localStorage.getItem("token") },
        }
      );

      return response.data;
    },
  });

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
    props.queryClient.invalidateQueries();
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <div className="max-w-7xl w-full border-b">
          <h3 className="text-2xl font-semibold font-serif">Profile</h3>
        </div>
        {isLoading ? (
          <div className="flex justify-center">
            <AiOutlineLoading3Quarters className="animate-spin text-xl font-semibold mt-6" />
          </div>
        ) : (
          data && (
            <div className="mt-4">
              <div className="mt-6 divide-y">
                <dl className="divide-y">
                  <div className="px-4 py-4 pb-8 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-base font-semibold leading-6 text-gray-900">
                      Personal Information
                    </dt>
                    <dd className="mt-4 text-sm leading-6 text-gray-600 sm:col-span-2 sm:mt-0">
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
                            className="block flex-1 w-full sm:max-w-md rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 outline-0"
                            placeholder="Person"
                            disabled
                            value={data.name}
                            // onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mt-4 sm:col-span-4">
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
                            className="block flex-1 w-full sm:max-w-md rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 outline-0"
                            placeholder="Person"
                            disabled
                            value={data.username}
                            // onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mt-4 sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email
                        </label>
                        <div className="mt-2">
                          <input
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="email"
                            className="block flex-1 w-full sm:max-w-md rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 outline-0"
                            placeholder="person@example.com"
                            disabled
                            value={data.email}
                            // onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mt-4 sm:col-span-4">
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
                            className="block flex-1 w-full sm:max-w-md rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 outline-0"
                            placeholder="Devotional, Religious"
                            disabled
                            value={data.interests}
                            // onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                    </dd>
                  </div>
                </dl>
                <dl className="divide-y">
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 mt-4">
                    <dt className="text-base font-semibold leading-6 text-gray-900">
                      Notification Settings
                    </dt>
                    <dd className="mt-4 text-sm leading-6 text-gray-900 sm:col-span-2 sm:mt-0">
                      <div className="pb-8">
                        <div className="space-y-10">
                          <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">
                              By Email
                            </legend>
                            <div className="mt-6 space-y-6">
                              <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                  <input
                                    id="book-completion"
                                    name="book-completion"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 checked:ring-orange-500"
                                  />
                                </div>
                                <div className="text-sm leading-6">
                                  <label
                                    htmlFor="book-completion"
                                    className="font-medium text-gray-900"
                                  >
                                    Book Completion
                                  </label>
                                  <p className="text-gray-500">
                                    Get notified when you completed reading a
                                    book.
                                  </p>
                                </div>
                              </div>
                              <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                  <input
                                    id="want-to-read"
                                    name="want-to-read"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 checked:ring-orange-500"
                                  />
                                </div>
                                <div className="text-sm leading-6">
                                  <label
                                    htmlFor="want-to-read"
                                    className="font-medium text-gray-900"
                                  >
                                    Want to Read
                                  </label>
                                  <p className="text-gray-500">
                                    Get notified when you started reading a
                                    book.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </fieldset>
                          <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">
                              In-app Notifications
                            </legend>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                              These will be shown on this window.
                            </p>
                            <div className="mt-6 space-y-6">
                              <div className="flex items-center gap-x-3">
                                <input
                                  id="push-everything"
                                  name="push-notifications"
                                  type="radio"
                                  className="h-4 w-4 appearance-none border checked:border-[5px] border-gray-300 rounded-full bg-white checked:border-orange-500 text-orange-500"
                                />
                                <label
                                  htmlFor="push-everything"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Everything
                                </label>
                              </div>
                              <div className="flex items-center gap-x-3">
                                <input
                                  id="push-email"
                                  name="push-notifications"
                                  type="radio"
                                  className="h-4 w-4 appearance-none border checked:border-[5px] border-gray-300 rounded-full bg-white checked:border-orange-500 text-orange-500"
                                />
                                <label
                                  htmlFor="push-email"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Same as email
                                </label>
                              </div>
                              <div className="flex items-center gap-x-3">
                                <input
                                  id="push-nothing"
                                  name="push-notifications"
                                  type="radio"
                                  className="h-4 w-4 appearance-none border checked:border-[5px] border-gray-300 rounded-full bg-white checked:border-orange-500 text-orange-500"
                                />
                                <label
                                  htmlFor="push-nothing"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  No push notifications
                                </label>
                              </div>
                            </div>
                          </fieldset>
                        </div>
                      </div>
                    </dd>
                  </div>
                </dl>
                <dl className="divide-y">
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 mt-4">
                    <dt className="text-base font-semibold leading-6 text-gray-900">
                      Account Settings
                    </dt>
                    <dd className="mt-4 text-sm leading-6 text-gray-900 sm:col-span-2 sm:mt-0">
                      <div className="sm:col-span-4 flex items-center gap-x-2">
                        <IoLockOpenOutline className="h-5 w-5" />
                        <p className="block text-sm font-medium leading-6">
                          Change Password
                        </p>
                      </div>
                      <div
                        onClick={onLogout}
                        className="mt-6 flex items-center gap-x-2 text-orange-500 cursor-pointer w-fit"
                      >
                        <IoLogOutOutline className="h-5 w-5" />
                        <p className="block text-sm font-medium leading-6">
                          Sign Out
                        </p>
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Profile;
