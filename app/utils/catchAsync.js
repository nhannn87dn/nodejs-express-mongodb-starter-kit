// const catchAsync = (fn)=>(req, res, next) =>{
//     Promise.resolve(fn(req,res, next)).catch((error)=> next(error));
// }

const catchAsync = fn => {
    return (req, res, next) => {
      fn(req, res, next).catch(next);
    };
  };

module.exports = catchAsync;