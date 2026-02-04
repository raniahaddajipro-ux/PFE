import { api } from './Api';

const authService = {
  // Fonction de connexion
  login: async (mail, password) => {
    try {
      // Utilise axios via api.jsx au lieu de fetch
      const response = await api.post('/auth/login', { mail, password });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Erreur de connexion au serveur',
      };
    }
  },
  // authService.js
async forgotPassword(mail) {
  try {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mail })
    });

    const data = await response.json();
    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, message: 'Network error' };
  }
}
};

export default authService;