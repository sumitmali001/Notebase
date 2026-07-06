import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Notes from "./components/Notes";
import ViewNotes from "./components/ViewNotes";
import { ToastContainer, toast } from "react-toastify";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/notes",
    element: (
      <div>
        <Navbar />
        <Notes />
      </div>
    ),
  },
  {
    path: "/notes/:id",
    element: (
      <div>
        <Navbar />
        <ViewNotes />
      </div>
    ),
  },
]);
const App = () => {
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
        closeButton={false}
      />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
