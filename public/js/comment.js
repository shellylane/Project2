
$(document).ready(function () {
    $(".dropdown-toggle").dropdown();
    // Getting references to our dropdown text box
    var commentInput = $("input#comment-input");
    var commentSubmit = $("#commentSubmitButton")



    // When the signup button is clicked, we validate the email and password are not blank
    commentSubmit.on("click", function (event) {
        console.log("click click boom")
        event.preventDefault();
        var commentData = {
            commentBody: commentInput.val().trim(),
        };
        console.log(commentData);
        if (!commentData.commentBody) {
            return;
        }
        // If we have all the required fields, run the signUpUser function
        sendComment(commentData.commentBody);
        commentInput.val("");
        location.reload();
    });

    // Does a post to the signup route. If successful, we are redirected to the forum page page
    // Otherwise we log any errors
    function sendComment(commentBody) {
        $.post("/api/comment", {
            commentBody: commentBody
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
