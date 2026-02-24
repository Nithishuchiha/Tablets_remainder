const API_URL = process.env.REACT_APP_API_URL || 
                (process.env.NODE_ENV === 'production' 
                  ? 'https://your-backend-url.onrender.com' 
                  : 'http://localhost:5000');

const api = {
  baseURL: API_URL,
  
  // Helper function to make API calls
  async request(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  },

  // API endpoints
  whatsappStatus: () => api.request('/api/whatsapp/status'),
  
  medications: {
    getAll: () => api.request('/api/medications'),
    create: (data) => api.request('/api/medications', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id, data) => api.request(`/api/medications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id) => api.request(`/api/medications/${id}`, {
      method: 'DELETE',
    }),
  },

  contacts: {
    getAll: () => api.request('/api/contacts'),
    create: (data) => api.request('/api/contacts', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    delete: (id) => api.request(`/api/contacts/${id}`, {
      method: 'DELETE',
    }),
  },

  testMessage: (data) => api.request('/api/test-message', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

export default api;
