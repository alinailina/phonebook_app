import React from "react";
import { IoMdClose } from "react-icons/io";

const Contact = ({ contact, deleteContact }) => {
  console.log(contact.path);
  console.log(window.location.origin);
  return (
    <li>
      <button
        onClick={() => {
          if (window.confirm(`Delete ${contact.name}?`))
            deleteContact(contact.id);
        }}
      >
        <IoMdClose />
      </button>
      <div>
        <img src={window.location.origin + `${contact.path}`} alt="profile" />
      </div>
      <div>
        <h3>{contact.name}</h3>
        <p>{contact.number}</p>
      </div>
    </li>
  );
};

export default Contact;
