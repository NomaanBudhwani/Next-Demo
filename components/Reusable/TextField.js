import { useState, Component } from "react";
import {
    FormGroup,
    Input,
    Label,
    Col,
    FormFeedback,
    FormText,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
} from "reactstrap";
import validator from "validator";
import Strings from "utils/Strings";
import utility from "../../utils/utility";

class TextField extends Component {
    isMounted = true;
    static get className() {
        return "TextField";
    }
    state = {
        error: "",
        value: "",
    };
    setError = (err) => {
        this.setState({
            error: err,
        });
    };
    componentWillUnmount() {
        this.isMounted = false;
    }
    validate = () => {
        const { value } = this.state;
        const { inputType, label, isRequired, placeholder } = this.props;
        let err = "";
        if (validator.isEmpty(value) && isRequired) {
            err = Strings.errors.empty.replace(
                "$field",
                placeholder?.toLowerCase()
            );
        } else {
            switch (inputType) {
                case "name":
                    if (!validator.isLength(value, { min: 3, max: 60 })) {
                        err = Strings.errors.errLength.replace("$field", label);
                    } else if (!validator.isAlpha(value)) {
                        err = Strings.errors.onlyAlpha;
                    } else {
                        err = "";
                    }
                    break;
                case "text":
                    err = "";
                    break;
                case "email":
                    if (!validator.isEmail(value)) {
                        err = Strings.errors.email;
                    } else {
                        err = "";
                    }
                    break;
                case "ssn":
                    if (!utility.validSSN(value)) {
                        err = Strings.errors.generic.replace(
                            "$field",
                            placeholder.toLowerCase()
                        );
                    } else {
                        err = "";
                    }
                    break;
                case "ein":
                    if (!utility.validEIN(value)) {
                        err = Strings.errors.generic.replace(
                            "$field",
                            placeholder.toLowerCase()
                        );
                    } else {
                        err = "";
                    }
                    break;
                case "phone":
                    if (!utility.validPhone(value)) {
                        err = Strings.errors.generic.replace(
                            "$field",
                            placeholder.toLowerCase()
                        );
                    } else {
                        err = "";
                    }
                    break;
                case "number":
                    if (!validator.isNumeric(value)) {
                        err = Strings.errors.generic.replace(
                            "$field",
                            placeholder.toLowerCase()
                        );
                    } else {
                        err = "";
                    }
                    break;
                default:
                    err = "";

                    break;
            }
        }
        this.setError(err);
        return Boolean(err);
    };
    setValue = (value) => {
        this.setState(
            {
                value,
            },
            this.validate
        );
    };
    getValue = () => {
        return this.state.value;
    };
    getIdentifier = () => {
        return this.props.id;
    };

    handleChange = (event) => {
        const { inputType, setValues } = this.props;

        const { name, value } = event.target;

        switch (inputType) {
            case "name":
            case "text":
            case "email":
                this.setValue(value);
                break;
            case "ssn":
                this.setValue(utility.formatSSN(value));
                break;
            case "ein":
                this.setValue(utility.formatEIN(value));
                break;
            case "phone":
                this.setValue(utility.formatPhoneNumber(value));
                break;
            case "number":
                this.setValue(utility.formatNumber(value));
                break;
            default:
                this.setValue(value);
                break;
        }
        // this.validate(value);
    };
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
            icon,
            styles,
        } = this.props;
        const { error, value } = this.state;
        return (
            <Col lg={area} style={styles}>
                <FormGroup className="mb-3">
                    {label && (
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
                    )}
                    <InputGroup className="input-group-alternative">
                        {icon && (
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className={icon} />
                                </InputGroupText>
                            </InputGroupAddon>
                        )}
                        <Input
                            onChange={this.handleChange}
                            className="form-control-alternative"
                            id={"input-" + id}
                            name={placeholder}
                            required={isRequired}
                            placeholder={placeholder}
                            type={dataType}
                            invalid={Boolean(error)}
                            value={value}
                            maxLength={max}
                        />
                    </InputGroup>
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
export default TextField;
// id,
// inputType,
// placeholder,
// dataType,
// label,
// area,
// min,
// max,
// isRequired,
// setValues,
// values,
