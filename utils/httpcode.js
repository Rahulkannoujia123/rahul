const httpcodes = {
    notfound: {
        status: 404,
        message: "Not found",
    },
    unauthorized: {
        status: 401,
        message: "You are not authorized",
    },
    success: {
        status: 200,
        message: "Successfull",
    },
    fail: {
        status: 404,
        message: "Failed",
    },
    internalServerError: {
        status: 500,
        message: "internal server error",
    },
};

module.exports = httpcodes;
