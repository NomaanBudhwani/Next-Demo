import connectDb from "../../utils/connectDb";
import Staff from "models/Staff";
import Users from "models/Users";
import utility from "../../utils/utility";
import bcrypt from "bcrypt";
import _ from "lodash";
import errorHandler from "utils/errorHandler";
import mailer from "utils/mailer";
import jwt from "jsonwebtoken";

connectDb();

export default (req, res) => {
    switch (req.method) {
        case "GET":
            handleGetRequest(req, res);
            break;
        case "DELETE":
            //handleDeleteRequest(req, res);
            break;
        case "POST":
            handlePostRequest(req, res);
            break;
        default:
            res.status(405).send(`Method ${req.method} not allowed`);
            break;
    }
};
async function handleGetRequest(req, res) {
    try {
        const { name } = req.query;
        let data = [];
        if (name) {
            data = await Staff.find({
                $expr: {
                    $regexMatch: {
                        input: { $concat: ["$firstName", " ", "$lastName"] },
                        regex: name,
                        options: "i",
                    },
                },
            }).select("firstName lastName cellPhone email dob");
        } else {
            data = await Staff.find().select(
                "firstName lastName cellPhone email state"
            );
        }
        res.status(200).json({ data, meta: {} });
    } catch (error) {
        console.log("error", error);
        res.status(500).send("Server error in creating product");
    }
}
async function handlePostRequest(req, res) {
    try {
        let data = req.body;
        data["ssn"] = await bcrypt.hash(data["ssn"].replace("/-/g", ""), 10);
        if (_.isEmpty(data["supervisorId"])) {
            data = _.omit(data, "supervisorId");
        }
        //Create Staff
        const staff = await new Staff(data).save();

        //Covert Temp password to hash
        let genPwd = utility.passwordGenerator(10);
        let hashPwd = await bcrypt.hash(genPwd, 10);

        //Create Staff as User
        let usrData = {
            username: staff.firstName,
            email: staff.emailAssigned,
            password: hashPwd,
            token: "",
            roleId: staff.roleId,
            staffId: staff._id,
            isFirstLogin: true,
        };

        let user = await new Users(usrData).save();

        //Call Mailer
        await mailer.newUserAccount(
            "\\utils\\html\\newuser.html",
            data["emailAssigned"],
            "User has been Created",
            {
                email: data["emailAssigned"],
                password: genPwd,
            }
        );

        res.status(201).json({ data: staff, meta: {} });
    } catch (error) {
        console.log(error);
        let simplifiedErr = errorHandler.serverErrorHandler(error);
        res.status(simplifiedErr.code).json(simplifiedErr.errors);
    }
}
