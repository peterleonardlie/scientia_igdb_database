/*!

=========================================================
* BLK Design System React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// reactstrap components
import {
    Button,
    Container,
    Row,
    Col,
    UncontrolledTooltip
} from "reactstrap";

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <Container>
                    <Row>
                        <Col md="3" className="justify-content-center">
                        </Col>
                        <Col md="6" className="mt-5">
                            Scientia Ltd's App - Junior Web Developer<br/>
                            This Web App is created solely for Scientia's Technical Test.<br/>
                            Created by Peter Leonard. All rights reserved.
                            <br/><br/>
                            Data provided by IGDB API. <br/>
                            Themes built on top of BLK Theme by Creative Tim.
                        </Col>
                        <Col md="3" className="mt-5">
                            <div className="btn-wrapper profile">
                                <Button
                                    className="btn-icon btn-neutral btn-round btn-simple"
                                    color="default"
                                    href="https://twitter.com/creativetim"
                                    id="tooltip622135962"
                                    target="_blank"
                                    >
                                    <i className="fab fa-github" />
                                </Button>
                                <UncontrolledTooltip delay={0} target="tooltip622135962">
                                    Follow me
                                </UncontrolledTooltip>
                                <Button
                                    className="btn-icon btn-neutral btn-round btn-simple"
                                    color="default"
                                    href="https://www.facebook.com/creativetim"
                                    id="tooltip230450801"
                                    target="_blank"
                                    >
                                    <i className="fab fa-linkedin" />
                                </Button>
                                <UncontrolledTooltip delay={0} target="tooltip230450801">
                                    Connect with me
                                </UncontrolledTooltip>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        );
    }
}

export default Footer;
