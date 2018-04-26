import {API} from './API.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  $("#beer").submit(function(event){
    event.preventDefault();
    let level = parseInt($("#level").val());
    let abv;
    if (level === 6) {
      abv = "abv_gt=6";
    } else if (level === 3) {
      abv = "abv_lt=3";
    } return abv;

    let api = new API();
    let promise = api.makeCall(abv);

    promise.then(function(response) {
      let body = JSON.parse(response);
      $('#showName').text(`Beer Type: ${body.name}`);
      // $('#showABV').text(`ABV: ${body[1].abv}`);
      // $('.showingredient').text(`The ingredients are ${body[0].ingredients.malt[0].name}.`);
      // $('.showfermentation').text(`Fermentation process is ${body[0].method.fermentation.temp.value} degrees ${body[0].method.fermentation.temp.unit}`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
