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
    if (data?.status !== 200) {
        return <div>{data?.data}</div>;
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
                            First Name: {data?.data.firstName}
                        </Col>
                        <Col>
                            Last Name: {data?.data.lastName}
                        </Col>
                        <Col>
                            Email: {data?.data.email}
                        </Col>
                        <Col>
                            Password: {data?.data.password}
                        </Col>
                        <hr />
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}
