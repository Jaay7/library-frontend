import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { HiArrowLongLeft } from "react-icons/hi2";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Book = () => {
  const { bookId } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ["book"],
    queryFn: async () => {
      const response = await axios.get(
        `https://library-management-apis.onrender.com/api/book/${bookId}`
      );

      return response.data;
    },
  });

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        {isLoading ? (
          <div className="flex justify-center">
            <AiOutlineLoading3Quarters className="animate-spin text-xl font-semibold mt-6" />
          </div>
        ) : (
          data && (
            <div>
              <div className="max-w-2xl flex flex-row items-baseline gap-x-3">
                <HiArrowLongLeft className="h-5 w-5 xl:hidden" />
                <h3 className="text-2xl font-semibold font-serif">
                  {data.name}
                </h3>
              </div>
              <p className="my-4 text-gray-700">{data.description}</p>
              <iframe
                src={data.firebaseFile}
                className="h-screen max-w-7xl w-full"
              ></iframe>
              {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <div className="max-w-7xl h-[900px] mx-auto">
                  <Viewer
                    fileUrl={data.firebaseFile}
                    httpHeaders={{
                      "Content-Type": "application/json",
                      // "Cro"
                      "Access-Control-Allow-Headers": "Range",
                    }}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                </div>
              </Worker> */}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Book;
