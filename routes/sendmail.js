const express = require("express");
const nodemailer = require("nodemailer");
const router = new express.Router();
router.post("/email", async (req, res) => {
    const { from, to, html, subject, body } = req.body;

    async function main() {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            service: "gmail",
            secure: true, // true for 465, false for other ports
            auth: {
                user: "ashishbhu221306@gmail.com",
                pass: "yxduvewttyhxwwrd",
            },
        });

        let info = await transporter.sendMail({
            from,
            to,
            subject,
            text: body,
            attachments: [
                {
                    // utf-8 string as an attachment
                    filename: "text1.txt",
                    content: "hello world!",
                },
            ],
            html,
        });
        if (info.messageId) {
            res.json({
                success: true,
                message: "email send successfully",
            });
        } else {
            res.json({
                success: false,
                message: "emai not sent !",
            });
        }
    }

    main().catch();
});
module.exports = router;
