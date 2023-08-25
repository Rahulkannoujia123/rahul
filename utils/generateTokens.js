const jwt = require("jsonwebtoken");
const { userToken } = require("../models/usertoken");
const generateTokens = async (id) => {
  try {
    const payload = { id };
    const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "20s",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESS_TOKEN_SECRET, {
      expiresIn: "30d",
    });

    const usertoken = await userToken.findOne({ userId: id });
    if (usertoken) await userToken.deleteOne({ userId: id });

    await new userToken({ userId: id, token: refreshToken }).save();
    return Promise.resolve({
      accessToken: {
        token: accessToken,
        expiry: 20 * 1000,
      },
      refreshToken: {
        token: refreshToken,
        expiry: 30 * 24 * 60 * 60 * 1000,
      },
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = { generateTokens };
