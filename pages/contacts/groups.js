import React from "react";

// reactstrap components
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
// layout for this page
import Admin from "layouts/Admin.js";
import Checkbox from "components/Reusable/CheckBox";
// core components
import GenricHeader from "components/Headers/GenricHeader.js";

function Groups() {
    return (
        <>
            <GenricHeader title="Groups" />
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
                                            Add Group
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
                                            <th scope="col">Group ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Group Members</th>
                                            <th scope="col">Office</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[...Array(10).keys()].map((i) => (
                                            <tr>
                                                <td>{"00" + i + 1}</td>
                                                <td>1030 Trading LLC</td>
                                                <td>5</td>
                                                <td>Dallas</td>
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

Groups.layout = Admin;

export default Groups;
