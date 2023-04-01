import Container from 'react-bootstrap/Container';
import Contact from './Contact';

export default function Home() {
  return (
    <Container fluid style={{ padding: 0 }}>
      <div style={{ height: "90vh", background: "#19376D" }}>
        <Container style={{ paddingBlock: "10%" }}>
          <h1 style={{ color: "white", fontFamily: "Lato", fontSize: 60 }}>
            Property Management
          </h1>
          <h1 style={{ color: "white", fontFamily: "Lato", fontSize: 55, fontWeight: 'bold' }}>
            Done Right
          </h1>
        </Container>
      </div>
      <div style={{ height: "90vh", background: "white" }}>
        <Container style={{ paddingBlock: "10%" }}>
          <h1 style={{ color: "black", fontFamily: "Lato", fontSize: 60 }}>
            Tenant relations
          </h1>
        </Container>
      </div>
      <Contact />
    </Container>
  );
}