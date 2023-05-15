import { useQuery } from "@tanstack/react-query";
import { getTenantsByProperty } from "../../utils/ApiService";
import { Container, Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface TenantTableProps {
    id: number;
}

export default function TenantTable(props: TenantTableProps) {
    const navigate = useNavigate();
    const { status, data } = useQuery({
        queryKey: [props.id],
        queryFn: () => getTenantsByProperty(props.id),
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
        <Container fluid>
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
                            {data?.data.map((tenant: any) => {
                                return (
                                    <tr key={tenant.email} onClick={() => navigate(`/tenant/${tenant.id}`)}>
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
                                    <Button onClick={() => navigate(`/tenant/create`)}>Add a tenant</Button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </Card>
        </Container>
    );
}