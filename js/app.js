function pad(str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

var getStatus = function(board) {
	board ="boards/" + board + "/lists/";

  Trello.rest("GET", board, function(lister) {
    $("#lister").empty();
    $.each(lister, function(indx, liste) {
        $("#lister")
            .append("<h2>" + liste.name + "</h2>")
              $("#lister").append("<table id='" + liste.id + "'  class='table table-striped table-hover'></table>");
              $("#" + liste.id).append("<tr><th>id</th><th>Beskrivelse</th><th>Labels</th><th>Frist</th></tr>");


      Trello.rest("GET", "lists/" + liste.id + "/cards", function(cards) {
        if (cards.length===0) {
          $("#" + liste.id).css('display', 'none');
        }
        else {
          $.each(cards, function(indx, card) {
            $("#" + liste.id).append(
                    "<tr id='" + card.id + "'>" +
                    "<td id='tekst-" + card.id +
                    "' class='kortliste'><a href='" + card.url + "'>" + pad(card.idShort, 3) +
                    "</a></td>" +
                    "<td class='kortliste'>" + card.name + "</td>" +
                    "<td class='kortliste' id='label-" + card.id +
                    "' ></td>" +
                    "<td class='kortliste' id='due-" + card.id +
                    "' ></td>" +
                    "</tr>");
            if (card.due !== null) {
              var due = moment(card.due, "YYYY-MM-DDTHH:mm:ssZ").format("D. MMM YYYY");
              $("#due-" + card.id).append("<div class='frist'>Frist: <span class='dato'> " + due + "</span></div>");
            }
            $.each(card.labels, function(indx, label) {
                    $("#label-" + card.id).append(
                      "<div class='trello-label " + label.color +
                      "'>" + label.name + "</div>");
            });
          });
        }

      });

    });
  });
};

var onAutorize = function() {
  getStatus("GWYfYddv");
  $("#boardname").empty();
  $("#boardname").append("SALG");
}

var onError = function(){
  alert("Error");
};


$("#hent").click(function(){
  Trello.authorize({name: "TrelloExport", type: "popup", success: onAutorize, error: onError, account:true  })
});

$("#log-out").click(function(){
  Trello.deauthorize();
});