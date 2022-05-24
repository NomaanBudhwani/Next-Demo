import { Component, useState } from "react";
import { FormGroup, Label, Col, Input, FormFeedback } from "reactstrap";
import validator from "validator";
import Strings from "utils/Strings";
import utility from "../../utils/utility";
import _ from "lodash";

class RadioButton extends Component {
    isMounted = true;
    static get className() {
        return "RadioButton";
    }
    state = {
        error: "",
        selected: "", //this.props.dataType && this.props.dataType[0]?.name,
    };
    handleChange = (event, id) => {
        this.props.onChange(id);
        this.setValue(id);
    };
    setError = (error) => {
        this.setState({ error });
    };
    validate = () => {
        const { label } = this.props;
        if (validator.isEmpty(this.state.selected) && isRequired) {
            this.setError(Strings.errors.radio);
            return true;
        } else {
            this.setError("");
            return false;
        }
    };
    setValue = (value) => {
        this.setState(
            {
                selected: value,
            },
            this.validate
        );
    };
    getValue = () => {
        return this.state.selected;
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
            selected: "",
        });
    };
    render() {
        const { id, dataType, label, isRequired } = this.props;
        const { error, selected } = this.state;
        return (
            <Col lg="4">
                <FormGroup tag="fieldset">
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
                    {dataType?.map((item) => (
                        <FormGroup check key={item._id}>
                            <Label check>
                                <Input
                                    invalid={Boolean(error)}
                                    type="radio"
                                    name={item.name}
                                    //onClick={(e) => handleChange(e, item._id)}
                                    // value={getValue(item._id)}
                                    onChange={(e) =>
                                        this.handleChange(e, item._id)
                                    }
                                    checked={selected == item._id}
                                />
                                {item.name}
                            </Label>
                        </FormGroup>
                    ))}
                    <FormFeedback
                        valid={!Boolean(error)}
                        style={{
                            display: Boolean(error) ? "contents" : "none",
                        }}
                    >
                        {error}
                    </FormFeedback>
                </FormGroup>
            </Col>
        );
    }
}
export default RadioButton;
