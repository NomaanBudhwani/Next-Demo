import React, { useRef } from "react";
import { Button, Card, CardBody, Row, Col, FormFeedback } from "reactstrap";
import Auth from "layouts/Auth.js";
import { BaseComponent, TextField } from "components/Reusable";
import HttpServiceManager from "services/HttpServiceManager";
import constant from "../constants";
import { handleLogin } from "utils/auth";
//Redux
import { connect } from "react-redux";
import { request } from "redux/actions/ServiceAction";
import { LOGIN, APP_STATE } from "redux/actions/ActionTypes";

function Login({ request, loginReducer }) {
    const baseRef = useRef(null);

    const handleSubmit = () => {
        let data = baseRef.current?.onSubmitForm();
        console.log(baseRef.current?.getReferences());
        console.log({ data });
        if (data) {
            requestLogin(data);
        }
    };
    const requestLogin = (data) => {
        request(
            LOGIN,
            constant.login,
            "post",
            data,
            true,
            (res) => {
                HttpServiceManager.getInstance().userToken = res.data.token;
                if (res.data.user.isFirstLogin) {
                    handleLogin(res.data.token, "/auth/setnewpassword");
                } else {
                    handleLogin(res.data.token, "/dashboard");
                }
                console.log(res);
            },
            (err) => {
                console.log(err);
            }
        );
    };
    return (
        <>
            <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                            <small>Sign in with credentials</small>
                        </div>
                        <FormFeedback
                            valid={!Boolean(loginReducer.errorMessage)}
                            style={{
                                display: Boolean(loginReducer.errorMessage)
                                    ? "contents"
                                    : "none",
                            }}
                        >
                            {loginReducer.errorMessage}
                        </FormFeedback>
                        <BaseComponent ref={baseRef}>
                            <TextField
                                id="email"
                                placeholder="E-mail address"
                                fieldType="input"
                                dataType="email"
                                inputType="email"
                                isRequired={true}
                                area={0}
                                icon={"ni ni-email-83"}
                                styles={{ paddingLeft: 0, paddingRight: 0 }}
                            />
                            <TextField
                                id="password"
                                placeholder="Password"
                                fieldType="input"
                                dataType="password"
                                inputType="password"
                                isRequired={true}
                                area={0}
                                icon={"ni ni-lock-circle-open"}
                                styles={{ paddingLeft: 0, paddingRight: 0 }}
                            />
                            <div className="custom-control custom-control-alternative custom-checkbox">
                                <input
                                    className="custom-control-input"
                                    id=" customCheckLogin"
                                    type="checkbox"
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor=" customCheckLogin"
                                >
                                    <span className="text-muted">
                                        Remember me
                                    </span>
                                </label>
                            </div>
                            <div className="text-center">
                                <Button
                                    className="my-4"
                                    color="primary"
                                    type="button"
                                    onClick={handleSubmit}
                                >
                                    Sign in
                                </Button>
                            </div>
                        </BaseComponent>
                    </CardBody>
                </Card>
                <Row className="mt-3">
                    <Col xs="6">
                        <a
                            className="text-light"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                            <small>Forgot password?</small>
                        </a>
                    </Col>
                </Row>
            </Col>
        </>
    );
}

Login.layout = Auth;

const actions = {
    request,
};
const mapStateToProps = (state) => ({
    loginReducer: state.loginReducer,
    appState: state.appState,
});

export default connect(mapStateToProps, actions)(Login);
