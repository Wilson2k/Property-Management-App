import { Container, Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { usePropertyTenants } from '../../../../components/Hooks/Property/usePropertyTenants';
import { TenantContext } from '../../../../types/Tenant';

interface TenantTableProps {
  id: number;
}

export default function TenantTable(props: TenantTableProps) {
  const navigate = useNavigate();
  const { status, data } = usePropertyTenants(props.id);
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
    <Container fluid>
      <Card style={{ marginBottom: 16 }}>
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
                    key={tenant.email}
                    onClick={() => {
                      if (tenant.id) {
                        navigate(`/tenant/${tenant.id}`);
                      }
                    }}
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
                  <Button onClick={() => navigate(`/property/${props.id}/add_tenants`)}>
                    Add a tenant
                  </Button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </Container>
  );
}
