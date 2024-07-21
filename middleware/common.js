const jwt = require("jsonwebtoken");
const verifyUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
         jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err)
                return res.status(401).json({
                    success: false,
                    message: err.message,
                });
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({
            success: false,
            message: "you are not authenticated",
        });
    }
};

// const checkRole = (role) => {
//   return (req, res, next) => {
//     if ((req, user.roles.includes(...role))) next();
//     res.status(401).res.json({
//       error: true,
//       message: "You are not authorized",
//     });
//   };
// };

module.exports = { verifyUser };
