import * as React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { WmkLink } from "wmk-link";

export const Masthead = ({
  logo = {
    component: <h1>Pass a Logo Component</h1>,
    to: "/",
    order: 1,
    style: undefined
  }
}: {
  logo: { style: React.CSSProperties };
}) => {
  return (
    <Container>
      <Row>
        <Col className="logo">
          <WmkLink to={logo.to} style={{ order: logo.order, ...style }}>
            {logo.component}
          </WmkLink>
        </Col>
      </Row>
    </Container>
  );
};
