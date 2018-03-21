import {Bike} from './biketrack.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  $("#searchForm").submit(function(event) {
    event.preventDefault();

    let search = $("#citySearch").val();
    $.get(`https://bikeindex.org:443/api/v3/search?page=1&distance=10&access_token=aa45bbc94ec9400aadaa60789da416eab879a757b556b54d56fbc485c1feb8b1&location=${search}`).then(function(response) {

      for( let i = 0; i < response.bikes.length; i++)
      {
        $("#bikeTitle").append("<li>" + response.bikes[i].title + "</li>" + "<br>");
        $("#bikeColor").append("<li>" + response.bikes[i].frame_colors + "</li>" + "<br>");
        $("#dateStolen").append("<li>" + response.bikes[i].date_stolen + "</li>" + "<br>");
      }
    })

  });
});
