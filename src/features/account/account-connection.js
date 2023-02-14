import axios from 'axios';

const server = 'http://localhost:3000';

let accessToken = null;
let refreshToken = null;

axios.defaults.baseURL = server;

export async function login(username, password) {
  let response;
  try {
    response = await axios.post('/login', {
      username: username,
      password: password
    });
  } catch (error) {}

  if (!response) return false;

  refreshToken = response.data.refreshToken;
  localStorage.setItem('refreshToken', refreshToken);

  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  // Add an interceptor to refresh the access token
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status === 401) {
        const response = await refreshAccessToken();
        if (response) {
          refreshToken = response.data.refreshToken;
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`;
        }
      }
      return Promise.reject(error);
    }
  );

  return !!response;
}

export async function refreshAccessToken(newRefreshToken = null) {
  if (newRefreshToken) refreshToken = newRefreshToken;

  let response;

  try {
    response = await axios.get('/refresh', {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    });
  } catch (error) {}

  return !!response;
}

export async function logout() {
  let response;
  try {
    response = await axios.delete('/logout', {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    });
  } catch (error) {}

  return !!response;
}

export async function register(username, password) {
  let response;
  try {
    response = await axios.post('/register', {
      username: username,
      password: password
    });
  } catch (error) {}

  return !!response;
}
