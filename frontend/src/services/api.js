import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Content API
export const contentAPI = {
  // Get all content items
  getAllContent: async () => {
    const response = await api.get('/content');
    return response.data;
  },

  // Get single content item by ID
  getContentById: async (id) => {
    const response = await api.get(`/content/${id}`);
    return response.data;
  },

  // Create new content item
  createContent: async (contentData) => {
    const response = await api.post('/content', contentData);
    return response.data;
  },

  // Update content item
  updateContent: async (id, contentData) => {
    const response = await api.put(`/content/${id}`, contentData);
    return response.data;
  },

  // Delete content item
  deleteContent: async (id) => {
    const response = await api.delete(`/content/${id}`);
    return response.data;
  },
};

export default api;
