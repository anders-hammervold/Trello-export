var key="fc8788bd71d9482a501fe6284b9d74fd";
var board  = "GWYfYddv"; 
var boardMembers;

var queryBoard=getUrlVars()["board"];
if (queryBoard!=undefined) {
    board=queryBoard;
}

var token="";

var onError = function(){
  alert("Error");
};


$("#hent").click(function(){
  Trello.authorize({name: "TrelloExport", type: "popup", success: queryBoard, error: onError, account:true  })
});

$("#log-out").click(function(){
  Trello.deauthorize();
});


var visLister=function (lister) {
    		    var template = $('#list-template').html();
    		    var info = Mustache.to_html(template, lister);
    		    $('#lister').html(info);
    		    hentKortForLister(lister);
};

var hentKortForLister = function (lister) {
    lister.forEach( function (item) {
        var listName=item.name;
        var listId=item.id;
        var cmdboard = "lists/" + listId + "/cards/";
        Trello.rest("GET", cmdboard,function (kortListe) { visKort(kortListe,listId); } );
    });
};

var visKort=function (kortListe, listeId) {
    if (kortListe.length>0) {
        var converter = new showdown.Converter();
        var template = $('#kort-template').html();

        kortListe.forEach(function (enkeltkort, index, ar) {
            enkeltkort.descHtml=converter.makeHtml(enkeltkort.desc);
            if (enkeltkort.descHtml.length===0) {
                enkeltkort.descHtml="&lt;Ingen informasjon registrert&gt;"
            }
            setMembersFullnames(enkeltkort);
        });

        var div="#kort_" + listeId;
        var info = Mustache.to_html(template, kortListe);

        $(div).empty();
        $(div).html(info);
    }
};

function setMembersFullnames(enkeltkort) {
    enkeltkort.fullNames=[];
    enkeltkort.idMembers.forEach(function (idMember,index,ar) {
        var ansvarlig=boardMembers.filter(function (boardmember) {
            return (boardmember.id==idMember);
        });
        if (ansvarlig!=undefined && ansvarlig.length>0) {
            enkeltkort.fullNames.push(ansvarlig[0].fullName);
        }
    });
}

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}



function getBoardMembers(boardId) {
    var url="boards/" + boardId + "/members/";
    Trello.rest("GET", url, function (medlemmer) {
        boardMembers=medlemmer;
        });
}
