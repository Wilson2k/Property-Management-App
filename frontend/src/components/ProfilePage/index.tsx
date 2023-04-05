import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../config/ApiService";
import SideNav from "../SideNav";
import { Row, Col, Container } from "react-bootstrap";

export default function ProfilePage() {
    const { status, data } = useQuery({
        queryKey: ['profile'],
        queryFn: getUser,
    })
    if (status === 'loading') {
        return <span>Loading...</span>
    }
    if (status === 'error') {
        return <span>Unexpected error</span>
    }
    if (data?.status !== 200) {
        return <div>{data?.data}</div>
    }
    
    return (
        <Container fluid style={{ height: '100vh' }}>
            <Row>
                <SideNav link={'/profile'} />
                <Col className="px-0">
                    <li>{data?.data.id}</li>
                    <li>{data?.data.firstName}</li>
                    <li>{data?.data.lastName}</li>
                    <li>{data?.data.email}</li>
                </Col>
            </Row>
        </Container>
    );
}
