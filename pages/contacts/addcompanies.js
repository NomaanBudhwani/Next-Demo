import React, { useEffect, useState, useRef } from "react";
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
    Container,
    Row,
    Col,
    CardFooter,
} from "reactstrap";
import Admin from "layouts/Admin.js";
import GenricHeader from "components/Headers/GenricHeader.js";
import classnames from "classnames";
import company from "../../../data/company.json";
import {
    TextField,
    CheckBox,
    Dropdown,
    RadioButton,
    AutoComplete,
    BaseComponent,
} from "components/Reusable";
import HttpServiceManager from "services/HttpServiceManager";
import constant from "../../constants";

function addCompanies() {
    const [companies, setCompanies] = useState({});
    const [activeTab, setActiveTab] = useState("0");
    const [clientsData, setClientsData] = useState([]);
    const [info, setInfo] = useState({});
    const baseRef = useRef(null);

    // const [compainesData, setComapaniesData] = useState([]);

    useEffect(() => {
        getInfo();
        getClients();
        addMore();
    }, []);

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
    const getClients = () => {
        HttpServiceManager.getInstance()
            .request(constant.client, null, "GET")
            .then((res) => {
                let data = res.data.map((item) => ({
                    ...item,
                    name: item.firstName + " " + item.lastName,
                }));
                setClientsData(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const getField = (field, index) => {
        switch (field.fieldType) {
            case "input":
                return <TextField key={field.id} {...field} />;
            case "checkBox":
                return <CheckBox key={field.id} {...field} />;
            case "dropdown":
                let dataType = info.relations;
                if (field.id == "companyType_id") {
                    dataType = info.companyTypes;
                }
                return (
                    <Dropdown key={field.id} {...field} dataType={dataType} />
                );
            case "radioButton":
                return <RadioButton key={field.id} {...field} />;
            case "autoComplete":
                return <AutoComplete key={field.id} {...field} />;
            default:
                break;
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(baseRef.current?.getReferences());
        let data = baseRef.current?.onSubmitForm();
        if (data) {
            createCompany(data);
        }
    };
    const createCompany = (data) => {
        HttpServiceManager.getInstance()
            .request(constant.companies, data, "POST")
            .then((res) => {
                console.log(res);
                baseRef.current?.clearForm();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const addMore = () => {
        console.log(company["company"]);
        setCompanies((prevState) => ({
            ...prevState,
            ["Company " + (Object.keys(companies).length + 1)]:
                company["company"],
        }));
        setActiveTab(Object.keys(companies).length.toString());
    };
    const renderCompany = (companies) => {
        return Object.keys(companies).map((key, index) => {
            return Object.keys(companies[key]).map((group, i) => {
                return (
                    <TabPane tabId={index.toString()}>
                        <h6 className="heading-small text-muted mb-4">
                            {group}
                        </h6>
                        <Row>
                            {companies[key][group].map((field, x) => {
                                return getField(field, x);
                            })}
                        </Row>
                    </TabPane>
                );
            });
        });
    };
    const renderClient = () => {
        return company["client"].map((fields, index) => {
            let field = { ...fields, dataType: clientsData };
            return getField(field, index);
        });
    };

    return (
        <>
            <GenricHeader title="Add Companies" />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-1">
                        <BaseComponent ref={baseRef}>
                            <Card className="bg-secondary shadow">
                                <CardHeader
                                    className="bg-white border-0"
                                    style={{ paddingBottom: 0 }}
                                >
                                    <Row>{renderClient()}</Row>

                                    {/* <Nav tabs> //Add Multiple Companies Version 2
                                        {companies &&
                                            Object.keys(companies).map(
                                                (item, index) => (
                                                    <NavItem key={item}>
                                                        <NavLink
                                                            className={classnames(
                                                                {
                                                                    active:
                                                                        activeTab ===
                                                                        `${index}`,
                                                                }
                                                            )}
                                                            onClick={() => {
                                                                toggle(
                                                                    `${index}`
                                                                );
                                                            }}
                                                        >
                                                            {item}
                                                        </NavLink>
                                                    </NavItem>
                                                )
                                            )}
                                        <NavItem key={"addmore"}>
                                            <NavLink
                                                //className={classnames({})}
                                                onClick={addMore}
                                            >
                                                <i className="fas fa-plus"></i>
                                            </NavLink>
                                        </NavItem>
                                    </Nav> */}
                                </CardHeader>
                                <CardBody>
                                    <TabContent activeTab={activeTab}>
                                        {companies && renderCompany(companies)}
                                    </TabContent>
                                </CardBody>
                                <CardFooter>
                                    <Row className="align-items-center">
                                        <Col className="text-center" xs="12">
                                            <Button
                                                color="primary"
                                                href="#pablo"
                                                onClick={handleSubmit}
                                            >
                                                Save
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardFooter>
                            </Card>
                        </BaseComponent>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

addCompanies.layout = Admin;

export default addCompanies;
const INITIAL_COMPANY = {
    client_id: "",
    relation_id: "",
    companyName: "",
    companyEmail: "",
    ein: "",
    companyType_id: "",
    street: "",
    aptSuite: "",
    city: "",
    zipCode: "",
    accountingServices: false,
    advisoryServices: false,
    financingService: false,
    taxPreparation: false,
};
