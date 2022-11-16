const express = require("express");
const app = express();
const port = 9000;

var fs = require("fs");

// File system processed with ADM-ZIP
const AdmZip = require("adm-zip");
var uploadDir = fs.readdirSync(__dirname + "/public");

// File system processed with JSZIP
const archiver = require("archiver");

// admzip
// app.get("/admzip", (req, res) => {
//    const zip = new AdmZip();

//    // counting number of files in upload folder
//    for (var i = 0; i < uploadDir.length; i++) {
//       zip.addLocalFile(__dirname + "/upload/" + uploadDir[i]);
//    }

//    // Define zip file name
//    const downloadName = `${Date.now()}.zip`;

//    // procesed using buffer not on disk file directly
//    const data = zip.toBuffer();

//    // save file zip in root directory
//    // zip.writeZip(__dirname + "/upload/" + downloadName);

//    // code to download zip file

//    res.set("Content-Type", "application/octet-stream");
//    res.set("Content-Disposition", `attachment; filename=${downloadName}`);
//    res.set("Content-Length", data.length);
//    res.send(data);
// });

app.get("/archive", (req, res) => {
   var output = fs.createWriteStream("sample.pdf");
   var archive = archiver("zip");

   output.on("close", function () {
      console.log(archive.pointer() + " total bytes");
      console.log("archiver has been finalized and the output file descriptor has closed.");
   });

   archive.on("error", function (err) {
      throw err;
   });

   archive.pipe(output);

   // append files from a sub-directory, putting its contents at the root of archive
   //  archive.directory(source_dir, false);

   // append files from a sub-directory and naming it `new-subdir` within the archive
   //

   archive.directory("subdir/", "new-subdir");

   archive.finalize();
});

app.listen(port, () => console.log(`Server started on port ${port}`));
