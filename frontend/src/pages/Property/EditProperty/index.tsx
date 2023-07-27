import { useProperty } from '../../../components/Hooks/Property/useProperty';
import * as PropertyTypes from '../../../types/Property';
import UpdatePropertyForm from './updateForm';

export default function EditPropertyPage() {
  const { status, data } = useProperty();
  if (status === 'loading') {
    return <span>Loading...</span>;
  }
  if (status === 'error' || !data) {
    return <span>Unexpected error</span>;
  }
  if (typeof data?.data === 'string') {
    return <div>{data?.data}</div>;
  }
  if (!data.data.id) {
    return <span>Unexpected error</span>;
  }
  const defaultUpdateProperty: PropertyTypes.PropertyUpdateInput = {
    address: data?.data.address,
    city: data?.data.city,
    state: data?.data.state,
    type: data?.data.type,
    size: data?.data.size,
  };
  return <UpdatePropertyForm id={data?.data.id} oldData={defaultUpdateProperty} />;
}
