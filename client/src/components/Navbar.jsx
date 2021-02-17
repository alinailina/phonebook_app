import React from "react";
import { BiSearch } from "react-icons/bi";
import Notification from "./Notification";

const Navbar = ({ searchQuery, handleQuery, message, err }) => {
  return (
    <nav>
      <h1>
        Phonebook
        <span>
          Notification:
          <Notification message={message} err={err} />
        </span>
      </h1>
      <Notification />
      <label>
        <span>
          <BiSearch />
        </span>
        <input type="text" value={searchQuery} onChange={handleQuery} />
      </label>
    </nav>
  );
};

export default Navbar;
