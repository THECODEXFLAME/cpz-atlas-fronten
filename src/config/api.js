// API configuration
const API_URL = process.env.NODE_ENV === 'production' 
  ? process.env.NEXT_PUBLIC_PRODUCTION_API_URL 
  : process.env.NEXT_PUBLIC_API_URL;

export const endpoints = {
  requestAccess: `${API_URL}/api/request-access`,
  zetaC: `${API_URL}/api/zeta-c`,
  elfAnomalies: `${API_URL}/api/elf-anomalies`,
  schumann: `${API_URL}/api/schumann`,
  export: `${API_URL}/api/export`,
  health: `${API_URL}/health`
};

export default API_URL;
