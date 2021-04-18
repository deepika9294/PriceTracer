const validURL = require('valid-url');

const router = require('express').Router();
let User = require('../models/user');
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const sendMail = require('../utils/sendMailRegister');
var rand;


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
    rand=Math.floor((Math.random() * 100) + 54);

    sendMail(rand,newUser.email);
    
    newUser.save()
        .then(() => res.json("Please verify the account to login"))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/verify').get(async (req,res) => {
  console.log(req.protocol+":/"+req.get('host'));
  const host="http://localhost:5000";
  const loginLink = "http://localhost:3000/signin"
  if((req.protocol+"://"+req.get('host'))==host)
  {
      console.log("Domain is matched. Information is from Authentic email");
      if(req.query.id==rand)
      {
        console.log("email is verified");
        await User.findOne({email : req.query.email})
          .then(user => {
            user.name,
            user.email,
            user.contactNo,
            user.password,
            user.userVerified = true;
            user.save()
              .then(() => res.json('User is verified!'))
              .catch(err => res.status(400).json('Error: ' + err));
          })
          .catch(err => res.status(400).json('Error: ' + err));
        res.end("<h1>Email is been Successfully verified, <a href="+loginLink+">Click here to login</a><h1>");
      }
      else
      {
        console.log("Email is not verified");
        res.end("<h1>Bad Request</h1>");
      }
  }
  else
  {
      res.end("<h1>Request is from unknown source</h1>");
  }

})

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
        const isValidUser = user.userVerified;
        console.log("In login "+isValidUser);
        if (!isValidUser) return res.status(400).json({ msg: "No account with this email has been registered." });
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