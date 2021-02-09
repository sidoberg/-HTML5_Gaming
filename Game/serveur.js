var http        = require("http");
var url         = require("url");
var fs          = require("fs");
var gestionPage = require("./gestionPage");
var serveur     = http.createServer(traitReq);

const PORT = "8080";

serveur.listen(PORT);

function traitReq(requete, reponse){
    var monOBj = url.parse(requete.url);

    if(monOBj.pathname === "/"){
        monOBj.pathname = "/index.html";
    }

    if(monOBj.pathname !== "/favicon.ico"){
        var dataPreparation = gestionPage.preparerLesDonnees(monOBj);
        var data = {};
        data.contentType = dataPreparation.contentType;
        data.pageHtml    = fs.readFileSync( dataPreparation.dossier + dataPreparation.fichier, dataPreparation.encodage);
        gestionPage.envoyerLesDonnees(reponse, data)
    }
}