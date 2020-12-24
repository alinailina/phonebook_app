import React from "react";

const Form = ({ onSubmit, name, handleName, number, handleNumber }) => {
  return (
    <form onSubmit={onSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleName} />
      </label>
      <label>
        Phone number:
        <input type="number" value={number} onChange={handleNumber} />
      </label>
      <input className="button-primary" type="submit" value="Add contact" />
    </form>
  );
};

export default Form;
