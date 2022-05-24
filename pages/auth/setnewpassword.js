import React, { useRef, useState } from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
    FormFeedback,
} from "reactstrap";
import Auth from "layouts/Auth.js";
import { BaseComponent, TextField } from "components/Reusable";
import HttpServiceManager from "services/HttpServiceManager";
import constant from "../../constants";
import { pushRoute } from "utils/auth";

function SetNewPassword() {
    const baseRef = useRef(null);
    const [error, setError] = useState("");

    const handleSubmit = () => {
        let data = baseRef.current?.onSubmitForm();
        console.log(baseRef.current?.getReferences());
        console.log({ data });
        if (data) {
            callSetNewPasswordAPI(data);
        }
    };
    const callSetNewPasswordAPI = (data) => {
        HttpServiceManager.getInstance()
            .request(constant.updatePassword, data, "POST")
            .then((res) => {
                // setClientsData(res.data);
                pushRoute("/admin/dashboard");
                console.log(res);
            })
            .catch((err) => {
                setError(err.message);
                console.log(err);
            });
    };
    return (
        <>
            <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                            <small>Set New Password</small>
                        </div>
                        <FormFeedback
                            valid={!Boolean(error)}
                            style={{
                                display: Boolean(error) ? "contents" : "none",
                            }}
                        >
                            {error}
                        </FormFeedback>
                        <BaseComponent ref={baseRef}>
                            <TextField
                                id="oldPassword"
                                placeholder="Old Password"
                                fieldType="input"
                                dataType="password"
                                inputType="password"
                                isRequired={true}
                                area={0}
                                icon={"ni ni-lock-circle-open"}
                                styles={{ paddingLeft: 0, paddingRight: 0 }}
                            />
                            <TextField
                                id="newPassword"
                                placeholder="New Password"
                                fieldType="input"
                                dataType="password"
                                inputType="password"
                                isRequired={true}
                                area={0}
                                icon={"ni ni-lock-circle-open"}
                                styles={{ paddingLeft: 0, paddingRight: 0 }}
                            />
                            <TextField
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                fieldType="input"
                                dataType="password"
                                inputType="password"
                                isRequired={true}
                                area={0}
                                icon={"ni ni-lock-circle-open"}
                                styles={{ paddingLeft: 0, paddingRight: 0 }}
                            />
                            <div className="text-center">
                                <Button
                                    className="my-4"
                                    color="primary"
                                    type="button"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            </div>
                        </BaseComponent>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
}

SetNewPassword.layout = Auth;

export default SetNewPassword;
