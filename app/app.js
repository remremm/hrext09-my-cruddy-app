// jshint esversion: 6

/*

 ### Basic Reqssd
- [ ] Where to store data? (localstorage)
- [ ] How to caputure data? (web form)
- [ ] How to modify data? (update action, delete action)
- [ ] How to view data? (style?)
- [ ] UI/UX considerations (how are we going to use this)

*/

//localStorage interaction function
//get item
var getItem = function(key) {
  return window.localStorage.getItem(key);
};

//create
var createItem = function(key, value) {
  return window.localStorage.setItem(key, value);
};

//update
var updateItem = function(key, value) {
  return window.localStorage.setItem(key, value);
};

//delete
var deleteItem = function(key) {
  return window.localStorage.removeItem(key);
};

//clear everything
var clearEverything = function() {
  return window.localStorage.clear();
};

var keyExists = function(key) {
  var currentValue = getItem(key);
  return currentValue !== null;
};

var createShowObj = function(watched, total){
  var showObj = new Object();
  showObj.watched = watched;
  showObj.total = total;
  return JSON.stringify(showObj);
};


////////////////////////////////
//event handlers for the buttons and ... possibly the inputboxes
  //preventdefault on button clicks
$(document).ready(function() {
  function getOptions(num){
    for(var i = 1; i <= num; i++){
      return $('#episodesWatched').append(`<option>${getOptions(i)}</option>`);
    }
  }
  $('.add-shows-button').click(function(){
    getOptions(10);
  });

  $('#createButton').click(function(event) {
    event.preventDefault();

    var showName = $("#showName").val();
    var episodesWatched = $("#episodesWatched").val();
    var totalEpisodes = $('#totalEpisodes').val();
    var showEpisodes = createShowObj(episodesWatched, totalEpisodes);
    if (keyExists(showName)) {
      //current key exists, do something error-handle-y
    } else {
      createItem(showName, showEpisodes);
      var parsedEpisodes = JSON.parse(showEpisodes);
      $('.show-list').prepend(`<div class="inner-content"><li class="${showName}">${showName}: Watched: ${parsedEpisodes.watched} Total: ${parsedEpisodes.total}</li></div>`);
    }
  });


  $('#updateButton').click(function(event) {
    event.preventDefault();

    var showName = $("#showName").val();
    var episodesWatched = $("#episodesWatched").val();
    var totalEpisodes = $('#totalEpisodes').val();
    var showEpisodes = createShowObj(episodesWatched, totalEpisodes);
    if (keyExists(showName)) {
      updateItem(showName, showEpisodes);
    } else {
      //current key doesnt exist, do stuff
    }
    var parsedEpisodes = JSON.parse(showEpisodes);
    $(`.${showName}`).text(`${showName}: Watched: ${parsedEpisodes.watched} Total: ${parsedEpisodes.total}`);
  });

  $('#clearButton').click(function(event){
    event.preventDefault();

    clearEverything();
  });
});
