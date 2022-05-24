import connectDb from "../../utils/connectDb";
import Dependents from "../../models/Dependents";
import utility from "../../utils/utility";
import bcrypt from "bcrypt";
import _ from "lodash";
import errorHandler from "../../utils/errorHandler";
import User from "models/Users";
import Staff from "models/Staff";
import jwt from "jsonwebtoken";
import httpCodes from "utils/httpCode";
import Strings from "utils/Strings";
import responseWrapper from "utils/wrappers/responseWrapper";
connectDb();

export default (req, res) => {
    switch (req.method) {
        case "GET":
            //handleGetRequest(req, res);
            break;
        case "DELETE":
            //handleDeleteRequest(req, res);
            break;
        case "POST":
            handlePostRequest(req, res);
            break;
        default:
            res.status(httpCodes.MethodNotAllowed).send(
                Strings.errors.methodNotAllowed
            );
            break;
    }
};

async function handlePostRequest(req, res) {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email }).select("+password");
        if (!user) {
            throw utility.customError(
                Strings.errors.credentialsError,
                httpCodes.NotFound
            );
        }
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) {
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );
            user = await User.findOne({ email });
            res.status(httpCodes.Ok).json(
                responseWrapper({ user, token }, {}, Strings.success.login)
            );
        } else {
            throw utility.customError(
                Strings.errors.credentialsError,
                httpCodes.Unauthorized
            );
        }
    } catch (error) {
        console.log(error);
        let simplifiedErr = errorHandler.serverErrorHandler(error);
        res.status(simplifiedErr.code).json(simplifiedErr);
    }
}
