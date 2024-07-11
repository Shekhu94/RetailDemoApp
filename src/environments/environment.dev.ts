export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: 'd055db03-6c99-40b3-bb8d-37f7c21c79b8',
      authority: 'https://login.microsoftonline.com/common',
      redirectUri: 'http://localhost:4200',
    },
  },
  apiConfig: {
    scopes: ['user.read'],
    uri: 'https://graph.microsoft.com/v1.0/me',
  },
};
