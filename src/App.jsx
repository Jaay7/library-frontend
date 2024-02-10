import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/reader/Dashboard";
import Home from "./components/reader/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import NotFound from "./components/utils/NotFound";
import Profile from "./components/reader/Profile";
import Book from "./components/reader/Book";
import Library from "./components/reader/libraryPages/Library";
import WantToRead from "./components/reader/libraryPages/WantToRead";
import BookStore from "./components/reader/BookStore";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <BrowserRouter>
          <Routes>
            {/* {data && data.me.userType === "admin" ? (
            <>
              <Route path="/" element={<AdminDashboard />}>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<AdminHome />} />
                <Route path="/orders" element={<AdminCheckOrders />} />
                <Route path="/products" element={<AdminManageProducts />} />
                <Route path="/add-product" element={<AddNewProduct />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/order/:orderId" element={<AdminOrderView />} />
              </Route>
            </>
          ) : (
            <>
              
            </>
          )} */}
            <Route path="/" element={<Dashboard />}>
              <Route path="/" element={<Home />} />
              <Route path="/book/:bookId" element={<Book />} />
              <Route
                path="/profile"
                element={<Profile queryClient={queryClient} />}
              />
              <Route path="/library" element={<Library />} />
              <Route path="/store" element={<BookStore />} />
              <Route path="/want-to-read" element={<WantToRead />} />
              {/*   <Route path="/saved-products" element={<SavedProducts />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/my-orders" element={<Orders />} /> */}
            </Route>
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
};

export default App;
