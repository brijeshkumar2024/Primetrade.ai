import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const apiClient = axios.create({
  baseURL: API_URL,
});

// add token to all requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// auth endpoints
export const registerUser = (email, password, name) => {
  return apiClient.post('/auth/register', { email, password, name });
};

export const loginUser = (email, password) => {
  return apiClient.post('/auth/login', { email, password });
};

export const getProfile = () => {
  return apiClient.get('/auth/profile');
};

// task endpoints
export const getTasks = () => {
  return apiClient.get('/tasks');
};

export const createTask = (title, description) => {
  return apiClient.post('/tasks', { title, description });
};

export const updateTask = (id, data) => {
  return apiClient.put(`/tasks/${id}`, data);
};

export const deleteTask = (id) => {
  return apiClient.delete(`/tasks/${id}`);
};

export const getTaskById = (id) => {
  return apiClient.get(`/tasks/${id}`);
};
