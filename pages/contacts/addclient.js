import React, { useState, useEffect, useRef } from "react";
import {
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Button,
    Card,
    CardHeader,
    CardBody,
    Form,
    Container,
    Row,
    Col,
    CardFooter,
} from "reactstrap";
import Admin from "layouts/Admin.js";
import GenricHeader from "components/Headers/GenricHeader.js";
import classnames from "classnames";
import client from "../../data/client.json";
import {
    TextField,
    CheckBox,
    Dropdown,
    RadioButton,
    DateField,
    BaseComponent,
} from "components/Reusable";
import HttpServiceManager from "services/HttpServiceManager";
import constant from "../../constants";
import _ from "lodash";

function AddClient() {
    const [activeTab, setActiveTab] = useState("0");
    const [clients, setClients] = useState({});
    const [info, setInfo] = useState({});
    const baseRef = useRef(null);

    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    useEffect(() => {
        getInfo();
    }, []);

    useEffect(() => {
        updateClient();
    }, [info]);

    const getField = (field, index) => {
        switch (field.fieldType) {
            case "input":
                return <TextField key={field.id} {...field} />;
            case "checkBox":
                return <CheckBox key={field.id} {...field} />;
            case "dropdown":
                return <Dropdown key={field.id} {...field} />;
            case "radioButton":
                return (
                    <RadioButton
                        key={field.id}
                        {...field}
                        onChange={(value) => setValues(field.id, value)}
                    />
                );
            case "date":
                return <DateField key={field.id} {...field} />;
            default:
                break;
        }
    };
    const getInfo = () => {
        HttpServiceManager.getInstance()
            .request(constant.getInfo, null, "GET")
            .then((res) => {
                setInfo(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const updateClient = () => {
        let newClients = _.omit(client, "Spouse Information");
        newClients["Additional Information"][0]["dataType"] = info.addInfo;
        newClients["Filing Status"][0]["dataType"] = info.filingStatus;
        newClients["Filing Status"][1]["dataType"] = info.filingStatus;
        setClients(newClients);
    };
    const setValues = (key, value) => {
        if (key == "statusToDate") {
            let obj = info.filingStatus.find((item) => value == item._id);
            if (obj.name.includes("joint")) {
                setClients({ ...client });
            } else {
                setClients({ ..._.omit(client, "Spouse Information") });
            }
        }
        // setClientData((prevState) => ({ ...prevState, [key]: value }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(baseRef.current?.getReferences());
        let data = baseRef.current?.onSubmitForm();
        console.log({ data });
        if (data) {
            callClientAPI(data);
        }
    };
    const callClientAPI = (data) => {
        HttpServiceManager.getInstance()
            .request(constant.client, data, "POST")
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <GenricHeader title="Add Client" />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-1">
                        {/* <Form onSubmit={handleSubmit}> */}
                        <Card className="bg-secondary shadow">
                            <CardHeader
                                className="bg-white border-0"
                                style={{ paddingBottom: 0 }}
                            >
                                <Nav tabs>
                                    {Object.keys(clients).map((item, index) => (
                                        <NavItem key={item}>
                                            <NavLink
                                                className={classnames({
                                                    active:
                                                        activeTab ===
                                                        `${index}`,
                                                })}
                                                onClick={() => {
                                                    toggle(`${index}`);
                                                }}
                                            >
                                                {item}
                                            </NavLink>
                                        </NavItem>
                                    ))}
                                </Nav>
                            </CardHeader>
                            <BaseComponent ref={baseRef}>
                                <CardBody>
                                    <TabContent activeTab={activeTab}>
                                        {Object.keys(clients).map(
                                            (item, index) => (
                                                <TabPane
                                                    tabId={index.toString()}
                                                    key={index.toString()}
                                                >
                                                    <Row>
                                                        {clients[item].map(
                                                            (fields, index) =>
                                                                getField(
                                                                    fields,
                                                                    index
                                                                )
                                                        )}
                                                    </Row>
                                                </TabPane>
                                            )
                                        )}
                                    </TabContent>
                                </CardBody>
                            </BaseComponent>
                            <CardFooter>
                                <Row className="align-items-center">
                                    <Col className="text-center" xs="12">
                                        <Button
                                            color="primary"
                                            // href="#pablo"
                                            // onClick={(e) =>
                                            //     e.preventDefault()
                                            //     // console.log(e)
                                            // }
                                            onClick={handleSubmit}
                                        >
                                            Save
                                        </Button>
                                    </Col>
                                </Row>
                            </CardFooter>
                        </Card>
                        {/* </Form> */}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

AddClient.layout = Admin;

export default AddClient;
const INITIAL_CLIENT = {
    firstName: "",
    middleInitial: "",
    lastName: "",
    suffix: "",
    ssn: "",
    occupation: "",
    dob: "",
    dod: "",
    legallyBlind: false,
    totallyDisabled: false,
    claimedDependent: false,
    pef: false,
    homePhone: "",
    workPhone: "",
    cellPhone: "",
    email: "",
    idType: "",
    idNumber: "",
    idState: "",
    idIssueDate: "",
    idExpDate: "",
    statusOnReturn: "",
    statusToDate: "",
    spouseFirstName: "",
    spouseMiddleInitial: "",
    spouseLastName: "",
    spouseSuffix: "",
    spouseSsn: "",
    spouseOccupation: "",
    spouseDob: "",
    spouseDod: "",
    spouseLegallyBlind: false,
    spouseTotallyDisabled: false,
    spouseClaimedDependent: false,
    spousePef: false,
    Street: "",
    aptSuite: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
};
// const INITIAL_CLIENT = {
//     firstName: "Ali",
//     middleInitial: "T",
//     lastName: "Shah",
//     suffix: "Mr",
//     ssn: "456456464",
//     occupation: "unknown",
//     dob: "01/02/1996",
//     dod: "",
//     legallyBlind: false,
//     totallyDisabled: false,
//     claimedDependent: false,
//     pef: false,
//     homePhone: "4694554609",
//     workPhone: "4694554609",
//     cellPhone: "4694554609",
//     email: "alishah.solanki@gmail.com",
//     idType: "Driver's license",
//     idNumber: "5465464556",
//     idState: "Texas",
//     idIssueDate: "02/05/2002",
//     idExpDate: "02/05/2006",
//     statusOnReturn: "",
//     statusToDate: "",
//     spouseFirstName: "Maxus",
//     spouseMiddleInitial: "MM",
//     spouseLastName: "Dull",
//     spouseSuffix: "Ms",
//     spouseSsn: "156465156",
//     spouseOccupation: "testing",
//     spouseDob: "19/02/1996",
//     spouseDod: "",
//     spouseLegallyBlind: false,
//     spouseTotallyDisabled: false,
//     spouseClaimedDependent: false,
//     spousePef: false,
//     Street: "3536 esidenhower st",
//     aptSuite: "dsada",
//     city: "Carrollton",
//     state: "Texas",
//     zipCode: "75006",
//     country: "United State",
// };
