import express from 'express';
import path from 'path';
const router = express.Router();
const pathToIndex = path.join(__dirname, '../../src/index.html');

router.get('/', (req, res) => res.sendFile(pathToIndex));
module.exports = router;
