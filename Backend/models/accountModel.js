const mongosoe = require("mongoose");

const accountSchema = mongosoe.Schema(
    {
        userId: {
            type: mongosoe.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        balance: {
            type: Number,
            required: true,
        },
    },
    { timeStamps: true }
);

const AccountModel = mongosoe.model('Account',accountSchema);

module.exports = AccountModel;