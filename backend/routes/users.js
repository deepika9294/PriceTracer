const validURL = require('valid-url');

const router = require('express').Router();
let User = require('../models/user');



router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/adduser').post((req,res) => {
   
    const newUser = new User();
    newUser.password = newUser.generateHash(req.body.password);
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.contactNo = req.body.contactNo;
    newUser.save()
        .then(() => res.json("User Added"))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post(async (req,res) => {
    await User.findOne({email:req.body.email})
    .then(user => {
        console.log("User", user)
        if(!user)
            res.sendStatus(204);
        else {
            if(user.comparePassword(req.body.password)) {
                res.sendStatus(200)
            }
            else {
                res.sendStatus(204)
            }
        }
    })
});





module.exports = router;