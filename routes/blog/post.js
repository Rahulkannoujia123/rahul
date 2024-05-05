const express = require("express");
const checkrole = require("../../middleware/role");
const Post = require("../../models/blog/post");
const Category = require("../../models/blog/category");
const Author = require("../../models/blog/author");
const router = new express.Router();

router.get("/post", async (req, res) => {
    try {
        const posts = await Post.find(
            {},
            { title: 1, description: 1, thumbnail: 1, slug: 1 }
        ).populate("category");
        return res.json({
            posts: posts,
            success: true,
        });
    } catch (err) {
        return res.json({
            success: false,
            message: err.message,
        });
    }
});
router.get("/post/:id", async (req, res) => {
    const slug = req.params.id;
    try {
        const post = await Post.find({ slug });
        return res.json({
            post: post[0],
            success: true,
        });
    } catch (err) {
        return res.json({
            success: false,
            message: err.message,
        });
    }
});
router.post("/post", checkrole, async (req, res) => {
    const { title } = req.body;
    try {
        await new Post({
            ...req.body,
            slug: title.toLowerCase().trim().replace(/ /g, "-"),
        }).save(async (err, data) => {
            if (err) {
                res.json({ success: false, message: err.message });
            } else {
                res.json({
                    success: true,
                    message: "Published!",
                    post: data,
                });
                if (data.category) {
                    await Category.updateMany(
                        { _id: data.category },
                        {
                            $push: {
                                posts: data._id,
                            },
                        }
                    );
                }
                if (data.author) {
                    await Author.updateMany(
                        { _id: data.author },
                        {
                            $push: {
                                posts: data._id,
                            },
                        }
                    );
                }
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Internal server error",
        });
    }
});
router.put("/post/:id", checkrole, async (req, res) => {
    const id = req.params.id;
    const result = await Post.updateOne({ _id: id }, { ...req.body });
    result
        ? res.json({
              success: true,
              message: "updated successfully",
          })
        : res.json({
              success: false,
              message: "500",
          });
});
router.delete("/post/:id", checkrole, async (req, res) => {
    const id = req.params.id;
    try {
        await Post.deleteOne({ _id: id });
        return res.json({
            message: "Deleted",
            success: true,
        });
    } catch (err) {
        return res.json({
            success: false,
            message: err.message,
        });
    }
});
module.exports = router;
