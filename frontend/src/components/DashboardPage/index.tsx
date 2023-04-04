import Profile from "./Profile";
import DashNav from "./DashNav";
import { Row, Col, Container } from "react-bootstrap";

export default function DashBoardPage() {
    return (
        <Container fluid style={{height: '100vh'}}>
            <Row>
                <Col sm={3}>
                    <DashNav link="s" />
                </Col>
                <Col sm={8}>
                    <Profile />
                </Col>
            </Row>
        </Container>
    );
}
