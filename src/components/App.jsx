import React, { useState, useEffect } from "react";
import Form from './Form/Form';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contacts from './Contact/Contact';
import Filter from './Filter/Filter';
import css from "./App.css";

const App = () => {
  const [contacts, setContacts] = useState([
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ]);

  const [filter, setFilter] = useState("");

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const getSubmitData = (data) => {
    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      toast.error("This name is also here!");
      return;
    }

    setContacts((prevContacts) => [...prevContacts, data]);
  };

  const changeFilterValue = (event) => {
    setFilter(event.target.value);
  };

  const getVisibleContacts = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handelDelete = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <>
      <h1 className={css.title}>PhoneBook</h1>
      <Form submitMethod={getSubmitData} />
      <h2 className={css.title}>Contacts</h2>
      <Filter value={filter} onChange={changeFilterValue} />
      <Contacts contacts={visibleContacts} deleteFunction={handelDelete} />
      <ToastContainer />
    </>
  );
};

export default App;
