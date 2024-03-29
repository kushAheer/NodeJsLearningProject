// function asyncHandler(fn) {
//     return  async function (req, res, next) {
//         try {
//             await fn(req, res, next);
//         } catch (error) {
//             res.status(err.code || 500).json({
//                 success : false,
//                 message : err.message  || "Internal Server Error",
//             })
//         }
//     };    
// }
const asyncHandler = (requestHandler) =>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
    }
}




export default asyncHandler