// API Configuration
const API_CONFIG = {
  // API Gateway URL
  GATEWAY_URL: import.meta.env.VITE_API_GATEWAY_URL,
  
  // Service endpoints
  HOTELS: {
    BASE: '/api/hotels',
    SEARCH: '/api/hotels/search',
    LOCATIONS: '/api/hotels/locations',
    BY_ID: (id) => `/api/hotels/${id}`,
    BY_LOCATION: (location) => `/api/hotels/location/${location}`
  }
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.GATEWAY_URL}${endpoint}`;
};

// Export specific API endpoints
export const API_ENDPOINTS = {
  HOTELS: {
    GET_ALL: buildApiUrl(API_CONFIG.HOTELS.BASE),
    SEARCH: buildApiUrl(API_CONFIG.HOTELS.SEARCH),
    LOCATIONS: buildApiUrl(API_CONFIG.HOTELS.LOCATIONS),
    GET_BY_ID: (id) => buildApiUrl(API_CONFIG.HOTELS.BY_ID(id)),
    GET_BY_LOCATION: (location) => buildApiUrl(API_CONFIG.HOTELS.BY_LOCATION(location))
  }
};

export default API_CONFIG; 