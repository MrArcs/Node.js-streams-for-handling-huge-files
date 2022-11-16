var http = require("http");
var fs = require("fs");

// Bad way to handle large file data on server
// var server = http.createServer(function (req, res) {
//    console.log("Request was made : " + req.url);
//    res.writeHead(200, { "Content-Type": "text/plain" });

//    // without stream
//    var file = fs.readFileSync(__dirname + "/public/sample-data.txt");
//    return res.end(file);
// });

// Best way to handle large file data on server using stream

// var readStream = fs.createReadStream(__dirname + "/sample-data.txt");
// var writeStream = fs.createWriteStream(__dirname + "/output.txt");

// // Long Method To Proccess Data File
// readStream.on("data", function (chunk) {
//    console.log("New Data Received :");
//    console.log(chunk);
//    writeStream.write(chunk);
// });

// Elegent Way to handling long data files
// readStream.pipe(writeStream);

//  Handling data on client side
var server = http.createServer(function (req, res) {
   console.log("Request was made : " + req.url);
   res.writeHead(200, { "Content-Type": "text/plain" });

   // Reading file from local
   var readStream = fs.createReadStream(__dirname + "/sample-data.txt"); // Remove utf-8 to see buffers
   readStream.pipe(res);
});

server.listen(9000);
console.log("Server started on port 9000");
