import { Row, Col, Container, Card } from "react-bootstrap";
import { NavDropdown, Button } from "react-bootstrap";
import PageFilter from "../../../components/PageFilter";
import SideNav from "../../../components/SideNav";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from 'react';
import { useTenantsNotOnProperty } from "../../../components/Hooks/Tenants/useTenantsByNotProperty";
import { addPropertyMultTenants } from "../../../utils/ApiService";
import { TenantContext } from "../../../types/Tenant";

export default function PropertyAddTenantPage() {
    const navigate = useNavigate();
    const { id } = useParams() as { id: string; };
    const propertyId = +id;
    const [tenantIds, setTenantIds] = useState<number[]>([]);
    const { status, data } = useTenantsNotOnProperty(propertyId);
    if (status === 'loading') {
        return <span>Loading...</span>;
    }
    if (status === 'error') {
        return <span>Unexpected error</span>;
    }

    const handleCheck = (event: React.SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        let tenantArr: number[] = [...tenantIds];
        if (target.checked) {
            tenantArr = [...tenantArr, +target.value];
        } else {
            tenantArr.splice(tenantIds.indexOf(+target.value), 1);
        }
        setTenantIds(tenantArr);
    };

    const FormSubmit = async () => {
        const response = await addPropertyMultTenants(propertyId, { tenantIds: tenantIds });
        console.log(response);
        if (response?.status === 200) {
            navigate(`/property/${propertyId}`);
        }
    };

    return (
        <Container fluid style={{ height: '100vh' }}>
            <Row>
                <SideNav link={'/tenants'} />
                <Col className="px-0" style={{ background: '#ebecf0' }}>
                    <Container fluid>
                        <PageFilter title="Tenants">
                            <NavDropdown menuVariant="dark" title="Sort By" id="navbarScrollingDropdown" style={{ fontWeight: 'bold' }}>
                                <NavDropdown.Item href="#action1">First Name</NavDropdown.Item>
                                <NavDropdown.Item href="#action2">Last Name</NavDropdown.Item>
                                <NavDropdown.Item href="#action3">Email</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Phone</NavDropdown.Item>
                            </NavDropdown>
                        </PageFilter>
                        <hr style={{ border: '1px solid black' }} />
                        <Card>
                            <div className="table-responsive" style={{ maxHeight: '90vh' }}>
                                <table className="table table-striped table-hover my-0">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">First Name</th>
                                            <th scope="col">Last Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phone</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.data.map((tenant: TenantContext) => {
                                            return (
                                                <tr key={tenant.id}>
                                                    <td><input type="checkbox" value={tenant.id} onClick={handleCheck} /></td>
                                                    <td>{tenant.firstName}</td>
                                                    <td>{tenant.lastName}</td>
                                                    <td>{tenant.email}</td>
                                                    <td>{tenant.phone}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={5}>
                                                {tenantIds.length === 0 ?
                                                    <Button onClick={() => navigate(`/tenant/create`)}>
                                                        Create a new tenant
                                                    </Button> :
                                                    <Button onClick={FormSubmit}>
                                                        Add Selected Tenants
                                                    </Button>
                                                }
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </Card>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}