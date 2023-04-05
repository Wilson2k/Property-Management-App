import { useQuery } from "@tanstack/react-query";
import { getProperties } from "../../config/ApiService";
import SideNav from "../SideNav";
import { Row, Col, Container } from "react-bootstrap";

export default function PropertyPage() {
    const { status, data } = useQuery({
        queryKey: ['properties'],
        queryFn: getProperties,
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
                <SideNav link={'/properties'} />
                <Col className="px-0">
                    {data?.data.length === 0 ? <div>No properties</div> :
                    data?.data.map((property: any) => {
                        return <li>{property.address}</li>
                    })
                    }
                </Col>
            </Row>
        </Container>
    );
}