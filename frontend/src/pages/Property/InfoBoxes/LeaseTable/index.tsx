import { Container, Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { usePropertyLeases } from '../../../../components/Hooks/Property/usePropertyLeases';
import { LeaseContext } from '../../../../types/Lease';

interface LeaseTableProps {
  id: number;
}

export default function LeaseTable(props: LeaseTableProps) {
  const navigate = useNavigate();
  const { status, data } = usePropertyLeases(props.id);
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
                <th scope="col">Tenant Name</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Monthly Rent</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((lease: LeaseContext) => {
                const startDate = new Date(lease.startDate).toLocaleDateString();
                const endDate = new Date(lease.endDate).toLocaleDateString();
                return (
                  <tr key={lease.id} onClick={() => navigate(`/lease/${lease.id}`)}>
                    <td>
                      {lease.tenant?.firstName} {lease.tenant?.lastName}
                    </td>
                    <td>{startDate}</td>
                    <td>{endDate}</td>
                    <td>{lease.monthlyRent}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={5}>
                  <Button onClick={() => navigate(`/lease/create`)}>
                    Create a lease
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
