const jwt = require("jsonwebtoken");
const { userToken } = require("../models/usertoken");
const verifyRefreshToken = refreshToken => {
    const privateKey = process.env.REFRESS_TOKEN_SECRET;
    return new Promise((resolve, reject) => {
        userToken.findOne({ token: refreshToken }, (err, doc) => {
            // if (!doc) return reject({ success: true, message: "Refresh token not matched" });
            jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
                if (err) return reject({ success: true, message: "Invalid refresh token" });
                resolve({
                    tokenDetails,
                    error: false,
                    message: "Valid refresh token",
                });
            });
        });
    });
};
module.exports = { verifyRefreshToken };
