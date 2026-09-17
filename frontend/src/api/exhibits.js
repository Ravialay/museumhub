import { api } from './client';

export const getExhibits = () =>
  api.get('/exhibits').then(r => r.data);

export const getExhibit = (id) =>
  api.get(`/exhibits/${id}`).then(r => r.data);

export const createExhibit = (data) =>
  api.post('/exhibits', data).then(r => r.data);

export const updateExhibit = (id, data) =>
  api.put(`/exhibits/${id}`, data);

export const deleteExhibit = (id) =>
  api.delete(`/exhibits/${id}`);