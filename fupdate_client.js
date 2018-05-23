var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function (req, res) {

  var q = url.parse(req.url, true);
  var filename = "./" + q.pathname + '.json';
  var utcDate = new Date().toUTCString();
  
  console.log('>' + req.connection.remoteAddress + ' : ' + utcDate + ', ' + q.pathname ); 
	
  fs.readFile(filename, function(err, data) {
    
	if(err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found : " + filename + " - " + JSON.stringify(err));
    }  
 	
    //console.log(' > request : ' + JSON.stringify(q) + '\r\n');  	
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(data);
    return res.end();
  });

}).listen(8080);

console.log(' > stand-alone json webservice started on port 8080\r\n' );  
