import { Component, useState } from "react";
import {
    FormGroup,
    Input,
    Label,
    Col,
    FormFeedback,
    FormText,
} from "reactstrap";
import validator from "validator";
import Strings from "utils/Strings";
import utility from "../../utils/utility";

class CheckBox extends Component {
    isMounted = true;
    static get className() {
        return "CheckBox";
    }
    state = {
        error: "",
        value: false,
    };
    handleChange = () => {
        const { name, checked } = event.target;
        this.setValue(checked);
    };
    setError = (error) => {
        this.setState({ error });
    };
    validate = () => {
        const { label } = this.props;
        return false;
        // if (validator.isEmpty(this.state.value)) {
        //     this.setError(Strings.errors.dob);
        //     return true;
        // } else {
        //     this.setError("");
        //     return false;
        // }
    };
    setValue = (value) => {
        this.setState({ value });
    };
    getValue = () => {
        return this.state.value;
    };
    getIdentifier = () => {
        return this.props.id;
    };
    componentWillUnmount() {
        this.isMounted = false;
    }
    reset = () => {
        this.setState({
            error: "",
            value: false,
        });
    };
    render() {
        const {
            id,
            inputType,
            placeholder,
            dataType,
            label,
            area,
            min,
            max,
            isRequired,
            defaultValue,
            setValues,
            values,
        } = this.props;
        const { error, value } = this.state;
        return (
            <Col lg={area}>
                <FormGroup check>
                    <Label
                        check
                        className="form-control-label"
                        htmlFor={"input-" + id}
                    >
                        <Input
                            className="form-control-alternative"
                            defaultValue={defaultValue}
                            id={"input-" + id}
                            placeholder={placeholder}
                            type={dataType}
                            onChange={this.handleChange}
                            checked={value}
                        />
                        {`${label}`}
                        {/* {isRequired ? (
                            <span style={{ color: "red" }}>*</span>
                        ) : (
                            ""
                        )} */}
                    </Label>
                </FormGroup>
            </Col>
        );
    }
}
export default CheckBox;
