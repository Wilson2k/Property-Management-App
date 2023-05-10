import { useQuery } from "@tanstack/react-query";
import { getProperty } from "../../../utils/ApiService";
import SideNav from "../../../components/SideNav";
import { Row, Col, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";


export default function PropertyInfoPage() {
    const { id } = useParams() as { id: string };
    const propertyId = +id
    const { status, data } = useQuery({
        queryKey: ['property', propertyId],
        queryFn: () => getProperty(propertyId),
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
                <SideNav link={'/properties'} />
                <Col className="px-0" style={{ background: '#ebecf0' }}>
                    <Container fluid>
                        <Col>
                            <h2>Property </h2>
                        </Col>
                        <hr />
                        <Col>
                            Address: {data?.data.address}
                        </Col>
                        <Col>
                            City: {data?.data.city}
                        </Col>
                        <Col>
                            State: {data?.data.state}
                        </Col>
                        <Col>
                            Tenants: {data?.data.tenants ?  data?.data.tenants : 'No Tenants'}
                        </Col>
                        <hr />
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}