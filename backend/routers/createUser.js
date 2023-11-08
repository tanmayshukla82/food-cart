const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
router.post(
  "/createUser",
  body("email").isEmail(),
  body("name").isLength({ min: 5 }),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        location: req.body.location,
      }).then(res.json({success:true,userEmail:req.body.email}));
    } catch(error) {
      res.json({error:error});
    }
  }
);

//login router
router.post("/login", body("email").isEmail(), async (req, res) => {
  try{
    const jwttokenkey = "thisismyfirstjwt";
    let jwtData = {
      time: Date(),
      userId: 12,
    };
    const token = jwt.sign(jwtData, jwttokenkey);
    const data = await User.find({email:req.body.email});
    if(!data){
      res.status(400).send('Data not found');
    }
    const passData = data[0].password;
    const passwordCompare = await bcrypt.compare(req.body.password, passData);
    if(!passwordCompare){
      return res.json({success:false});
    }
    return res.json({success:true,token:token,userEmail:req.body.email});
  }catch(error){
    return res.json({error:error});
  }
});

module.exports = router;
