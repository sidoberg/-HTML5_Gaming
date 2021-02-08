var http = require("http");
var url  = require("url");
var fs   = require("fs");
const { encode } = require("punycode");

const PORT = "8080";

var serveur = http.createServer(traitReq);
serveur.listen(PORT);

function traitReq(requete, reponse){
    var monOBj      = url.parse(requete.url);
    var contentType = "";
    var fichier     = "";
    var encodage    = "";
    var dossier     = "";
    

    if(monOBj.pathname === "/" || monOBj.pathname === "/index.html"){
        contentType = "text/html";
        fichier     = "index.html";
        encodage    = "UTF-8";
        dossier     = "html/";
    }
    else if(monOBj.pathname === "/style.css"){
        contentType = "text/css";
        fichier     = "style.css";
        dossier     = "css/";
    }
    else if(monOBj.pathname === "/main.js"){
        contentType = "application/javascript";
        fichier     = "main.js";
        dossier     = "js_client/";
    }


    if(monOBj.pathname !== "/favicon.ico"){
        var pageHtml = fs.readFileSync( dossier + fichier, encodage);

        reponse.writeHead(200,{"Content-Type" : contentType});
        reponse.write(pageHtml);
        reponse.end();
    }
}