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
import { Button, Container } from "reactstrap";

class PageHeader extends React.Component {
  scrollToMain = () => {
    document
      .getElementById("main-section")
      .scrollIntoView({ behavior: "smooth" });
  };
  render() {
    return (
      <div className="page-header header-filter">
        <div className="squares square1" />
        <div className="squares square2" />
        <div className="squares square3" />
        <div className="squares square4" />
        <div className="squares square5" />
        <div className="squares square6" />
        <div className="squares square7" />
        <Container>
          <div className="content-center brand">
            <h1 className="h1-seo">Scientia Ltd's App</h1>
            <h3 className="d-none d-sm-block">
              Scientia Technical Test - Junior Web Developer <br/><br/>
                by Peter Leonard
            </h3>
              <br/>
            <Button
                className="btn-icon btn-round"
                color="info"
                type="button"
                size="lg"
                onClick={this.scrollToMain}
              >
                <i className="fa fa-arrow-down tim-icons-lg" />
              </Button>
          </div>
        </Container>
      </div>
    );
  }
}

export default PageHeader;
