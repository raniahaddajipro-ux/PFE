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
};

export default authService;