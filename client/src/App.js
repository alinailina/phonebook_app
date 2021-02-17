import React, { useEffect, useState } from "react";
import contactsService from "./services/contacts";

import Navbar from "./components/Navbar";
import Form from "./components/Form";
import Contacts from "./components/Contacts";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [err, setErr] = useState(false);

  // Gell contacts
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

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  // Add contact
  const addContact = (e) => {
    e.preventDefault();

    if (!newName || !newNumber || !file) {
      alert("Info is missing!");
    }

    let formData = new FormData();

    formData.append("name", newName);
    formData.append("number", newNumber);
    formData.append("image", file);
    // console.log(formData);

    // Check if contact exists
    const existingContact = contacts.find(
      (contact) => contact.name === formData.name
    );

    if (existingContact) {
      alert(`${formData.name} already exists! Update number?`);
      const updatedContact = { ...existingContact, number: formData.name };

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
      contactsService.add(formData).then((response) => {
        setContacts(contacts.concat(response.data));
        console.log(response.data);
        setMessage(`Added ${formData.name}`);
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

  // Delete
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

  const searchResults = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="App">
      <Navbar handleQuery={handleQuery} message={message} err={err} />
      <main>
        <aside>
          <Form
            onSubmit={addContact}
            name={newName}
            number={newNumber}
            handleName={handleName}
            handleNumber={handleNumber}
            handleUpload={handleUpload}
          />
        </aside>
        <Contacts contacts={searchResults} deleteContact={deleteContact} />
      </main>
    </div>
  );
};

export default App;
