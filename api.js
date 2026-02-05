// api.js - API Service for FoundersKick Frontend
import axios from 'axios';
import io from 'socket.io-client';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Socket.io connection
let socket = null;

export const initializeSocket = (userId) => {
  if (!socket) {
    socket = io(API_BASE_URL);
    socket.emit('join', userId);
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

// Authentication APIs
export const authAPI = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
  phoneAuth: (data) => api.post('/api/auth/phone', data),
  getCurrentUser: () => api.get('/api/users/me'),
};

// User APIs
export const userAPI = {
  getProfile: (userId) => api.get(`/api/users/${userId}`),
  updateProfile: (data) => api.put('/api/users/me', data),
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post('/api/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  searchUsers: (query, location) => 
    api.get('/api/users/search', { params: { query, location } }),
};

// Startup APIs
export const startupAPI = {
  create: (data, images) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'lookingFor') {
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key]);
      }
    });
    images.forEach(image => {
      formData.append('images', image);
    });
    return api.post('/api/startups', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getAll: (filters = {}) => api.get('/api/startups', { params: filters }),
  getById: (id) => api.get(`/api/startups/${id}`),
  update: (id, data) => api.put(`/api/startups/${id}`, data),
  delete: (id) => api.delete(`/api/startups/${id}`),
};

// Connection APIs
export const connectionAPI = {
  sendRequest: (receiverId) => 
    api.post('/api/connections/request', { receiverId }),
  acceptRequest: (requestId) => 
    api.post(`/api/connections/accept/${requestId}`),
};

// Message APIs
export const messageAPI = {
  getConversations: () => api.get('/api/conversations'),
  getMessages: (userId) => api.get(`/api/messages/${userId}`),
  sendMessage: (receiverId, text, file = null) => {
    const formData = new FormData();
    formData.append('receiverId', receiverId);
    formData.append('text', text);
    if (file) {
      formData.append('file', file);
    }
    return api.post('/api/messages', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// Real-time message sending via Socket.io
export const sendRealtimeMessage = (messageData) => {
  if (socket) {
    socket.emit('sendMessage', messageData);
  }
};

// Typing indicator
export const sendTypingIndicator = (receiverId, isTyping) => {
  if (socket) {
    socket.emit('typing', { receiverId, isTyping });
  }
};

export default api;
