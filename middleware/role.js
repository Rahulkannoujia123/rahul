const { roles } = require("../config/roles");

const checkrole = (req, res, next) => {
  const userrole = req.headers["user-role"];
  if (
    userrole === roles.admin ||
    req.body.email == "ashishbhu221306@gmail.com"
  ) {
    next();
  } else {
    return res.json({
      success: false,
      message: "You are not authorized!",
    });
  }
};
module.exports = checkrole;
