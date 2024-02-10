import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoPersonCircleOutline } from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Home = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["book"],
    queryFn: async () => {
      const response = await axios.get(
        "https://library-management-apis.onrender.com/api/library",
        {
          params: { token: localStorage.getItem("token") },
        }
      );

      return response.data;
    },
  });

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <div className="max-w-4xl lg:max-w-7xl flex items-center border-b">
          <h3 className="text-2xl font-semibold font-serif">Read Now</h3>
          <span className="flex grow"></span>
          <Link
            to={"/profile"}
            className={classNames(
              location.pathname === "/profile"
                ? "text-orange-500"
                : "text-gray-600 hover:text-gray-500",
              "-m-2 p-2 font-medium text-sm flex gap-x-2 items-center lg:hidden"
            )}
          >
            <IoPersonCircleOutline className="h-6 w-6" />
            <span className="hidden sm:block">Profile</span>
          </Link>
        </div>
        {isLoading ? (
          <div className="flex justify-center">
            <AiOutlineLoading3Quarters className="animate-spin text-xl font-semibold mt-6" />
          </div>
        ) : (
          <div className="mt-6 flex gap-2 sm:gap-6 md:gap-10 flex-wrap justify-around sm:justify-start">
            {data && data.length > 0
              ? data.map((item) =>
                  item.status === "Reading" ? (
                    <div key={item.id}>
                      <div
                        style={{
                          backgroundImage: `url(${item.book.coverPhoto})`,
                        }}
                        className="h-64 w-40 sm:w-44 bg-cover bg-center bg-no-repeat text-ellipsis shadow-2xl rounded-sm overflow-hidden"
                      >
                        <div className="flex flex-col items-center p-2 w-full h-2/6 bg-gradient-to-t from-transparent from-10% to-black to-100%">
                          <p className="text-white font-serif">
                            {item.book.name}
                          </p>
                        </div>
                      </div>
                      <Link to={`/book/${item.book.id}`}>
                        <HiOutlineDotsHorizontal className="h-5 w-5 mt-2 text-gray-700" />
                      </Link>
                    </div>
                  ) : (
                    ""
                  )
                )
              : "No data available"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
