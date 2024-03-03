class ApiError extends Error{ //Extends the build in javascript error class
    constructor(statusCode, message = "Something Went Wrong" , error =[],stack =""){

        super(message); //This line calls the constructor of the 
                        //parent Error class with the message parameter.
                        //This sets the error message.
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.error = error;

        // if(stack){
        //     this.stack = stack;
        // }else{
        //     Error.captureStackTrace(this, this.constructor);
        // }

    }
}
export default ApiError;