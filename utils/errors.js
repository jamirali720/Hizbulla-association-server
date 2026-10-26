class AppError extends Error {
  constructor( statusCode = 500, message) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';   

    Error.captureStackTrace(this, this.constructor);
  }
}






// Catch async errors automatically (wrapper)
export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};




// Global error handling middleware
export const errorHandler = (err, req, res, next) => {  
  const statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";
  if (err.code === 11000) {
   const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    message= `Duplicate field value: "${value}". Please use another ${field}.`;
   
  }

  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: message,
    errorSources: err.errorSources || [],
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
  
};




export default AppError;