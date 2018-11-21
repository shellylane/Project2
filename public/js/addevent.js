$(document).ready(function() {
  // Getting a reference to the input fields where user adds a new event name, date, time and location.
  var $newEvent = $("#title");
  var $newDate = $("#date");
  var $newTime = $("#time");
  var startTime = $("#date").val()+"T"+$("#time").val();
  var $newStart =startTime;
  var $newLocation = $("#location")
  // Our new eventswill go inside the EventContainer
  var $eventContainer = $(".event-container");
  // Adding event listeners for deleting and adding events
  $(document).on("click", "button.delete", deleteEvent);
  $(document).on("submit", "#add-event-form", insertEvent);

  // initial events array
  var events = [];

  // Getting events from database when page loads
  getEvents();

  // This function resets the todos displayed with new todos from the database
  function initializeRows() {
    $eventContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < events.length; i++) {
      rowsToAdd.push(createEvent(events[i]));
    }
    $eventContainer.prepend(rowsToAdd);
  }

  // This function grabs todos from the database and updates the view
  function getEvents() {
    $.get("/api/events", function(data) {
      events = data;
      initializeRows();
    });
  }

  // This function deletes a event when the user clicks the delete button
  function deleteEvent(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/events/" + id
    }).then(getEvents);
  }
//need to work from here down
  // This function constructs an event-item row
  function createEvent(event) {
    var $newEventRow = $(
      [
        "<li class='list-group-item event-item'>",
        "<span>",
        event.title,
        event.start,
        event.location,
        "</span>",
        "<button class='delete btn btn-danger'>x</button>",
        "</li>"
      ].join("")
    );
      console.log(event);
    $newEventRow.find("button.delete").data("id", event.id);
    $newEventRow.data("event", event);
    return $newEventRow;
  }

  // This function inserts a new event into our database and then updates the view
  function insertEvent(event) {
    event.preventDefault();
    var event = {
      title: $newEvent.val().trim(),
      start:  $("#date").val()+"T"+$("#time").val(),
      location: $newLocation.val().trim(),
    };

    $.post("/api/events", event, getEvents);
    $newEvent.val("");
    $("#date").val()+"T"+$("#time").val();
    $newLocation.val("");
  }
});
