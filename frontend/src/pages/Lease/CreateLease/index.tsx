import SideNav from '../../../components/SideNav';
import { Row, Container } from 'react-bootstrap';
import { useProfile } from '../../../components/Hooks/User/useProfile';
import CreateLeaseForm from './CreateLeaseForm';

export default function CreateTenantPage() {
  const { status } = useProfile();
  if (status === 'loading') {
    return <span>Loading...</span>;
  }
  if (status === 'error') {
    return <span>Unexpected error</span>;
  }
  return (
    <Container fluid style={{ height: '100vh' }}>
      <Row>
        <SideNav link={'/leases'} />
        <CreateLeaseForm />
      </Row>
    </Container>
  );
}
