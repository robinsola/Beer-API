// import { Constructor } from './project.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  $("#user-input").click(function(event){
    event.preventDefault();
    // debugger;
    let name = $("#name-input").val();
    // let ingredient = $("#ingredient-input").val();
    // let fermentation = $("#fermentation-input").val();

    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.punkapi.com/v2/beers?brewed_before=11-2012&abv_gt=6`;
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

    promise.then(function(response) {
      const body = JSON.parse(response);
      $('#showname').text(`${body[0].name}`);
      $('.showingredient').text(`The ingredients are ${body[0].ingredients.malt[0].name}.`);
      $('.showfermentation').text(`Fermentation process is ${body[0].method.fermentation.temp.value} degrees ${body[0].method.fermentation.temp.unit}`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });

});
