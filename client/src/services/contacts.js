import axios from "axios";
const baseUrl = "/api/contacts";

const getAll = () => {
  return axios.get(baseUrl);
};

const add = (formData) => {
  return axios.post(baseUrl, formData);
};

const deleteContact = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

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
