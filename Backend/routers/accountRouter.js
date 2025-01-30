const { mongoose } = require("mongoose");
const { authMiddleware } = require("../Middlewares/authMiddleware");
const Account = require("../models/accountModel");

const router = require("express").Router();

router.get("/balance", authMiddleware, async (req, res) => {
    console.log(req.userId);
    const account = await Account.findOne({
        userId: req.userId,
    });

    if (!account) {
        console.log("Not");
    }

    res.json({
        balance: account.balance,
    });
});



router.post("/transfer", authMiddleware, async (req, res) => {

  const session = await mongoose.startSession();

  session.startTransaction();

    const { amount, to } = req.body;

    const account = await Account.findOne({
        userId: req.userId,
    }).session(session);

    if (!account || account.balance < amount) {
      await session.abortTransaction();
        res.status(400).json({
            message: "Innsufficient Balance",
        });
        return;
    }

    const toAccount = await Account.findOne({
        userId: to,
    });

    if (!toAccount) {
        res.status(400).json({
            message: "Invalid User",
        });
        return;
    }

    await Account.updateOne(
        {
            userId: req.userId,
        },
        {
            $inc: {
                balance: -amount,
            },
        }
    ).session(session);

    await Account.updateOne(
        {
            userId: to,
        },
        {
            $inc: {
                balance: amount,
            },
        }
    ).session(session);
    await session.commitTransaction();

    res.json({
        message: "Transfer Success",
    });
});


module.exports = router;
