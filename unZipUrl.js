const axios = require("axios");
const AdmZip = require("adm-zip");

async function get(url) {
   const options = {
      method: "GET",
      url: url,
      responseType: "arraybuffer",
   };
   const { data } = await axios(options);
   return data;
}

async function getAndUnZip(url) {
   const zipFileBuffer = await get(url);
   const zip = new AdmZip(zipFileBuffer);
   const entries = zip.getEntries();
   for (let entry of entries) {
      const buffer = entry.getData();
      console.log("File: " + entry.entryName + ", length (bytes): " + buffer.length + ", contents: " + buffer.toString("utf-8"));
   }
}

getAndUnZip("https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-zip-file.zip");
