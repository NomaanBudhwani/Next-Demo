const errors = {
    email: "Please enter a vaild email address",
    generic: "Please enter a vaild $field",
    dob: "Please enter select date",
    dob: "Please enter vaild date of death",
    empty: "Please enter $field",
    errLength: "$field must be min 3 to max 60 characters",
    onlyAlpha: "Please enter only alphabets",
    radio: "Please select any one option",
    unprocessableEntity: "Entity cannot be processed",
    credentialsError: "Your email and password do not match. Please try again.",
    passwordNotMatch: "Your password do not match. Please try again.",
    methodNotAllowed: "This method is not allowed",
    unauthorized: "Login expired!, Please login again",
};
const success = {
    login: "Login successful",
    passwordUpdate: "Password updated successfully",
};
export default { errors, success };
