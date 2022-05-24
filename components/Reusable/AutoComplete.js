import React, { Component, Fragment, useState } from "react";
import { Col, FormGroup, Label, FormFeedback } from "reactstrap";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead";
import _ from "lodash";
import Strings from "utils/Strings";
import validator from "validator";

class AutoComplete extends Component {
    isMounted = true;
    static get className() {
        return "AutoComplete";
    }
    state = {
        singleSelections: [],
        value: "",
        error: "",
    };
    handleSelection = (value) => {
        this.setValue(value);
    };
    setError = (error) => {
        this.setState({ error });
    };
    validate = () => {
        const { label, isRequired } = this.props;
        if (validator.isEmpty(this.state.value) && isRequired) {
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
                singleSelections: value,
                value: value.length ? value[0]._id : "",
            },
            this.validate
        );
    };
    getValue = () => {
        return this.state.value;
    };
    getCurrentValue = (selected) => {
        return (
            this.props.dataType?.find((item) => selected == item._id)?.name ??
            "Select Option"
        );
    };
    getIdentifier = () => {
        return this.props.id;
    };
    componentWillUnmount() {
        this.isMounted = false;
    }
    reset = () => {
        this.setState({
            singleSelections: [],
            value: "",
            error: "",
        });
    };
    render() {
        const {
            id,
            inputType,
            placeholder,
            dataType = [],
            label,
            area,
            min,
            max,
            isRequired,
            defaultValue,
            setValues,
            values,
        } = this.props;
        const { singleSelections, error } = this.state;
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
                    <Typeahead
                        id="basic-typeahead-single"
                        labelKey="name"
                        onChange={this.handleSelection}
                        options={dataType}
                        placeholder={"Select " + label}
                        selected={singleSelections}
                    />
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

export default AutoComplete;
