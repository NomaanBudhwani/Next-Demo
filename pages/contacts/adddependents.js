import React, { useEffect, useState, useRef } from "react";
import {
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
import dependent from "../../../data/dependent.json";
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

function AddDependents() {
    const [dependents, setDependents] = useState({});
    const [activeTab, setActiveTab] = useState("0");
    const [clientsData, setClientsData] = useState([]);
    const [info, setInfo] = useState({});
    const baseRef = useRef(null);

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
    const addMore = () => {
        setDependents((prevState) => ({
            ...prevState,
            ["dependent " + (Object.keys(dependents).length + 1)]:
                dependent["dependent"],
        }));
        setActiveTab(Object.keys(dependents).length.toString());
    };
    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(baseRef.current?.getReferences());
        let data = baseRef.current?.onSubmitForm();
        console.log("data", data);
        if (data) {
            createDependent(data);
        }
    };
    const createDependent = (data) => {
        HttpServiceManager.getInstance()
            .request(constant.dependent, data, "POST")
            .then((res) => {
                console.log(res);
                baseRef.current?.clearForm();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const renderClient = () => {
        return dependent["client"].map((fields, index) => {
            let field = { ...fields, dataType: clientsData };
            return getField(field, index);
        });
    };

    const getField = (field, index) => {
        switch (field.fieldType) {
            case "input":
                return <TextField key={field.id} {...field} />;
            case "checkBox":
                return <CheckBox key={field.id} {...field} />;
            case "dropdown":
                let dataType = info.relationship;
                // if (field.id == "companyType_id") {
                //     dataType = info.companyTypes;
                // }
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
    return (
        <>
            <GenricHeader title="Add Dependents" />
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
                                    {/* <Nav tabs>
                                    {dependents &&
                                        Object.keys(dependents).map(
                                            (item, index) => (
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
                                        {dependents &&
                                            Object.keys(dependents).map(
                                                (item, index) => (
                                                    <TabPane
                                                        tabId={index.toString()}
                                                    >
                                                        <Row>
                                                            {dependents[
                                                                item
                                                            ].map(
                                                                (
                                                                    fields,
                                                                    index
                                                                ) =>
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

AddDependents.layout = Admin;

export default AddDependents;
