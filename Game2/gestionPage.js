var gestionPage = {

     envoyerLesDonnees : function(reponse, data) {
        reponse.writeHead(200,{"Content-Type" : data.contentType});
        reponse.write(data.pageHtml);
        reponse.end();
    },
    
    preparerLesDonnees : function(monOBj) {
        var indexDuPoint = monOBj.pathname.indexOf(".");
        var extension    = monOBj.pathname.substring(indexDuPoint, monOBj.pathname.length);
        
    
        var data ={
            contentType: "",
            encodage   : "",
            dossier    : "",
            fichier    : monOBj.pathname.substring(1, monOBj.pathname.length),
        };
        
        switch(extension){
            case ".html" :
                data.contentType = "text/html";
                data.encodage    = "UTF-8";
                data.dossier     = "html/";
            break;

            case ".css" :
                data.contentType = "text/css";
                data.dossier     = "css/";
            break;

            case ".js" :
                data.contentType = "application/javascript";
                data.dossier     = "js_client/";
            break;

            case ".png" : 
                data.contentType = "image/png";
                data.dossier     = "assets/image/";

                
            break;

            case ".jpg" : 
                data.contentType = "image/jpeg";
                data.dossier     = "assets/";
            break;

            case ".ogg" : 
            data.contentType = "audio/ogg";
            data.dossier     = "assets/Sounds/";
            break;

            case ".json" : 
            data.contentType = "application/json";
            data.dossier     = "assets/json/";
            break;
            
            default : console.log("Erreur");
        }
        return data;
    }
}
module.exports = gestionPage;

