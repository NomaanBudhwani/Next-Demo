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
import authWrapper from "utils/wrappers/authWrapper";
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
            authWrapper(req, res, handlePostRequest);
            // handlePostRequest(req, res);
            break;
        default:
            return res.status(405).send(`Method ${req.method} not allowed`);
    }
};

async function handlePostRequest(req, res, u) {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const { authorization } = req.headers;

    try {
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
        console.log("id", userId);
        let user = await User.findOne({ _id: userId }).select("+password");
        if (!user) {
            throw utility.customError(
                Strings.errors.passwordNotMatch,
                httpCodes.NotFound
            );
        }
        const passwordsMatch = await bcrypt.compare(oldPassword, user.password);

        if (newPassword === confirmPassword && passwordsMatch) {
            let newPass = await bcrypt.hash(newPassword, 10);
            let updatedUser = await User.updateOne(
                { _id: userId },
                {
                    password: newPass,
                    isFirstLogin: false,
                }
            );
            return res
                .status(httpCodes.Ok)
                .json(
                    responseWrapper(
                        updatedUser,
                        {},
                        Strings.success.passwordUpdate
                    )
                );
        } else {
            throw utility.customError(
                Strings.errors.passwordNotMatch,
                httpCodes.UnprocessableEntity
            );
        }
    } catch (error) {
        console.log(error);
        let simplifiedErr = errorHandler.serverErrorHandler(error);
        return res.status(simplifiedErr.code).json(simplifiedErr);
    }
}
