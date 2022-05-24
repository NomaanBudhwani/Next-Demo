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
    CardFooter,
    Table,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GenricHeader from "components/Headers/GenricHeader.js";

function AddGroup() {
    return (
        <>
            <GenricHeader title="Add Group" />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-1">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Detials</h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Button
                                            color="primary"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            Save
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    {/* <h6 className="heading-small text-muted mb-4">
                                        User information
                                    </h6> */}
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-username"
                                                    >
                                                        Group Name
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        defaultValue="lucky.jesse"
                                                        id="input-username"
                                                        placeholder="Username"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-first-name"
                                                    >
                                                        Assign Clients
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        defaultValue="Lucky"
                                                        id="input-first-name"
                                                        placeholder="First name"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-last-name"
                                                    >
                                                        EIN Number
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        defaultValue="Jesse"
                                                        id="input-last-name"
                                                        placeholder="Last name"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                </Form>
                                <Table
                                    className="align-items-center table-flush"
                                    responsive
                                >
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Client ID</th>
                                            <th scope="col">Client</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Relationship</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[...Array(5).keys()].map((i) => (
                                            <tr>
                                                <td>{"00" + i + 1}</td>
                                                <td>1030 Trading LLC</td>
                                                <td>Partnership</td>
                                                <td>
                                                    <UncontrolledDropdown>
                                                        <DropdownToggle caret>
                                                            Select
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem>
                                                                Business
                                                            </DropdownItem>
                                                            <DropdownItem>
                                                                Family
                                                            </DropdownItem>
                                                            <DropdownItem>
                                                                Spouse
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                            <CardFooter>
                                <Row className="align-items-center">
                                    <Col className="text-center" xs="12">
                                        <Button
                                            color="primary"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            Save
                                        </Button>
                                    </Col>
                                </Row>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

AddGroup.layout = Admin;

export default AddGroup;
