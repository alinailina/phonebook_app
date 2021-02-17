import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const Form = ({
  onSubmit,
  name,
  handleName,
  number,
  handleNumber,
  handleUpload,
}) => {
  return (
    <form onSubmit={onSubmit} encType="multipart/form-data">
      <label>
        <input
          type="text"
          value={name}
          onChange={handleName}
          placeholder="Add name"
        />
      </label>
      <label>
        <input
          type="number"
          value={number}
          onChange={handleNumber}
          placeholder="Add phone"
        />
      </label>
      <label>
        <input type="file" onChange={handleUpload} />
      </label>
      <button type="submit">
        <AiOutlinePlus />
      </button>
    </form>
  );
};

export default Form;
