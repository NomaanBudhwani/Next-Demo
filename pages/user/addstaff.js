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
import staff from "data/staff.json";
import {
    TextField,
    CheckBox,
    Dropdown,
    RadioButton,
    AutoComplete,
    BaseComponent,
    DateField,
} from "components/Reusable";
import HttpServiceManager from "services/HttpServiceManager";
import constant from "../../constants";

function addStaff() {
    const [staffs, setStaffs] = useState({});
    const [activeTab, setActiveTab] = useState("0");
    const [staffData, setStaffData] = useState([]);
    const [info, setInfo] = useState({});
    const baseRef = useRef(null);

    useEffect(() => {
        getInfo();
        getStaff();
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
    const getStaff = () => {
        HttpServiceManager.getInstance()
            .request(constant.staff, null, "GET")
            .then((res) => {
                let data = res.data.map((item) => ({
                    ...item,
                    name: item.firstName + " " + item.lastName,
                }));
                setStaffData(data);
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
                let dataType = info.department;
                if (field.id == "workLocationId") {
                    dataType = info.workLocation;
                } else if (field.id == "supervisorId") {
                    dataType = staffData;
                } else if (field.id == "roleId") {
                    dataType = info.roles;
                }
                return (
                    <Dropdown key={field.id} {...field} dataType={dataType} />
                );
            case "radioButton":
                return <RadioButton key={field.id} {...field} />;
            case "autoComplete":
                return <AutoComplete key={field.id} {...field} />;
            case "date":
                return <DateField key={field.id} {...field} />;
            default:
                break;
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(baseRef.current?.getReferences());
        let data = baseRef.current?.onSubmitForm();
        console.log({ data });

        if (data) {
            createStaff(data);
        }
    };
    const createStaff = (data) => {
        HttpServiceManager.getInstance()
            .request(constant.staff, data, "POST")
            .then((res) => {
                console.log(res);
                baseRef.current?.clearForm();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const addMore = () => {
        setStaffs((prevState) => ({
            ...prevState,
            ["staff " + (Object.keys(staff).length + 1)]: staff["staff"],
        }));
        setActiveTab(Object.keys(staffs).length.toString());
    };
    const renderUsers = (staffs) => {
        return Object.keys(staffs).map((key, index) => {
            return Object.keys(staffs[key]).map((group, i) => {
                return (
                    <TabPane tabId={index.toString()}>
                        <h6 className="heading-small text-muted mb-4">
                            {group}
                        </h6>
                        <Row>
                            {staffs[key][group].map((field, x) => {
                                return getField(field, x);
                            })}
                        </Row>
                    </TabPane>
                );
            });
        });
    };

    return (
        <>
            <GenricHeader title="Add Staff" />
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
                                    {/* <Row>{renderClient()}</Row> */}

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
                                        {staffs && renderUsers(staffs)}
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

addStaff.layout = Admin;

export default addStaff;
