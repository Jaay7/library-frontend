import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoPersonCircleOutline } from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import axios from "axios";

const BookStore = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["allBooks"],
    queryFn: async () => {
      const response = await axios.get(
        "https://library-management-apis.onrender.com/api/books"
      );

      return response.data;
    },
  });

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <div className="max-w-4xl lg:max-w-7xl flex items-center border-b">
          <h3 className="text-2xl font-semibold font-serif">Book Store</h3>
        </div>
        {isLoading ? (
          <div className="flex justify-center">
            <AiOutlineLoading3Quarters className="animate-spin text-xl font-semibold mt-6" />
          </div>
        ) : (
          <div className="mt-6 flex gap-2 sm:gap-6 md:gap-10 flex-wrap justify-around sm:justify-start">
            {data &&
              data.map((book) => (
                <div key={book.id}>
                  <div
                    style={{ backgroundImage: `url(${book.coverPhoto})` }}
                    className="h-64 w-40 sm:w-44 bg-cover bg-center bg-no-repeat text-ellipsis shadow-2xl rounded-sm overflow-hidden"
                  >
                    <div className="flex flex-col items-center p-2 w-full h-2/6 bg-gradient-to-t from-transparent from-10% to-black to-100%">
                      <p className="text-white font-serif">{book.name}</p>
                    </div>
                  </div>
                  <Link to={`/book/${book.id}`}>
                    <HiOutlineDotsHorizontal className="h-5 w-5 mt-2 text-gray-700" />
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookStore;
