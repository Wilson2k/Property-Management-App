import { Container } from 'react-bootstrap';
import { usePropertyLeases } from '../../../../components/Hooks/Property/usePropertyLeases';

interface IncomeChartProps {
  id: number;
}

export default function IncomeChart(props: IncomeChartProps) {
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
  // Format lease data so that chart will display data
  // Testing echarts apache vs chartjs
  const chartData = [{ id: 'Name', value: 200 }];
  console.log(chartData);
  return (
    <Container fluid>
      <div>Pie Chart with tenant names/share of total monthly income</div>
    </Container>
  );
}
