var http = require("http");
var url  = require("url");
var fs   = require("fs");
const { encode } = require("punycode");

const PORT = "8080";

var serveur = http.createServer(traitReq);
serveur.listen(PORT);

function traitReq(requete, reponse){
    var monOBj       = url.parse(requete.url);
    var contentType  = "";
    var encodage     = "";
    var dossier      = "";
    var indexDupoint = monOBj.pathname.indexOf(".");
    var extension    = monOBj.pathname.substring(indexDupoint, monOBj.pathname.length);
    var fichier      = monOBj.pathname.substring(1, monOBj.pathname.length);

    if(monOBj.pathname === "/"){
        monOBj.pathname = "/index.html";
    }

    switch(extension){
        case ".html" :
            contentType = "text/html";
            encodage    = "UTF-8";
            dossier     = "html/";
        break;
        case ".css" :
            contentType = "text/css";
            dossier     = "css/";
        break;
        case ".js" :
            contentType = "application/javascript";
            dossier     = "js_client/";
        break;
        case ".png" : 
            contentType = "image/png";
            dossier     = "assets/";
        break;
        case ".jpg" : 
            contentType = "image/jpeg";
            dossier     = "assets/";
        break;
        default : console.log("Erreur");
    }


    if(monOBj.pathname !== "/favicon.ico"){
        var pageHtml = fs.readFileSync( dossier + fichier, encodage);

        reponse.writeHead(200,{"Content-Type" : contentType});
        reponse.write(pageHtml);
        reponse.end();
    }
}