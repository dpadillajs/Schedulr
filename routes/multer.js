// Multer.js config for Disk storage. This package stores images as files on the server
// and serves them as static assets. More configuration can be done as needed, including
// only allowing specific file types / setting limits on file size etc..
// https://www.npmjs.com/package/multer

var multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

module.exports = multer({ storage: storage });
