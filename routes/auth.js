const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { generateTokens } = require("../utils/generateTokens");
const { verifyRefreshToken } = require("../utils/verifyRefreshToken");
const user = require("../models/user");
const router = new express.Router();
const refreshTokens = [];
router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;
    const encriptedPassword = await bcrypt.hash(password, 10);
    try {
        const isExistingUser = await User.findOne({ email });
        if (isExistingUser != null) {
            return res.json({ success: false, message: "user already exist" });
        } else {
            await new User({
                name,
                email,
                password: encriptedPassword,
                roles: ["user"],
            }).save((err, data) => {
                if (err) {
                    res.json({
                        success: false,
                        message: err,
                    });
                } else {
                    res.json({
                        success: true,
                        data: {
                            user: data,
                        },
                    });
                }
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err || "inetrnal server error",
        });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: "invalid email or password",
            });
        }
        const verifiedPassword = await bcrypt.compare(password, user.password);
        if (!user || !verifiedPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        } else {
            const { accessToken, refreshToken } = await generateTokens(user);

            res.status(200).json({
                success: true,
                data: {
                    user,
                    tokens: {
                        access: {
                            token: accessToken.token,
                            expiresAt: new Date(Date.now() + accessToken.expiry),
                        },
                        refresh: {
                            token: refreshToken.token,
                            expiresAt: new Date(Date.now() + refreshToken.expiry),
                        },
                    },
                },
                message: "Logged in sucessfully",
            });
            refreshTokens.push(refreshToken.token);
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

router.post("/refresh", async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) {
            return res.status(403).json({
                success: false,
                message: "You not authenticated !",
            });
        } else {
            verifyRefreshToken(req.body.refreshToken).then(async ({ tokenDetails }) => {
                const { accessToken, refreshToken } = await generateTokens(tokenDetails._id);
                res.status(200).json({
                    success: true,
                    data: {
                        tokens: {
                            access: {
                                token: accessToken.token,
                                expiresAt: new Date(Date.now() + accessToken.expiry),
                            },
                            refresh: {
                                token: refreshToken.token,
                                expiresAt: new Date(Date.now() + refreshToken.expiry),
                            },
                        },
                    },
                    message: "Logged in sucessfully",
                });
            });
        }
    } catch {
        return res.status(403).json({
            success: false,
            message: "You not authenticated !",
        });
    }
});

router.patch("/reset-password", async (req, res) => {
    try {
        const { email, password, newpassword } = req.body;
        const user = await User.findOneAndUpdate(email, {
            $set: { password: newpassword },
        });
        if (user) {
            console.log(user);
            res.json({
                message: "Password reset successfully",
                success: true,
            });
        } else {
            res.json({
                message: "",
                success: false,
            });
        }
    } catch (err) {
        res.json({
            success: false,
            message: err.message,
        });
    }
});

router.post("/google-login", async (req, res) => {
    const { email, name } = req.body;
    const password = await bcrypt.hash("762354", 10);
    const currentUser = await User.findOne({ email });
    if (currentUser) {
        const { accessToken, refreshToken } = await generateTokens(currentUser._id);

        res.json({
            success: true,
            message: "signedin",
            data: {
                user: currentUser,
                tokens: {
                    access: {
                        token: accessToken.token,
                        expiresAt: new Date(Date.now() + accessToken.expiry),
                    },
                    refresh: {
                        token: refreshToken.token,
                        expiresAt: new Date(Date.now() + refreshToken.expiry),
                    },
                },
            },
        });
    } else {
        await new User({
            name,
            email,
            password,
            roles: ["user"],
        }).save(async (err, data) => {
            if (err) {
                return res.json({
                    success: false,
                    message: err,
                });
            } else {
                const { accessToken, refreshToken } = await generateTokens(data._id);

                return res.json({
                    success: true,
                    message: "signedin",
                    data: {
                        user: data,
                        tokens: {
                            access: {
                                token: accessToken.token,
                                expiresAt: new Date(Date.now() + accessToken.expiry),
                            },
                            refresh: {
                                token: refreshToken.token,
                                expiresAt: new Date(Date.now() + refreshToken.expiry),
                            },
                        },
                    },
                });
            }
        });
    }
});

module.exports = router;
