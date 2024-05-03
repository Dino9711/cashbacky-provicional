import { createAuthProvider } from 'react-token-auth';

const authProvider = createAuthProvider({
  expirationThresholdMillisec: 100,
  getAccessToken: () =>
    JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'))['access_token'],
  accessTokenKey: 'access_token',
  onUpdateToken: (token) => {
    fetch(`$http://localhost:8880/api/auth/`, {
      headers: {
        Authorization: 'Bearer ' + token.access_token,
      },
    })
      .then((r) => r.json())
      .then((token) => {
        if (token.status_code === 401) {
          authProvider.logout();
          return;
        }
        authProvider.login(token);
        return token;
      });
  },
});

export default authProvider;
