import asyncHandler from "../utils/asyncHandler.js";

const resgisterUser = asyncHandler(async (req, res, next) => {
    return res.status(200).json({
        message :"ok",
    })
});


export  {resgisterUser};