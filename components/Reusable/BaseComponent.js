import _ from "lodash";
import React, { Component } from "react";

export default class BaseComponent extends Component {
    // =========================================================================
    // ATTRIBUTES
    // =========================================================================
    childReferences = [];
    // =========================================================================
    // CONSTRUCTOR
    // =========================================================================
    constructor(props) {
        super(props);
    }
    // =========================================================================
    // FUNCTIONS VALIDATING & RECURSION
    // =========================================================================
    clearForm = () => {
        this.childReferences.forEach((item) => {
            item.reset();
        });
    };
    onSubmitForm = (isFormdata = false) => {
        const formData = new FormData();
        let data = {};
        for (let item of this.childReferences) {
            if (item.validate()) {
                return false;
            } else {
                if (isFormdata) {
                    formData.append(item.getIdentifier(), item.getValue());
                } else {
                    data[item.getIdentifier()] = item.getValue();
                }
            }
        }
        if (isFormdata) {
            return formData;
        } else {
            return data;
        }
    };
    refCollector = (ref) => {
        if (ref) {
            if (ref == null) {
                this.childReferences.splice(0, 1);
            } else {
                let index = this.childReferences.findIndex(
                    (field) => field.getIdentifier() == ref.getIdentifier()
                );
                if (index != -1) {
                    this.childReferences[index] = ref;
                } else {
                    this.childReferences.push(ref);
                }
            }
        }
        this.checkComponent();
    };
    checkComponent = () => {
        let newRef = [];
        for (let ref of this.childReferences) {
            if (ref.isMounted) {
                newRef.push(ref);
            }
        }
        this.childReferences = newRef;
    };
    saveRef = (child, index) => {
        return React.cloneElement(child, {
            // key: `${child.props.type}_${Date.now()}`,
            ref: this.refCollector,
            // onSubmitEditing: this.onSubmitEditing(
            //     index,
            //     `${child.props.type}_${Date.now()}`
            // ),
        });
    };
    checkHierarchy = (children, index) => {
        return React.Children.map(children, (child, index) => {
            return this.checkMaterialTextField(child, index);
        });
    };
    checkMaterialTextField = (children, index) => {
        if (typeof children == "string") {
            console.log("typeof", typeof children == "string");
            return children;
        } else if (_.isEmpty(children)) {
            return children;
        } else if (
            children.type.className === "TextField" ||
            children.type.className === "RadioButton" ||
            children.type.className === "Dropdown" ||
            children.type.className === "DateField" ||
            children.type.className === "CheckBox" ||
            children.type.className === "AutoComplete"
        ) {
            return this.saveRef(children, index);
        } else {
            if (Array.isArray(children.props.children)) {
                var childProps = {};
                childProps.children = this.checkHierarchy(
                    children.props.children,
                    index
                );
                return React.cloneElement(children, childProps);
            } else if (typeof children.props.children == "string") {
                return children;
            } else if (typeof children.props.children == "object") {
                var childProps = {};
                childProps.children = this.checkMaterialTextField(
                    children.props.children,
                    index
                );
                return React.cloneElement(children, childProps);
            } else {
                return children;
            }
        }
    };
    // =========================================================================
    // RENDER
    // =========================================================================
    render() {
        // this.childReferences = [];
        if (!this.props.children) return this.props.children;
        return React.Children.map(this.props.children, (child, index) => {
            if (!child) {
                return child;
            }
            if (Array.isArray(child.props.children)) {
                var childProps = {};
                childProps.children = this.checkHierarchy(
                    child.props.children,
                    index
                );
                return React.cloneElement(child, childProps);
            } else {
                return this.checkMaterialTextField(child, index);
            }
        });
    }
    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================
    clearReferences() {
        this.childReferences = [];
    }
    getReferences() {
        return this.childReferences;
    }
}
