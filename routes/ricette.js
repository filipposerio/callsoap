
var soap = require('soap');
var constants = require('constants');
var fs = require('fs');




exports.findAll = function (req, res, next) {
	console.log("findAll");
    var dati = req.query;
//    console.log('dati: ' + name);
console.log('primo campo:' + dati.firstName);
	name=dati.firstName;
    if (name.firstName) {
        var results = employees.filter(function(element) {
            var fullName = element.firstName + " " + element.lastName;
            return fullName.toLowerCase().indexOf(name.toLowerCase()) > -1;
        });
        res.send(results);
    } else {
        res.send(employees);
    }
};

exports.findByNre = function (req, res, next) {
	console.log("findbynre");
	
    var id = req.params.nre;
    console.log(id);
    res.send(employees[id]);
};


exports.findRicetta = function (req, res, next) {
	var dati = req.query;
	var myurl = './routes/demRicettaRicercaErogatore.wsdl';
	 console.log(myurl);
	 //var myurl = 'https://demservicetest.sanita.finanze.it/DemRicettaErogatoServicesWeb/services/demVisualizzaErogato.wsdl'; 
	 var args = {pinCode: '0Gv1vsTpzlvRD9kBd8FVLo2/441rZ8rRZVf0Zi9eO6+L7kme0KC8Vx6ZjRj/4JjA4aHPTCi3D6YW9OtmYkIpW7sfchmhqHdVORBZHPitiPHdr5iIipAhIzBhFOQIPfpYasW5cQmU//uNB4GSWSNDIkaqdMrDjTPpIkbKKeoA4dQ=',
	      codiceRegioneErogatore: '190',
	      codiceAslErogatore: '201',
	      codiceSsaErogatore: '888888',
	      //nre: '1900A4000004510',
	      nre: dati.nre,
	      cfAssistito: 'T8L5DQ4L7vZWEQ3gGWUhMYYRoGZAIsZSCZ4AieAmIKZ85B6HarO5s/jhtnp5m4r44JiwBRPYyYxtzP4npmLyk8zFSSuVxDAU3oaUdO0lOnDWKZjf886o2nbmSsPEiXYlTaJnWRU420qrQ4Sa2HfEK/32wXsOSq7TCpoMFYhkXeA='
	//      tipoOperazione: '1'
	      };
	 var auth = " Basic " + new Buffer("UWT3CBXX" + ":" + "PBUW9EBP").toString("base64");
	 var myHeaders = {"Authorization": auth }
soap.createClient(myurl,{ }, function(err, client) {  	
         if (err) {
         	console.log('SOAPDEM.JS ERRORE!!!!!! ' + err.message);
         	}
	console.log('SOAPDEM.JS dentro callbakc SOAP.CREATECLIENT inizio messaggio'); 	
         console.log(client.wsdl.options); 	


//      console.log(client.describe());
      
      //client.setSecurity(new soap.BasicAuthSecurity('UWT3CBXX', 'PBUW9EBP'));
     client.setSecurity({
      addOptions:function(options){
        options.cert = fs.readFileSync('./routes/certTest.pem');
        //options.key = fs.readFileSync('c:/nodeprj/callsoap/certTest.pem');
        options.rejectUnauthorized = false;
        options.secureOptions = constants.SSL_OP_NO_TLSv1_2;
        options.strictSSL = false;
       // options.agent = new https.Agent(options);
      },
      toXML:function(){return '';}
    });
 console.log("SOAPDEM.JS PRIMA DELLA CHIAMATA ALLA VISUALIZZA EROGATO");
 //console.log(args);
      client.visualizzaRicetta(args,  function(err, result) {
     console.log("*******************CHIAMO LA VISUALIZZA RICETTA");
        //console.log(args);
         if (err) {
         	console.log("ERRORE CHIAMATA FUNZIONE "  +err.message);
		 res.send(err);
        }
         else {
         	console.log(result);
		 res.send(result);
        }
         
      },{}, myHeaders );
 
  },'https://demservicetest.sanita.finanze.it/DemRicettaRicercaErogatoreServicesWeb/services/ricercaErogatore');	

	
};