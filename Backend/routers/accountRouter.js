const { authMiddleware } = require('../Middlewares/authMiddleware');
const Account = require('../models/accountModel');

const router = require('express').Router();


router.get('/balance',authMiddleware ,async (req, res) => {

console.log(req.userId);
  const account = await Account.findOne({
    userId: req.userId
  })

  if(!account){
    console.log("Not");
  }

  res.json({
    balance: account.balance
  })

})



router.post('/transfer',() => {
  
})


module.exports = router;