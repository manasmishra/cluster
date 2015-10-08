# cluster
How to use cluster module for easy scaling and load balancing
This is a very small application which demonstrates how to use cluster module for easy loadbalancing and scaling of an appplication at very early stage as NOde.js is a single threaded enviornment. SO it is highly essential to use these concepts in the early stage of your application.

Here we have demonstrated the following points:
1. There is a server file known as app.server which starts a server in some ports.
2. To scale and cluster there is another file known as clusterdApp.js which actually forks the application instance and create multiple instances using cluster module of core nodejs.
