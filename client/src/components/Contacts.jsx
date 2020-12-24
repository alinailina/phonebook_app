import React from "react";

const Contacts = ({ contacts, deleteContact }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone number</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, i) => {
            return (
              <tr key={i}>
                <td>{contact.name}</td>
                <td>{contact.number}</td>
                <td>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete ${contact.name}?`))
                        deleteContact(contact.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Contacts;
