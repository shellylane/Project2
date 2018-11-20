
$(document).ready(function () {
    $(".dropdown-toggle").dropdown();
    // Getting references to our dropdown text box
    var titleInput = $("input#title-input");
    var bodyInput = $("input#body-input");
    var postSubmit = $("#postSubmitButton");
    var forumTitle = $(".forumTitle");


    // When the signup button is clicked, we validate the email and password are not blank
    postSubmit.on("click", function (event) {
        console.log("click click boom")
        event.preventDefault();
        var postData = {
            title: titleInput.val().trim(),
            body: bodyInput.val().trim(),
        };
        console.log(postData);
        if (!postData.title || !postData.body) {
            return;
        }
        // If we have all the required fields, run the signUpUser function
        sendPost(postData.title, postData.body);
        titleInput.val("");
        bodyInput.val("");
        location.reload();
    });

    // Does a post to the signup route. If successful, we are redirected to the forum page page
    // Otherwise we log any errors
    function sendPost(title, body) {
        $.post("/api/post", {
            title: title,
            body: body
        });
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
    forumTitle.on("click", function (blog) {
        console.log("forum works");
        event.preventDefault();
    })
});



