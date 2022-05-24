import connectDb from "utils/connectDb";
import AddInfo from "models/AddInfo";
import FilingStatus from "models/FilingStatus";
import CompanyTypes from "models/CompanyTypes";
import Relations from "models/Relations";
import Relationship from "models/Relationship";
import WorkLocation from "models/WorkLocation";
import Department from "models/Department";
import Roles from "models/Roles";

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
            //res.status(405).send(`Method ${req.method} not allowed`);
            break;
    }
};

async function handleGetRequest(req, res) {
    try {
        const addInfo = await AddInfo.find();
        const filingStatus = await FilingStatus.find();
        const companyTypes = await CompanyTypes.find();
        const relations = await Relations.find();
        const relationship = await Relationship.find();
        const department = await Department.find();
        const workLocation = await WorkLocation.find();
        const roles = await Roles.find();

        let data = {
            addInfo,
            filingStatus,
            companyTypes,
            relations,
            relationship,
            department,
            workLocation,
            roles,
        };
        res.status(200).json({ data, meta: {} });
    } catch (error) {
        console.log("error", error);
        res.status(500).send("Server error in getting info");
    }
}
async function handlePostRequest(req, res) {
    try {
        let { type, name } = req.body;
        let obj = null;

        switch (type) {
            case "AddInfo":
                obj = await new AddInfo({ name }).save();
                break;
            case "FilingStatus":
                obj = await new FilingStatus({ name }).save();
                break;
            case "CompanyTypes":
                obj = await new CompanyTypes({ name }).save();
                break;
            case "Relations":
                obj = await new Relations({ name }).save();
                break;
            case "Relationship":
                obj = await new Relationship({ name }).save();
                break;
            case "Department":
                obj = await new Department({ name }).save();
            case "WorkLocation":
                obj = await new WorkLocation({ name }).save();
            case "Roles":
                obj = await new Roles({ name }).save();
            default:
                break;
        }
        res.status(201).json(obj);
    } catch (error) {
        console.log("error", error);
        res.status(500).send("Server error in creating product");
    }
}
