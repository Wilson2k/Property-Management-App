import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../utils/ApiService";
import SideNav from "../../../components/SideNav";
import { Row, Col, Container } from "react-bootstrap";

export default function ProfilePage() {
    const { status, data } = useQuery({
        queryKey: ['profile'],
        queryFn: getUser,
    });
    if (status === 'loading') {
        return <span>Loading...</span>;
    }
    if (status === 'error') {
        return <span>Unexpected error</span>;
    }
    return (
        <Container fluid style={{ height: '100vh' }}>
            <Row>
                <SideNav link={'/profile'} />
                <Col className="px-0"  style={{background: '#ebecf0'}}>
                    <Container fluid>
                        <Col>
                            <h2>Profile </h2>
                        </Col>
                        <hr />
                        <Col>
                            <p>First Name: {data?.data.firstName}</p>
                        </Col>
                        <Col>
                            <p>Last Name: {data?.data.lastName}</p>
                        </Col>
                        <Col>
                            <p>Email: {data?.data.email}</p>
                        </Col>
                        <Col>
                            <p>Password: ••••••••</p>
                        </Col>
                        <hr />
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}
