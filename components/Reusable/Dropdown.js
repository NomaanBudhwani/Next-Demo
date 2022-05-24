import { Component, useEffect, useState } from "react";
import {
    FormGroup,
    Label,
    Col,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    FormFeedback,
} from "reactstrap";
import validator from "validator";
import Strings from "utils/Strings";
import utility from "../../utils/utility";

class Dropdown extends Component {
    isMounted = true;
    static get className() {
        return "Dropdown";
    }
    state = {
        error: "",
        selected: "",
    };

    handleChange = (event, id) => {
        this.setValue(id);
    };
    setError = (error) => {
        this.setState({ error });
    };
    validate = () => {
        const { label, isRequired } = this.props;
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
            error: "",
            selected: "",
        });
    };
    render() {
        const { id, dataType, label, isRequired } = this.props;
        const { selected, error } = this.state;
        return (
            <Col lg="3">
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
                    <UncontrolledDropdown
                        style={{ display: "block", width: "100%" }}
                        setActiveFromChild
                    >
                        <DropdownToggle
                            style={{
                                textAlign: "start",
                                width: "100%",
                                overflow: "hidden",
                                paddingLeft: "10px",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                            caret
                        >
                            {this.getCurrentValue(selected)}
                        </DropdownToggle>
                        <DropdownMenu style={{ width: "100%" }}>
                            {dataType?.map((item) => (
                                <DropdownItem
                                    onClick={(e) =>
                                        this.handleChange(e, item._id)
                                    }
                                    active={selected == item._id}
                                    key={item._id}
                                    style={{ maxWidth: "100%" }}
                                >
                                    {item.name}
                                </DropdownItem>
                            )) ?? <div />}
                        </DropdownMenu>
                    </UncontrolledDropdown>
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
export default Dropdown;
