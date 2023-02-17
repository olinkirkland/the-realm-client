import axios from 'axios';

const server = 'http://localhost:3000';

export let refreshToken = localStorage.getItem('refreshToken');

axios.defaults.baseURL = server;

// Add an interceptor to refresh the access token
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const getNewAccessTokenSuccess = await requestNewAccessToken();
      if (!getNewAccessTokenSuccess) return Promise.reject(error);

      // Returns the original request with the new access token
      return axios(error.config);
    }

    return Promise.reject(error);
  }
);

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
  requestNewAccessToken();

  return !!response;
}

export async function requestNewAccessToken(newRefreshToken = null) {
  if (newRefreshToken) refreshToken = newRefreshToken;

  let response;

  try {
    response = await axios.post('/refresh', {
      refreshToken: refreshToken
    });

    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${response.data.accessToken}`;
  } catch (error) {}

  return !!response;
}

export async function logout() {
  let response;
  try {
    response = await axios.delete('/logout', {
      data: { refreshToken }
    });
  } catch (error) {}
  refreshToken = null;
  localStorage.removeItem('refreshToken');

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

export async function getAccount() {
  let response;
  try {
    // Make a request with an access token
    response = await axios.get('/account');
  } catch (error) {
    await logout();
    return null;
  }

  return response.data;
}
