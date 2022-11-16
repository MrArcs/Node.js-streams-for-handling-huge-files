var fs = require("fs");
var zlib = require("zlib");

// create readable stream to read compressed file
var readStream = fs.createReadStream(__dirname + "/public/file.txt.gz");
const writeStream = fs.createWriteStream("output.txt");

// console.log(readStream);

const unzip = zlib.createGunzip();

readStream.pipe(unzip).pipe(writeStream);
