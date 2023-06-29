import { Container, Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { usePropertyLeases } from "../../../../components/Hooks/Property/usePropertyLeases";
import { LeaseContext } from "../../../../types/Lease";

interface LeaseTableProps {
    id: number;
}

export default function LeaseTable(props: LeaseTableProps) {
    const navigate = useNavigate();
    const propertyLeaseData = usePropertyLeases(props.id);
    if (propertyLeaseData.status === 'loading') {
        return <span>Loading...</span>;
    }
    if (propertyLeaseData.status === 'error') {
        return <span>Unexpected error</span>;
    }
    if (propertyLeaseData.data?.status !== 200) {
        return <div>{propertyLeaseData.data?.data}</div>;
    }
    
    return (
        <Container fluid>
            <Card style={{marginBottom: 16}}>
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
                            {propertyLeaseData.data.data.map((lease: LeaseContext) => {
                                return (
                                    <tr key={lease.id} onClick={() => navigate(`/lease/${lease.id}`)}>
                                        <td>{lease.tenantId}</td>
                                        <td>{lease.startDate?.toDateString()}</td>
                                        <td>{lease.endDate?.toDateString()}</td>
                                        <td>{lease.monthlyRent}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={5}>
                                    <Button onClick={() => navigate(`/property/${props.id}/add_tenants`)}>Create a lease</Button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </Card>
        </Container>
    );
}