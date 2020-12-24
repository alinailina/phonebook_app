import axios from "axios";
const baseUrl = "http://localhost:3001/api/contacts";

const getAll = () => {
  return axios.get(baseUrl);
};

const add = (newContact) => {
  return axios.post(baseUrl, newContact);
};

const deleteContact = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

// const update = (index, updatedContact) => {
//   return axios.put(`${baseUrl}/${index + 1}`, updatedContact);
// };

const update = (updatedContact) => {
  const { id } = updatedContact;
  return axios.put(`${baseUrl}/${id}`, updatedContact);
};

export default {
  getAll,
  add,
  deleteContact,
  update,
};
