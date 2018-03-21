import {Bike} from './biketrack.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function timeConverter(UNIX_timestamp){
var a = new Date(UNIX_timestamp * 1000);
var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var year = a.getFullYear();
var month = months[a.getMonth()];
var date = a.getDate();
var time = date + ' ' + month + ' ' + year;
return time;
}

$(document).ready(function() {
  $("#searchForm").submit(function(event) {
    event.preventDefault();

    let citySearch = $("#citySearch").val();
    let distanceSearch = $("#distanceSearch").val();

    $.get(`https://bikeindex.org:443/api/v3/search?page=1&per_page=25&location= ${citySearch}&distance=${distanceSearch}&stolenness=proximity&access_token=process.env.API_KEY`).then(function(response) {

      for( let i = 0; i < response.bikes.length; i++)
      {

        $("#output").append("<ul>" + `<img src=${response.bikes[i].thumb} onerror="this.src='https://image.flaticon.com/icons/svg/13/13698.svg';">` + "<h3>" + response.bikes[i].title + "</h3>" + "<br>" + "<h4>" + "<strong> Color: </strong> " + response.bikes[i].frame_colors + "</h4>" + "<br>" + "<h4>" + "<strong> Date stolen: </strong>" + timeConverter(response.bikes[i].date_stolen) + "</h4>" + "</ul>" + "<hr>");
      }
    }).fail(function(error) {
      $("#showErrors").text("There was an error in processing your request: ${error.responseText}. Please try again!")
    });

    ("#resetButton").click(function(){
      ("#citySearch").val("");
      ("#distanceSearch").val("");
    })

  });
});
