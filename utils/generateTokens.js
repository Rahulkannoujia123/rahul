const jwt = require("jsonwebtoken");
const { userToken } = require("../models/usertoken");
const generateTokens = async (user) => {
  try {
    const payload = { _id: user._id };
    const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "20s",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESS_TOKEN_SECRET, {
      expiresIn: "30d",
    });

    const usertoken = await userToken.findOne({ userId: user._id });
    if (usertoken) await userToken.deleteOne({ userId: user._id });

    await new userToken({ userId: user._id, token: refreshToken }).save();
    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = { generateTokens };
