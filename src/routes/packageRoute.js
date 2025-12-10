const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');

router.get('/', packageController.getPackages);

router.get('/:id', packageController.getPackageDetail);

router.post('/', packageController.createNewPackage);

router.put('/:id', packageController.updatePackageInfo);

router.delete('/:id', packageController.deletePackage);

module.exports = router;