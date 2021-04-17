const router = require('express').Router();
// const { useParams } = require('react-router');
let User = require('../models/user');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/adduser').post((req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password; //encrypt
    const contactNo = req.body.contactNo;

    const newUser = new User({name, email, password, contactNo});
    newUser.save()
        .then(() => res.json("User Added"))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/login').post((req,res) => {
    User.findOne({email:req.body.email})
    .then(user => {
        console.log("USer", user)
        if(!user)
            res.sendStatus(204);
        else {
            if(user.password == req.body.password) {
                res.sendStatus(200)
            }
            else {
                res.sendStatus(204)
            }
        }
    })
})

module.exports = router;