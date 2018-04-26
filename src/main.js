// import { Constructor } from './project.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {API} from './API.js';

$(document).ready(function() {
  $("#user-input").click(function(event){
    event.preventDefault();
    let name = $("#name-input").val();
    // let ingredient = $("#ingredient-input").val();
    // let fermentation = $("#fermentation-input").val();

    let api = new API();
    let promise = api.makeCall();
    promise.then(function(response) {
      let body = JSON.parse(response);
      $('#showname').text(name);
      // $('#showname').text(`${body[0].name}`);
      $('.showingredient').text(`The ingredients are ${body[0].ingredients.malt[0].name}.`);
      $('.showfermentation').text(`Fermentation process is ${body[0].method.fermentation.temp.value} degrees ${body[0].method.fermentation.temp.unit}`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
