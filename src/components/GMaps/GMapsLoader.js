import $S from 'scriptjs';

export default class GMapsLoader {

  constructor() {
    this.google = null;
  }

  getMaps(key) {
    return new Promise((resolve, reject) => {
      if (!this.google) {
        $S.get(`https://maps.googleapis.com/maps/api/js?key=${key}`, () => {
          this.google = window.google;
          resolve(this.google);
        });
      }else{
        resolve(this.google);
      }
    });
  }
}