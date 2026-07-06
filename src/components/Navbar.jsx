import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center m-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Samsung_Notes_icon.png"
          alt=""
          className="h-15 pl-3"
        />
        <p className="text-4xl pt-2">Notebase</p>
      </div>

      <div className="pt-2 gap-20 flex justify-between pr-40 text-lg">
        <NavLink to="/">
          <div className="hover:border-red-500 hover:bg-red-500 p-2 hover:text-white rounded-lg">
            Home
          </div>
        </NavLink>
        <NavLink to="/notes">
          <div className="hover:border-red-500 hover:bg-red-500 p-2 hover:text-white rounded-lg">
            Notes
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
