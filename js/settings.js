jQuery(function ($) {
    if (typeof (window.localStorage) != "undefined") {
        //set the value to the text fields
        $("input[type=text]").val(function () {
            return localStorage.getItem(this.id);
        });
        $("input[type=text]").on("change", function () {
            localStorage.setItem(this.id, $(this).val());
        });
    }
});

function loggedIn() {
  $("#statustext").empty();
	$("#statustext").append("Logged in");
}

function loginFailed() {
  $("#statustext").empty();
	$("#statustext").append("Login failed");
}

$("#login").click(function() {
  Trello.authorize({
    name: "TrelloExport",
    type: "popup",
    persist: true,
    success: loggedIn,
    error: loginFailed,
    account: true
  });
});

$("#logout").click(function() {
  Trello.deauthorize();
  $("#statustext").empty();
  $("#statustext").append("Not logged in");
});

$("#nvdb").click(function() {
  window.location.href="nvdb.html";
});
$("#datainn").click(function() {
  window.location.href="datainn.html";
});

Trello.authorize({
  name: "TrelloExport",
  type: "popup",
  interactive: false,
  persist: true,
  success: loggedIn,
  error: loginFailed,
  account: true
});
