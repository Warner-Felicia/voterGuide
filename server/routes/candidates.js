//imports
const express = require('express');
const multer = require('multer');

const Candidate = require('../models/candidate');
const candidatesController = require('../controllers/candidates');

const router = express.Router();

const upload = multer({ dest: './server/public/uploads/temp/csv' });

router.get('/', candidatesController.getCandidates);

router.post('/', upload.single("candidateCSV"), candidatesController.postUploadCandidates);

module.exports = router;