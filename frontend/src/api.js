import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5151/api",
});

export const insertClient = (payload) => api.post(`/clients`, payload);

export const getAllClients = () => api.get(`/clients`);

export const updateClientById = (id, payload) =>
  api.put(`/clients/${id}`, payload);

export const deleteClientById = (id) => api.delete(`/clients/${id}`);

export const getClientById = (id) => api.get(`/clients/${id}`);

const apis = {
  insertClient,
  getAllClients,
  updateClientById,
  deleteClientById,
  getClientById,
};

export default apis;
