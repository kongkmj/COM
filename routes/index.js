const express = require('express');
const router = express.Router();

// Get Hompage
router.get('/dashboard',ensureAuthenticated,function (req,res) {
      res.render('partials/body/dashboard',{name:req.user.name});
});

function ensureAuthenticated(req,res,next) {
  if(req.isAuthenticated()){
    return next();
  }else{
    req.flash('error_msg','You are not logged in');
    res.redirect('/users/login');
  }
}


module.exports = router;
