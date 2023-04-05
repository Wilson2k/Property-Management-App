import SideNav from "../SideNav";
import { Row, Col, Container } from "react-bootstrap";

export default function DashBoardPage() {
    return (
        <Container fluid style={{ height: '100vh' }}>
            <Row>
                <SideNav link={'/'} />
                <Col className="px-0">
                    <div>DASH</div>
                </Col>
            </Row>
        </Container>
    );
}
