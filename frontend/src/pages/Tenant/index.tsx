import { Row, Col, Container, Card } from 'react-bootstrap';
import { NavDropdown, Button } from 'react-bootstrap';
import PageFilter from '../../components/PageFilter';
import SideNav from '../../components/SideNav';
import { useNavigate } from 'react-router-dom';
import { useTenants } from '../../components/Hooks/Tenants/useTenants';
import { TenantContext } from '../../types/Tenant';

export default function TenantPage() {
  const navigate = useNavigate();
  const { status, data } = useTenants();
  if (status === 'loading') {
    return <span>Loading...</span>;
  }
  if (status === 'error') {
    return <span>Unexpected error</span>;
  }
  if (typeof data?.data === 'string') {
    return <div>{data?.data}</div>;
  }
  return (
    <Container fluid style={{ height: '100vh' }}>
      <Row>
        <SideNav link={'/tenants'} />
        <Col className="px-0" style={{ background: '#ebecf0' }}>
          <Container fluid>
            <PageFilter title="Tenants">
              <NavDropdown
                menuVariant="dark"
                title="Sort By"
                id="navbarScrollingDropdown"
                style={{ fontWeight: 'bold' }}
              >
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
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data.map((tenant: TenantContext) => {
                      return (
                        <tr
                          key={tenant.id}
                          onClick={() => navigate(`/tenant/${tenant.id}`)}
                        >
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
                        <Button onClick={() => navigate(`/tenant/create`)}>
                          Create new tenant
                        </Button>
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
