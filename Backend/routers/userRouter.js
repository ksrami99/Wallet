const router = require("express").Router();
const jwt = require("jsonwebtoken");
const zod = require("zod");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Account = require("../models/accountModel");
const { authMiddleware } = require("../Middlewares/authMiddleware");

const SignUpSchema = zod.object({
    username: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string().min(6),
});

router.post("/signup", async (req, res) => {
    const userData = {
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    };

    // input validation
    const { success } = SignUpSchema.safeParse(userData);
    if (!success) {
        res.status(411).json({
            message: "Email already taken / Incorrect inputs",
        });
        return;
    }

    // check if user already exist

    const existingUser = await User.findOne({
        username: userData.username,
    });
    if (existingUser) {
        res.status(411).json({
            message: "Email already taken / Incorrect inputs",
        });
        return;
    }
    // encrypt the password

    // bcrypt.hash(userData.password, 10, function (err, hash) {
    // userData.password = hash;
    // });

    const user = await User.create(userData);
    const userId = user._id;

    await Account.create({
        userId,
        balance: 10000,
    });

    const token = jwt.sign({ userId : userId}, process.env.JWT_SECRET);

    res.status(200).send({
        message: "User created successfully",
        token: `Bearer ${token}`,
    });
});

const SignInSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
});

router.post("/signin", async (req, res) => {
    // zod validation

    const { success } = SignInSchema.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Invalid Inputs",
        });
        return;
    }

    const userExists = await User.findOne({
        username: req.body.username,
    });

    if (!userExists) {
        res.status(411).json({
            message: "Incorrect inputs",
        });
        return;
    }

    const token = jwt.sign(
        { username: req.body.username },
        process.env.JWT_SECRET
    );

    // bcrypt.compare(
    //     req.body.password,
    //     userExists.password,
    //     function (err, result) {
    //         if (!result) {
    //         }
    //     }
    // );

    if (req.body.password !== userExists.password) {
        res.status(411).json({
            message: "Invalid Inputs",
        });
        return;
    }
    res.status(200).json({
        message: "Login Success!",
        token: `Bearer ${token}`,
    });
});

const updateBody = zod.object({
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
    password: zod.string().min(6).optional(),
});

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);

    if (!success) {
        res.status(411).json({
            message: "Invalid Inputs",
        });
        return;
    }

    await User.updateOne({ _id: req.userId }, req.body);

    res.json({
        message: "Updated Successfully",
    });
});

router.get("/bulk", async (req, res) => {
    const filter = req.body.filter || "";

    const users = await User.find({
        $or: [
            {
                firstname: {
                    $regex: filter,
                    $options: "i",
                },
            },
            {
                lastname: {
                    $regex: filter,
                    $options: "i",
                },
            },
        ],
    });

    res.json({
        user: users.map((user) => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id,
        })),
    });
});

module.exports = router;
