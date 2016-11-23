var http = require('http'), 
fs = require('fs'); 

function serveStaticFile(res, path, contentType, responseCode) { 
if(!responseCode) responseCode = 200; 
fs.readFile(__dirname + path, function(err,data) { 
if(err) { 
res.writeHead(500, { 'Content-Type': 'text/plain' }); 
res.end('500 - Internal Error'); 
} else { 
res.writeHead(responseCode, { 'Content-Type': contentType });
res.end(data); 
} 
}); 
} 

http.createServer(function(req,res){ 
// Приводим URL к единому виду путем удаления 
// строки запроса, необязательной косой черты 
// в конце строки и приведения к нижнему регистру 
var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase(); 
switch(path) { 
case '': 
serveStaticFile(res, '/public/intro.html', 'text/html'); 
break; 
case '/password': 
serveStaticFile(res, '/public/password1.html', 'text/html'); 
break; 
case '/courses': 
serveStaticFile(res, '/public/iskra.html', 'text/html'); 
break; 
default: 
serveStaticFile(res, '404.html', 'text/html', 404); 
break; 
} 
}).listen(3000); 
console.log(' Сервер запущен на localhost:3000; нажмите Ctrl+C для завершения....');
