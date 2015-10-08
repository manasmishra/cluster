var cluster = require('cluster');
var os = require('os');

if(cluster.isMaster){
	var cpus = os.cpus().length();
	//Start as many children as no of CPUS
	for(var i=0;i<cpus;i++){
		cluster.fork();
	}
	//if due to some reason the master process is going to be crashed then this piece of code will fork a new master process.
	//Start Masterprocess fork
	cluster.on('exit',function(worker,code){
		if(code!=0 && !worker.suicide){
			console.log("Worker Crashed. Starting a new worker");
			cluster.fork();
		}
	});
	//End Master Process Forking
	//In case of code update and with zerodowntime to implement the same to all the child processed can be done as below
	//Restarting of workers is started only on receiving SIGUSR2 Signal
	process.on('SIGUSR2',function(){
		console.log('Restartig Workedrs');
		var workers = Object.keys(cluster.workers);
		//This below restartWorker() will restart all cluster.worker object asynchronously
		funtion restartWorker(i){
			if(i>=workers.length) return;

			var worker = cluster.workers[workers[i]];
			console.log('Stopping Worker:'+worker.process.pid);
			//We are stopping a worker manually so that the proper code updation and restart can be done
			worker.disconnect();

			//When the worker is terminated exits the below event listener is going to handle the same and will spawn a new worker
			worker.on('exit',function(){
				if(!worker.suicide) return;
				var newWorker = cluster.fork();
				newWorker.on('listening',function(){
					restartWorker(i+1);
				});
			});
		}restartWorker(0);
	});	
}
else{
	require('./app');
}
