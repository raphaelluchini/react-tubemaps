import $S from 'scriptjs';

export default class GApi {

  constructor() {
    this.gapi = null;
    this.GoogleAuth = null
  }

  getGapi(clientId) {
    return new Promise((resolve, reject) => {
      if (!this.GoogleAuth) {
        $S.get('https://apis.google.com/js/api.js', () => {
          this.gapi = window.gapi;
          this.gapi.load('client:auth2', () => {
            this.gapi.client.init({
              'clientId': clientId,
              'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
              'scope': 'https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner'
            }).then(() => {
              this.GoogleAuth = this.gapi.auth2.getAuthInstance();
              resolve(this.GoogleAuth);
            });
          });
        });
      } else {
        resolve(this.GoogleAuth);
      }
    });
  }

  getGoogleAuth() {
    return this.GoogleAuth;
  }

  getGApi() {
    return this.gapi;
  }

  isAuthenticated() {
    if (this.GoogleAuth) {
      return this.GoogleAuth.currentUser.get();
    }
    console.warn('No GoogleAuth instance');
  }

  revokeAccess() {
    if (this.GoogleAuth) {
      return this.GoogleAuth.disconnect();
    }
    console.warn('No GoogleAuth instance');
  }

  signIn() {
    if (this.GoogleAuth) {
      return this.GoogleAuth.signIn();
    }
    console.warn('No GoogleAuth instance');
  }
}