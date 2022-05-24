import React, { useState, useEffect } from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
    Table,
    Progress,
    Pagination,
    PaginationItem,
    PaginationLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
} from "reactstrap";
import Admin from "layouts/Admin.js";
import {
    TextField,
    CheckBox,
    Dropdown,
    RadioButton,
    AutoComplete,
} from "components/Reusable";

import GenricHeader from "components/Headers/GenricHeader.js";
import HttpServiceManager from "services/HttpServiceManager";
import constant from "../../constants";

function Clients() {
    const [clientsData, setClientsData] = useState([]);

    useEffect(() => {
        getClients();
    }, []);

    const getClients = () => {
        HttpServiceManager.getInstance()
            .request(constant.client, null, "GET")
            .then((res) => {
                setClientsData(res.data);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <GenricHeader title="Clients" />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-1">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <UncontrolledDropdown>
                                            <DropdownToggle caret>
                                                More
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem>
                                                    Archive
                                                </DropdownItem>
                                                <DropdownItem>
                                                    Group Seleted
                                                </DropdownItem>
                                                <DropdownItem>
                                                    Assign Group
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                        <UncontrolledDropdown>
                                            <DropdownToggle caret>
                                                Filter
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem disabled>
                                                    Archive
                                                </DropdownItem>
                                                <DropdownItem>
                                                    Group Seleted
                                                </DropdownItem>
                                                <DropdownItem>
                                                    Assign Group
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                        <Form className="d-inline-block form-inline mr-3 d-none ml-lg-auto">
                                            <FormGroup className="mb-0">
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="fas fa-search" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        placeholder="Search"
                                                        type="text"
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Form>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Button
                                            color="primary"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            Add Client
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table
                                    className="align-items-center table-flush"
                                    responsive
                                >
                                    <thead className="thead-light">
                                        <tr>
                                            <th>
                                                <UncontrolledDropdown className="border-0 shadow-none">
                                                    <DropdownToggle
                                                        caret
                                                    ></DropdownToggle>
                                                    <DropdownMenu>
                                                        <DropdownItem>
                                                            Select All
                                                        </DropdownItem>
                                                        <DropdownItem>
                                                            Select Visible
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </th>
                                            {/* <th scope="col">Client ID</th> */}
                                            <th scope="col">Name</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">State</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phone Number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clientsData.map((i) => (
                                            <tr>
                                                <td>
                                                    <CheckBox
                                                        fieldType="checkBox"
                                                        dataType="checkbox"
                                                    />
                                                </td>
                                                {/* <td>{"00" + i + 1}</td> */}
                                                <td>
                                                    {i.firstName +
                                                        " " +
                                                        i.lastName}
                                                </td>
                                                <td>Partnership</td>
                                                <td>{i.state}</td>
                                                <td>{i.email}</td>
                                                <td>{i.cellPhone}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <Row>
                                    <Col xs="12">
                                        <Pagination
                                            aria-label="Page navigation example"
                                            listClassName={
                                                "justify-content-end"
                                            }
                                        >
                                            <PaginationItem>
                                                <PaginationLink
                                                    first
                                                    href="#"
                                                />
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink
                                                    previous
                                                    href="#"
                                                />
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#">
                                                    1
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#">
                                                    2
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#">
                                                    3
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#">
                                                    4
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#">
                                                    5
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink next href="#" />
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink last href="#" />
                                            </PaginationItem>
                                        </Pagination>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

Clients.layout = Admin;

export default Clients;
