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
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Address</th>
                                        <th scope="col">City</th>
                                        <th scope="col">State</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.data.map((property: any) => {
                                        return (
                                            <tr>
                                                <td>{property.address}</td>
                                                <td>{property.city}</td>
                                                <td>{property.state}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    }
                </Col>
            </Row>
        </Container>
    );
}