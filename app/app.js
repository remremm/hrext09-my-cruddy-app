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

var createShowObj = function(watched, total){
  var showObj = new Object();
  showObj.watched = watched;
  showObj.total = total;
  return JSON.stringify(showObj);
};

$(document).ready(function() {
  // Interact CDN => move output container on mouse click/drag
  interact('.show-list-container-class')
    .draggable({
      ineratia: true,
      modifiers: [
        interact.modifiers.restrict({
          endOnly: true,
          elementRect: {top: 0, left: 0, bottom: 1, right: 1}
        })
      ],
      autoScroll: true,
      onmove: dragMoveListener,
    });

    function dragMoveListener(event){
      var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    window.dragMoveListener = dragMoveListener;

  var itemsList = getItem('showList') ? JSON.parse(getItems('showList')) : [];

  createItem('items', JSON.stringify(itemsList));

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
    var showEpisodes = createShowObj(episodesWatched, totalEpisodes);
    itemsList.push(JSON.stringify(showEpisodes));
    var innerButton = `<span class="pull-right"><button id="clearButton" class="btn btn-lg btn-primary">Del</button></span>`;
    if (keyExists(showName)) {
      //current key exists, do something error-handle-y
    } else {
      createItem(showName, showEpisodes);
      var parsedEpisodes = JSON.parse(showEpisodes);
      // setItem(showName, JSON.stringify(itemsList));
      // var data = JSON.parse(itemsList);
      $('.show-list').prepend(`<div class="inner-content"><li class="${showName} list-group-item">${showName}:<br> Watched: ${parsedEpisodes.watched} Total: ${parsedEpisodes.total}<br>${innerButton}</li></div>`);
    }
    $('#show-list-container').css('visibility', 'visible');
  });

  // on click, updates shows episode number
  $('#updateButton').click(function(event) {
    event.preventDefault();

    var showName = $("#showName").val();
    var episodesWatched = $("#episodesWatched").val();
    var totalEpisodes = $('#totalEpisodes').val();
    var showEpisodes = createShowObj(episodesWatched, totalEpisodes);
    var innerButton = `<span class="pull-right"><button id="clearButton" class="btn btn-lg btn-primary">Del</button></span>`;
    if (keyExists(showName)) {
      updateItem(showName, showEpisodes);
      var parsedEpisodes = JSON.parse(showEpisodes);
      $(`.${showName}`).html(`<div class="inner-content><li class="${showName}" list-group-item>${showName}:<br> Watched: ${parsedEpisodes.watched} Total: ${parsedEpisodes.total}<br>${innerButton}</li></div>`);
    } else {
      //current key doesnt exist, do stuff
    }
  });

  // on click, clears local storage
  // need to add code to clear the div where everything is stored
  $('#clearButton').click(function(event){
    event.preventDefault();

    clearEverything();
  });
});
