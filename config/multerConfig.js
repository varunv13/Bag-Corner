const multer = require('multer');

const storage = multer.memoryStorage(); // data is uploaded in the memory
const upload = multer({ storage: storage });

module.exports = upload;