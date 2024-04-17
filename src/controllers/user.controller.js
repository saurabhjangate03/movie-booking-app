const { request } = require('express');
const User = require('../models/user.model');
const { v4: uuidv4 } = require('uuid');
const TokenGenerator = require('uuid-token-generator');
const tokgen = new TokenGenerator(); 

// signUp() - to create a USER object and save it in USER schema
const signUp = async (req, res) => {
  const { first_name, last_name ,email_address,password,mobile_number} = req.body;


  const uuid = uuidv4();
  const accessToken =  tokgen.generate();

  const crrCount = await User.countDocuments({});

  try {
    const user = new User({
      first_name: first_name,
      last_name: last_name,
      userid: crrCount + 1,
      last_name: last_name,
      email: email_address,
      contact: mobile_number,
      password: password,
      uuid: uuid,
      accesstoken: accessToken,
      isLoggedIn: true,
    });

   const newUser =  await user.save();

    res.status(201).json(newUser); 
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// login() - to check if the entered username and password match the data in USER schema
const login = async (req, res) => {
  const { email, password } = req.body;

  // Find the user in the database by username
  const user = await User.findOne({ email });

    // User not found
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    console.log(user);

    // Check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.json(user);
  
}

// logout() - This requires the unique Id of the logged-in person
const logout = async (req, res) => {
const {uuid} = req.body;
try {
    const user = await User.findOne({uuid});

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Set the user as logged out
    user.isLoggedIn = false;
    await user.save();

    res.status(200).json({ message: 'Logged Out successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to log out' });
  }
};


// Function to get coupon codes from the User model
const getCouponCodes = async (req, res) => {
    try {
      const userId = req.params.userId; // Assuming you have the userId as a parameter
  
      // Retrieve the User document by userId
      const user = await User.find({userid : userId});
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Extract the coupon codes from the user document
      const couponCodes = user.coupens;
  
      res.status(200).json(couponCodes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch coupon codes' });
    }
  };


  const bookShow = async (req, res) => {
    
    const {customerUuid , bookingRequest} = req.body;
    console.log(bookingRequest);
    try {
      const user = await User.findOne({uuid : customerUuid});
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
     
      console.log(user);

      // Add the booking request to the user's bookingRequests array
       user.bookingRequests.push(bookingRequest);
  
      // Save the updated user document
      await user.save();
  
      res.status(201).json({ message: 'Show booked successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to book show' });
    }
  };

module.exports = {signUp,login,logout,getCouponCodes,bookShow}