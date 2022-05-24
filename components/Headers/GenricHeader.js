import React from "react";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

function GenricHeader({ title }) {
    return (
        <>
            <div
                className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                // style={{
                //     minHeight: "600px",
                //     backgroundImage:
                //         "url(" + "assets/img/theme/profile-cover.jpg" + ")",
                //     backgroundSize: "cover",
                //     backgroundPosition: "center top",
                // }}
            >
                {/* Mask */}
                <span className="mask bg-gradient-default opacity-8" />
                {/* Header container */}
                <Container className="d-flex align-items-center" fluid>
                    <Row>
                        <Col>
                            <h2 className="display-2 text-white">{title}</h2>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default GenricHeader;
