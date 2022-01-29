var http = require("http");
const nodemon = require("nodemon");
http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    if(req.url ==='/'){
        res.write('hello')
        // res.end("hello world");
    }
    if(res.url ==='/api/customer'){
        res.write("hello customer")
        // res.end("hello customer");
    }
   
}).listen(3000)



// run command 
// nodemon abc.js
// or
// node abc.js