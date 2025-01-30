const router = require('express').Router();

const userRouter = require('./userRouter');
const AccountRouter = require('./accountRouter');

router.use('/user',userRouter);
router.use('/account',AccountRouter);


module.exports = router;