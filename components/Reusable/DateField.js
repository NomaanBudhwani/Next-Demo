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
import moment from "moment";

class DateField extends Component {
    isMounted = true;
    static get className() {
        return "DateField";
    }
    state = {
        error: "",
        value: "",
    };
    handleChange = () => {
        const { name, value } = event.target;
        this.setValue(value);
    };
    setError = (error) => {
        this.setState({ error });
    };
    validate = () => {
        const { isRequired } = this.props;
        if (validator.isEmpty(this.state.value) && isRequired) {
            this.setError(Strings.errors.dob);
            return true;
        } else {
            this.setError("");
            return false;
        }
    };
    setValue = (value) => {
        this.setState({ value }, this.validate);
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
            value: "",
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
            setValues,
            values,
        } = this.props;

        const { error, value } = this.state;

        return (
            <Col lg={area}>
                <FormGroup>
                    <Label
                        className="form-control-label"
                        htmlFor={"input-" + id}
                    >
                        {`${label}`}
                        {isRequired ? (
                            <span style={{ color: "red" }}>*</span>
                        ) : (
                            ""
                        )}
                    </Label>
                    <Input
                        onChange={this.handleChange}
                        className="form-control-alternative"
                        id={"input-" + id}
                        name={placeholder}
                        required={isRequired}
                        placeholder={placeholder}
                        type={dataType}
                        value={value}
                        maxLength={max}
                    />
                    <FormFeedback
                        valid={!Boolean(error)}
                        style={{
                            display: Boolean(error) ? "contents" : "none",
                        }}
                    >
                        {error}
                    </FormFeedback>
                    {/* <FormText>{error}</FormText> */}
                </FormGroup>
            </Col>
        );
    }
}
export default DateField;
//cases
// Email
// Name
// SSN
// EIN
