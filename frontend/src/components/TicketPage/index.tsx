import SideNav from "../SideNav";
import { Row, Col, Container } from "react-bootstrap";

export default function TicketPage() {
    return (
        <Container fluid style={{ height: '100vh' }}>
            <Row>
                <SideNav link={'/tickets'} />
                <Col className="px-0"  style={{background: '#ebecf0'}}>
                    <div>Ticket</div>
                </Col>
            </Row>
        </Container>
    );
}
