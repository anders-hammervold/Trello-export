var loginFailed = function() {
  window.location.href = "index.html";
};

Trello.authorize({
  name: "TrelloExport",
  type: "popup",
  interactive: false,
  persist: true,
  error: loginFailed,
  account: true
});
