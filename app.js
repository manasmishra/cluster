var http = require('http');
var pid= process.pid;

http.createServer(function(req,res){
	for(var i=1e7;i>0;i--){}
		console.log('Hndling request from'+pid);
	res.end('Hello From '+pid+'\n');
}).listen(8080,function(){
	console.log('Started'+pid);
});
