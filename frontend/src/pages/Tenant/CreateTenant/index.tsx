import * as TenantTypes from '../../../types/Tenant';
import CreateTenantForm from './createForm';
import SideNav from '../../../components/SideNav';
import { Row, Container } from 'react-bootstrap';
import { useProfile } from '../../../components/Hooks/User/useProfile';

export default function CreateTenantPage() {
  const { status, data } = useProfile();
  if (status === 'loading') {
    return <span>Loading...</span>;
  }
  if (status === 'error') {
    return <span>Unexpected error</span>;
  }
  if (typeof data?.data === 'string') {
    return <div>{data?.data}</div>;
  }
  const defaultCreateTenant: TenantTypes.TenantCreateContext = {
    userId: data?.data.id,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };
  return (
    <Container fluid style={{ height: '100vh' }}>
      <Row>
        <SideNav link={'/tenants'} />
        <CreateTenantForm data={defaultCreateTenant} />
      </Row>
    </Container>
  );
}
