const unzipper = require("unzipper");
const fs = require("fs");

fs.createReadStream(__dirname + "/public/example.zip")
   .pipe(unzipper.Extract({ path: "dist" }))
   .on("close", () => {
      console.log("Files unzipped successfully");
   });
