import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import contactsService from "./services/contacts";

import Search from "./components/Search";
import Form from "./components/Form";
import Contacts from "./components/Contacts";
import Notification from "./components/Notification";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [err, setErr] = useState(false);

  // Gell all
  useEffect(() => {
    contactsService.getAll().then((response) => {
      setContacts(response.data);
    });
  }, []);

  const handleName = (e) => {
    setNewName(e.target.value);
  };

  const handleNumber = (e) => {
    setNewNumber(e.target.value);
  };

  // Add contact
  const addContact = (e) => {
    e.preventDefault();

    if (!newName || !newNumber) {
      alert(`Info is missing!`);
    }

    const newContact = {
      name: newName,
      number: newNumber,
    };

    // Check if contact exists
    const existingContact = contacts.find(
      (contact) => contact.name === newContact.name
    );

    // If true
    if (existingContact) {
      alert(`${newContact.name} already exists! Update number?`);
      const updatedContact = { ...existingContact, number: newContact.number };

      // console.log(updatedContact);

      // // Find index of existing contact
      // const index = contacts.findIndex(
      //   (contact) => contact.name === updatedContact.name
      // );

      // // Update existing contact
      // contactsService
      //   .update(index, updatedContact)
      //   .then((response) => {
      //     setContacts(
      //       contacts.map((contact, i) =>
      //         i !== index ? contact : response.data
      //       )
      //     );
      //     setMessage(`Updated ${updatedContact.name}'s number`);
      //     setTimeout(() => {
      //       setMessage(null);
      //     }, 3000);
      //   })

      contactsService.update(updatedContact).then((response) => {
        // console.log(response.data);
        setContacts(
          contacts.map((contact) =>
            contact.id !== updatedContact.id ? contact : response.data
          )
        );
        setMessage(`Updated ${updatedContact.name}'s number`);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      });
    } else {
      // Add new contact
      contactsService.add(newContact).then((response) => {
        setContacts(contacts.concat(response.data));
        console.log(response.data);
        setMessage(`Added ${newContact.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      });
    }

    // Clear inputs
    setNewName("");
    setNewNumber("");
    setErr(false);
  };

  // Delete contact
  const deleteContact = (id) => {
    contactsService.deleteContact(id).then((response) => {
      const newArr = contacts.filter((contact) => contact.id !== id);
      setContacts(newArr);
    });
  };

  // Search
  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const searchResults = contacts.filter(
    (contact) => contact.name.toLowerCase() === query.toLowerCase()
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <h3>Search contacts</h3>
      <Search handleQuery={handleQuery} searchResults={searchResults} />
      <h3>Add contact</h3>
      <Form
        onSubmit={addContact}
        name={newName}
        number={newNumber}
        handleName={handleName}
        handleNumber={handleNumber}
      />
      <h3>Contacts</h3>
      <Notification message={message} err={err} />
      <Contacts contacts={contacts} deleteContact={deleteContact} />
    </div>
  );
};

export default App;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
