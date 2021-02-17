import React from "react";
import Contact from "./Contact";

const Contacts = ({ contacts, deleteContact }) => {
  return (
    <ul>
      {contacts.map((contact, i) => {
        return (
          <Contact key={i} contact={contact} deleteContact={deleteContact} />
        );
      })}
      <li className="empty-flex-item"></li>
      <li className="empty-flex-item"></li>
    </ul>
  );
};

export default Contacts;
