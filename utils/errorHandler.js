import httpCodes from "./httpCode";
import Strings from "./Strings";

function serverErrorHandler(error) {
    //MonogoDB Validation Error Case
    let code = error.code;
    let message = error.message;
    let errors = {};

    if (error.errors) {
        //Get All Errors keys
        let allErrors = Object.keys(error.errors).map((key) => {
            return { [key]: error.errors[key].message };
        });
        code = httpCodes.UnprocessableEntity;
        errors = allErrors;
        message = Strings.errors.unprocessableEntity;
    }
    // else {
    //     return {
    //         code: httpCodes.InternalServerError,
    //         errors: { message: "Server Internal Error" },
    //     };
    // }
    return { code, errors, message };
}

function clientErrorHandler(error) {}

export default {
    serverErrorHandler,
    clientErrorHandler,
};
