const express = require('express');
const SignupController = require('../Controller/SignupController')
const router = express.Router();

router.post('/', SignupController.signup );
router.delete('/delete/:id',SignupController.deleteUserById)

module.exports = router;

