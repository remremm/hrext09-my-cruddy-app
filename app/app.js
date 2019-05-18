// jshint esversion: 6

/*

 ### Basic Reqssd
- [ ] Where to store data? (localstorage)
- [ ] How to caputure data? (web form)
- [ ] How to modify data? (update action, delete action)
- [ ] How to view data? (style?)
- [ ] UI/UX considerations (how are we going to use this)

*/

// parallax

// var p = new Parallax('.parallax').init();

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

var createShowObj = function(name, watched, total){
  var showObj = new Object();
  showObj.name = name;
  showObj.watched = watched;
  showObj.total = total;
  return JSON.stringify(showObj);
};

$(document).ready(function() {
  var innerButton = `<span class="pull-right"><button id="clearSelf" class="btn btn-sm btn-primary">Del</button></span>`;
  var itemsList = getItem('items') ? JSON.parse(getItem('items')) : [];
  createItem('items', JSON.stringify(itemsList));
  const data = JSON.parse(getItem('items'));

  if(data){
    data.forEach(function(x){
      $('.show-list').append(`<div class="inner-content"><li class="list-group-item">${x.name}:<br> Watched: ${x.watched} Total: ${x.total}<br>${innerButton}</li></div>`);
    });
  }

  // Functions for adding numbers to drop down lists
    $(function(){
      $select= $('.1-100');
      for(var i = 1; i <= 100; i++){
        $select.append($('<option></option>').val(i).html(i));
      }
    });
    $(function(){
      $select= $('.1-500');
      for(var i = 1; i <= 500; i++){
        $select.append($('<option></option>').val(i).html(i));
      }
    });

  // on create click, adds shows with episodes watched/total
  $('#createButton').click(function(event) {
    event.preventDefault();

    var showName = $("#showName").val();
    var episodesWatched = $("#episodesWatched").val();
    var totalEpisodes = $('#totalEpisodes').val();
    var showEpisodes = createShowObj(showName, episodesWatched, totalEpisodes);
    if (keyExists(showName)) {
      //current key exists, do something error-handle-y
    } else {
      createItem(showName, showEpisodes);
      var test = JSON.parse(getItem('items'));
      test.push(JSON.parse(showEpisodes));
      updateItem('items', JSON.stringify(test));
      var parsedEpisodes = JSON.parse(showEpisodes);
      $('.show-list').prepend(`<div class="inner-content"><li class="list-group-item">${showName}:<br> Watched: ${parsedEpisodes.watched} Total: ${parsedEpisodes.total}<br>${innerButton}</li></div>`);
    }
    $('#show-list-container').css('visibility', 'visible');
  });

  // on click, updates shows episode number
  $('#updateButton').click(function(event) {
    event.preventDefault();

    var showName = $("#showName").val(); // set show name
    var episodesWatched = $("#episodesWatched").val(); // set episode num
    var totalEpisodes = $('#totalEpisodes').val(); // set total episode num
    var showEpisodes = createShowObj(showName, episodesWatched, totalEpisodes); // create object of name, ep num, total num
    if (keyExists(showName)) { // if key of localStorage exists
      updateItem(showName, showEpisodes); // update localStorage of item with obj
      // var test = JSON.parse(getItem('items')); // var array = parsed items array (full of objects)
      // test.push(JSON.parse(showEpisodes)); //
      updateItem('items', JSON.stringify(test));
      var parsedEpisodes = JSON.parse(showEpisodes);
      $(`.${showName}`).html(`<div class="inner-content><li class="list-group-item">${showName}:<br> Watched: ${parsedEpisodes.watched} Total: ${parsedEpisodes.total}<br>${innerButton}</li></div>`);
    } else {
      //current key doesnt exist, do stuff
    }
  });

  // on click, clears local storage
  // on click, clears all list items
  $('#clearButton').click(function(event){
    event.preventDefault();
    $('li').remove();
    clearEverything();
  });
});
