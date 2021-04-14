const router = require('express').Router();
let User = require('../models/user');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/adduser').post((req,res) => {
   
    const newUser = new User();
    user.password = user.generateHash(req.body.password);
    user.name = req.body.name;
    user.email = req.body.email;
    user.contactNo = req.body.contactNo;
    newUser.save()
        .then(() => res.json("User Added"))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/login').post((req,res) => {
    User.findOne({email:req.body.email})
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
})

module.exports = router;