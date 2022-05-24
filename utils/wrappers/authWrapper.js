import jwt from "jsonwebtoken";
import httpCodes from "utils/httpCode";
import Strings from "utils/Strings";

export default async function (req, res, func) {
    const { authorization } = req.headers;
    const { userId } = jwt.verify(
        authorization,
        process.env.JWT_SECRET,
        (err, user) => {
            if (user.userId) {
                return func(req, res, user);
            }

            if (err)
                return res.status(httpCodes.Unauthorized).json({
                    code: httpCodes.Unauthorized,
                    errors: {},
                    message: Strings.errors.unauthorized,
                });
        }
    );
}
