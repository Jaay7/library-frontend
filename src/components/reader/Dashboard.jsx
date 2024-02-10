import React from "react";
import {
  HiBookOpen,
  HiOutlineBookOpen,
  HiChevronDown,
  HiMagnifyingGlass,
  HiOutlineShoppingBag,
  HiXMark,
  HiPlus,
  HiMinus,
  HiOutlineBookmark,
  HiOutlineShoppingCart,
} from "react-icons/hi2";
import {
  IoLibrary,
  IoLibraryOutline,
  IoBagHandle,
  IoBagHandleOutline,
  IoArrowForwardCircleOutline,
  IoCheckmarkCircleOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import { BsTextParagraph } from "react-icons/bs";

import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import Footer from "./utils/Footer";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSideMenu, setOpenSideMenu] = React.useState(false);

  const { isLoading, error, isError, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get(
        "https://library-management-apis.onrender.com/api/currentUser",
        {
          params: { token: localStorage.getItem("token") },
        }
      );

      return response;
    },
  });

  if (
    localStorage.getItem("token") === undefined ||
    localStorage.getItem("token") === null ||
    localStorage.getItem("token") === ""
  ) {
    return <Navigate to="/signin" />;
  }

  if (isError && error.message.includes("500")) {
    console.log(error.message);
    localStorage.removeItem("token");
    return <Navigate to="/signin" />;
  }

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="relative h-screen">
      <div className="relative grid grid-cols-10 h-full" aria-modal="true">
        {/* <div
          className={classNames(
            openSideMenu ? "" : "hidden",
            "fixed inset-0 bg-black bg-opacity-25 backdrop-animation"
          )}
        ></div> */}

        <div className="h-screen fixed inset-0 hidden xl:flex sidenav col-span-2">
          <div className="relative flex w-full max-w-[280px] flex-col overflow-y-auto bg-zinc-100 pb-6 border-r-2 border-zinc-200">
            <div className="flex mx-4 p-1.5 mt-6 items-center gap-x-2 text-gray-600 bg-zinc-200 rounded-md">
              <HiMagnifyingGlass className="h-5 w-5" />
              <input
                type="search"
                className="bg-transparent w-full outline-none border-none"
                id="search"
                name="search"
                placeholder="Search"
              />
            </div>

            <div className="space-y-5 px-4 py-6">
              <div className="text-xl text-black font-bold">
                <span>Books</span>
              </div>
              <div className="flow-root">
                <Link
                  to={"/"}
                  className={classNames(
                    location.pathname === "/"
                      ? "text-orange-500"
                      : "text-gray-600 hover:text-gray-500",
                    "-m-2 p-2 text-sm flex font-medium gap-x-2 items-center"
                  )}
                >
                  <HiOutlineBookOpen className="h-5 w-5" />
                  <span className="hidden sm:block">Read Now</span>
                </Link>
              </div>
              <div className="flow-root">
                <Link
                  to={"/store"}
                  className={classNames(
                    location.pathname === "/store"
                      ? "text-orange-500"
                      : "text-gray-600 hover:text-gray-500",
                    "-m-2 p-2 text-sm flex font-medium gap-x-2 items-center"
                  )}
                >
                  <IoBagHandleOutline className="h-5 w-5" />
                  <span className="hidden sm:block">Book Store</span>
                </Link>
              </div>

              <div className="text-xl text-black font-bold">
                <span>Library</span>
              </div>

              <div className="flow-root">
                <Link
                  to={"/library"}
                  className={classNames(
                    location.pathname === "/library"
                      ? "text-orange-500"
                      : "text-gray-600 hover:text-gray-500",
                    "-m-2 p-2 text-sm flex font-medium gap-x-2 items-center"
                  )}
                >
                  <IoLibraryOutline className="h-5 w-5" />
                  <span className="hidden sm:block">All</span>
                </Link>
              </div>
              <div className="flow-root">
                <Link
                  to={"/want-to-read"}
                  className={classNames(
                    location.pathname === "/want-to-read"
                      ? "text-orange-500"
                      : "text-gray-600 hover:text-gray-500",
                    "-m-2 p-2 text-sm flex font-medium gap-x-2 items-center"
                  )}
                >
                  <IoArrowForwardCircleOutline className="h-5 w-5" />
                  <span className="hidden sm:block">Want to Read</span>
                </Link>
              </div>
              <div className="flow-root">
                <Link
                  to={"/finished"}
                  className={classNames(
                    location.pathname === "/finished"
                      ? "text-orange-500"
                      : "text-gray-600 hover:text-gray-500",
                    "-m-2 p-2 text-sm flex font-medium gap-x-2 items-center"
                  )}
                >
                  <IoCheckmarkCircleOutline className="h-5 w-5" />
                  <span className="hidden sm:block">Finished</span>
                </Link>
              </div>

              <div className="text-xl text-black font-bold">
                <span>My Collections</span>
              </div>

              <div className="flow-root">
                <Link
                  to={"/collections"}
                  className={classNames(
                    location.pathname === "/collections"
                      ? "text-orange-500"
                      : "text-gray-600 hover:text-gray-500",
                    "-m-2 p-2 text-sm flex font-medium gap-x-2 items-center"
                  )}
                >
                  <BsTextParagraph className="h-5 w-5" />
                  <span className="hidden sm:block">Fiction</span>
                </Link>
              </div>
            </div>
            <span className="flex grow"></span>
            <div className="space-y-6 px-4 py-6">
              {localStorage.getItem("token") ? (
                <React.Fragment>
                  <div className="flow-root">
                    <Link
                      to={"/profile"}
                      className={classNames(
                        location.pathname === "/profile"
                          ? "text-orange-500"
                          : "text-gray-600 hover:text-gray-500",
                        "-m-2 p-2 font-medium text-sm flex gap-x-2 items-center"
                      )}
                    >
                      <IoPersonCircleOutline className="h-7 w-7" />
                      <span className="hidden sm:block">Profile</span>
                    </Link>
                  </div>
                  {/* <div className="flow-root">
                    <button
                      onClick={onLogout}
                      className="-m-2 block p-2 font-medium text-sm text-gray-900"
                    >
                      Logout
                    </button>
                  </div> */}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="flow-root">
                    <Link
                      to={"/signin"}
                      className="-m-2 block p-2 font-medium text-sm text-gray-900"
                    >
                      Sign in
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link
                      to={"/signup"}
                      className="-m-2 block p-2 font-medium text-sm text-gray-900"
                    >
                      Create account
                    </Link>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
        <div className="h-screen inset-0 hidden xl:flex sidenav col-span-2"></div>
        <div className="col-span-10 z-10 xl:col-span-8">
          {/* lesser */}
          <header className="xl:hidden block">
            <nav aria-label="Top" className="mx-auto max-w-7xl">
              <div className="border-b border-gray-200 px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center">
                  <div className="lg:ml-8 block lg:self-stretch">
                    <div className="flex h-full space-x-8">
                      <Link
                        to="/"
                        className={classNames(
                          location.pathname === "/"
                            ? "text-orange-500"
                            : "text-gray-400 hover:text-gray-500",
                          "relative z-10 -mb-px flex flex-row items-center pt-px text-sm transition-colors duration-200 ease-out capitalize gap-x-1"
                        )}
                      >
                        <HiBookOpen className="h-5 w-5" />
                        <span className="hidden sm:block">Read Now</span>
                      </Link>
                      <Link
                        to="/library"
                        className={classNames(
                          location.pathname === "/library"
                            ? "text-orange-500"
                            : "text-gray-400 hover:text-gray-500",
                          "relative z-10 -mb-px flex flex-row items-center pt-px text-sm transition-colors duration-200 ease-out capitalize gap-x-1"
                        )}
                      >
                        <IoLibrary className="h-5 w-5" />
                        <span className="hidden sm:block">Library</span>
                      </Link>
                      <Link
                        to="/store"
                        className={classNames(
                          location.pathname === "/store"
                            ? "text-orange-500"
                            : "text-gray-400 hover:text-gray-500",
                          "relative z-10 -mb-px flex flex-row items-center pt-px text-sm transition-colors duration-200 ease-out capitalize gap-x-1"
                        )}
                      >
                        <IoBagHandle className="h-5 w-5" />
                        <span className="hidden sm:block">Book Store</span>
                      </Link>
                      <Link
                        to="/search"
                        className={classNames(
                          location.pathname === "/search"
                            ? "text-orange-500"
                            : "text-gray-400 hover:text-gray-500",
                          "relative z-10 -mb-px flex flex-row items-center pt-px text-sm transition-colors duration-200 ease-out capitalize gap-x-1"
                        )}
                      >
                        <HiMagnifyingGlass className="h-5 w-5" />
                        <span className="hidden sm:block">Search</span>
                      </Link>
                    </div>
                  </div>

                  <div className="ml-auto flex items-center">
                    <div className="flex flex-1 items-center justify-end space-x-6">
                      {localStorage.getItem("token") ? (
                        ""
                      ) : (
                        <React.Fragment>
                          <Link
                            to={"/signin"}
                            className="text-sm font-medium text-gray-700 hover:text-gray-800"
                          >
                            Sign in
                          </Link>
                          <span
                            className="h-6 w-px bg-gray-200"
                            aria-hidden="true"
                          ></span>
                          <Link
                            to={"/signup"}
                            className="text-sm font-medium text-gray-700 hover:text-gray-800"
                          >
                            Create account
                          </Link>
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </header>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div>
      <Header />
      {/* <Outlet /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Dashboard;
