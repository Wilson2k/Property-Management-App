import Profile from "./Profile";
import DashNav from "./DashNav";
import { Row, Col, Container } from "react-bootstrap";

export default function DashBoardPage() {
    return (
        <Container fluid style={{ height: '100vh' }}>
            <Row>
                <DashNav link={'/'} />
                <Col className="px-0">
                    <Profile />
                </Col>
            </Row>
        </Container>
    );
}
