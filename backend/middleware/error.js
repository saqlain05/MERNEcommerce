const ErrorHandler = require("../utils/errorHander")

module.exports = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Wrong Mongo DB ID Error
    if(err.name === "CastError"){
        const message = `Resource Not Found. Invalid: ${err.path}`;
        err = new ErrorHandler(message,404)
    }

    res.status(err.statusCode).json({
        success : false,
        message : err.message
    })
}