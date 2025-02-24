const multer = require("multer")

const storage = multer.memoryStorage(); // Store file in memory instead of disk

const upload = multer({ storage: storage });
exports.upload = upload;
