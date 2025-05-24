/**
 * API Configuration
 * This file contains all API endpoints used in the application
 */

const API_CONFIG = {
  // Config API endpoint
  CONFIG_API: 'https://srv819563.hstgr.cloud/api/config',
  
  // Posts API endpoint template
  POSTS_API: 'https://bnvce.fr/wp-json/latest-posts/v1/posts',
  
  // Cards API endpoint
  CARDS_API: 'https://srv819563.hstgr.cloud/api/cards/email',
  
  // Helper function to get posts with parameters
  getPostsUrl: (limit, categories) => {
    return `${API_CONFIG.POSTS_API}?limit=${limit}&categories=${categories}`;
  }
};

export default API_CONFIG;