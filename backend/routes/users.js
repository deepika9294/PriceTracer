const validURL = require('valid-url');

const router = require('express').Router();
let User = require('../models/user');
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");


router.get('/', auth, async(req, res) => {
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
        if(!user) {
            return res
            .status(400)
            .json({ msg: "No account with this email has been registered." });
        }
           
        const isMatch = user.comparePassword(req.body.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        console.log("token",token);
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    })
    .catch(err => res.status(500).json('Error: ' + err));
});

router.post("/tokenIsValid", async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) 
      {
        return res.json(false);
      }
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) return res.json(false);
  
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);
  
      return res.json(true);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });




module.exports = router;