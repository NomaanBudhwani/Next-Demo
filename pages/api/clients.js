import connectDb from "../../utils/connectDb";
import Client from "../../models/Client";
import utility from "../../utils/utility";
import bcrypt from "bcrypt";
import _ from "lodash";
import errorHandler from "../../utils/errorHandler";

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
            data = await Client.find({
                $expr: {
                    $regexMatch: {
                        input: { $concat: ["$firstName", " ", "$lastName"] },
                        regex: name,
                        options: "i",
                    },
                },
            }).select("firstName lastName cellPhone email state");
        } else {
            data = await Client.find().select(
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

        if (!_.isEmpty(data["spouseSsn"])) {
            data["spouseSsn"] = await bcrypt.hash(
                data["spouseSsn"].replace("/-/g", ""),
                10
            );
        }

        const client = await new Client(req.body).save();

        res.status(201).json({ data: client, meta: {} });
    } catch (error) {
        console.log(error);
        let simplifiedErr = errorHandler.serverErrorHandler(error);
        res.status(simplifiedErr.code).json(simplifiedErr.errors);
    }
}
