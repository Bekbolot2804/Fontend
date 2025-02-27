import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Routes";
import { Button, Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./Main.css"

const MainPage: FC = () => {
  return (
    <Container fluid className="cont d-flex justify-content-center align-items-center">
      <Row>
        <Col xs={0} md = {1}></Col>
        <Col xs={12} md = {10} className = "align-items-center justify-content-center text-center">
          <h1 className="mainTitle">Справочник по медицине катастроф и первой помощи</h1>
          <p className="mainText">Добро пожаловать! С помощью данного сервиса вы можете ознакомиться как нужно поступать при определенных поражениях.</p>
          <Link to={ROUTES.HELPS}>
            <Button className="customButton" variant="dark">Виды первой помощи</Button>
          </Link>
        </Col>
        <Col xs={0} md = {1}></Col>
      </Row>
    </Container>
  );
};

export default MainPage;