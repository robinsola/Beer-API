class API {
  constructor (){}
  makeCall(abv){
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.punkapi.com/v2/beers/random?${abv}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}
export {API}
