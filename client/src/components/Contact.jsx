import React from "react";
import { IoMdClose } from "react-icons/io";

const Contact = ({ contact, deleteContact }) => {
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
      <div
        style={{
          backgroundImage: `url("${window.location.origin + contact.path}")`,
        }}
      ></div>
      <div>
        <h3>{contact.name}</h3>
        <p>{contact.number}</p>
      </div>
    </li>
  );
};

export default Contact;
