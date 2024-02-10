import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "react-router-dom";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const WantToRead = () => {
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
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <div className="max-w-7xl w-full border-b">
          <h3 className="text-2xl font-semibold font-serif">Want to Read</h3>
        </div>
        {isLoading ? (
          <div className="flex justify-center">
            <AiOutlineLoading3Quarters className="animate-spin text-xl font-semibold mt-6" />
          </div>
        ) : (
          <div className="mt-6">
            {data && data.length > 0
              ? data.map((item) =>
                  item.status === "Reading" ? (
                    <React.Fragment>
                      <div
                        key={item.id}
                        style={{
                          backgroundImage: `url(${item.book.coverPhoto})`,
                        }}
                        className="h-64 w-44 bg-cover bg-center bg-no-repeat text-ellipsis shadow-2xl rounded-sm overflow-hidden"
                      >
                        <div className="flex flex-col items-center justify-center w-full h-2/6 bg-gradient-to-t from-transparent from-10% to-black to-100%">
                          <p className="text-white font-serif">
                            {item.book.name}
                          </p>
                        </div>
                      </div>
                      <Link to={`/book/${item.book.id}`}>
                        <HiOutlineDotsHorizontal className="h-5 w-5 mt-2 text-gray-700" />
                      </Link>
                    </React.Fragment>
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

export default WantToRead;
