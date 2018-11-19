$(document).ready(function() {

var eventList = []; 

getEventList();


function getEventList() {
    $.get("/api/eventList", function(data) {
        eventList = data;
    });
};
});
