const express = require('express');
const router = express.Router();
const path = require('path');
const pathToIndex = path.join(__dirname, '../../src/index.html');

router.get('/', (request, response) => {
   response.sendFile(pathToIndex);
});
module.exports = router;
