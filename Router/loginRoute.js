const express = require('express');
const loginController =require('../Controller/loginController')
const router = express.Router();

router.post('/', loginController.login);
router.get("/getusers", loginController.getUsers)
router.get("/getuser/:id", loginController.getUserById)
router.put("/update", loginController.updateProfile)


module.exports = router;
