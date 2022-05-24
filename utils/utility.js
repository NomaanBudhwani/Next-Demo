function formatSSN(value) {
    if (!value) return value;
    const ssn = value.replace(/[^\d]/g, "");
    const ssnLength = ssn.length;
    if (ssnLength < 4) return ssn;
    if (ssnLength < 7) {
        return `${ssn.slice(0, 3)}-${ssn.slice(3)}`;
    }
    return `${ssn.slice(0, 3)}-${ssn.slice(3, 5)}-${ssn.slice(5, 10)}`;
}
function formatEIN(value) {
    if (!value) return value;
    const ein = value.replace(/[^\d]/g, "");
    const einLength = ein.length;
    if (einLength <= 2) return ein;
    // if (einLength < 7) {
    //     return `${ein.slice(0, 3)}-${ein.slice(3)}`;
    // }
    return `${ein.slice(0, 2)}-${ein.slice(2, 9)}`;
}
function validSSN(value) {
    var re = /^[0-9]{3}\-?[0-9]{2}\-?[0-9]{4}$/;
    return re.test(value);
}
function validEIN(value) {
    var re = /^[0-9]{2}\-?[0-9]{7}$/;
    return re.test(value);
}
function validPhone(value) {
    var re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    return re.test(value);
}
function formatPhoneNumber(value) {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
        3,
        6
    )}-${phoneNumber.slice(6, 10)}`;
}
function formatNumber(value) {
    if (!value) return value;
    const number = value.replace(/[^\d]/g, "");
    return number;
}
function passwordGenerator(len) {
    var length = len ? len : 10;
    var string = "abcdefghijklmnopqrstuvwxyz"; //to upper
    var numeric = "0123456789";
    var punctuation = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    var password = "";
    var character = "";
    var crunch = true;
    while (password.length < length) {
        let entity1 = Math.ceil(string.length * Math.random() * Math.random());
        let entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
        let entity3 = Math.ceil(
            punctuation.length * Math.random() * Math.random()
        );
        let hold = string.charAt(entity1);
        hold = password.length % 2 == 0 ? hold.toUpperCase() : hold;
        character += hold;
        character += numeric.charAt(entity2);
        character += punctuation.charAt(entity3);
        password = character;
    }
    password = password
        .split("")
        .sort(function () {
            return 0.5 - Math.random();
        })
        .join("");
    return password.substr(0, len);
}
// async function cryptString(text) {
//     return await bcrypt.hash(text, 10);
// }
function customError(message, code) {
    let error = new Error(message);
    error.code = code;
    return error;
}
export default {
    formatSSN,
    validSSN,
    validEIN,
    formatPhoneNumber,
    validPhone,
    formatNumber,
    formatEIN,
    passwordGenerator,
    customError,
};
