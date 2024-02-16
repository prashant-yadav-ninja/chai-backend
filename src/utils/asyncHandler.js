const asyncHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

// const asyncHandler = ()=>{}

// const asyncHandler = (function)=>{}

// const asyncHandler = (function) => { ()=>{} }

// const asyncHandler = (requestHandler) => async(req,res,next)=> {
//     try {
//         await requestHandler(req,res,next)
//     } catch (error) {
//         res.status(error.status || 500).json({
//             success:false,
//             message:error.message
//         })
//     }
// }
