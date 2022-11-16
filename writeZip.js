var fs = require("fs");
var archiver = require("archiver");

var output = fs.createWriteStream(__dirname + "/public/output.zip");
const archive = archiver("zip", {
   zlib: { level: 9 }, // Sets the compression level.
});

output.on("close", function () {
   console.log(archive.pointer() + " total bytes");
   console.log("archiver has been finalized and the output file descriptor has closed.");
});

output.on("end", function () {
   console.log("Data has been drained");
});

archive.on("error", function (err) {
   throw err;
});

archive.pipe(output);

archive.append(fs.createReadStream(__dirname + "/public/sample-data.txt"), { name: "file1.txt" });

archive.finalize();
