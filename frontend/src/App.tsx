import './App.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <div className="App">
      <NavBar />
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
        <div style={{ height: "8vh", background: "#0B2447", display: 'flex' }}>
          <Container style={{ display: 'flex', justifyContent: 'center' }}>
            <Row style={{ alignItems: 'center' }}>
              <Col>
                <a href="https://github.com/Wilson2k">
                  <i className="bi bi-github" style={{ color: "white", fontSize: 30 }}></i>
                </a>
              </Col>
              <Col>
                <a href="https://www.linkedin.com/in/wilsonchen2000/">
                  <i className="bi bi-linkedin" style={{ color: "white", fontSize: 30 }}></i>
                </a>
              </Col>
              <Col>
                <a href="mailto:wilsonchen819@gmail.com">
                  <i className="bi bi-envelope-fill" style={{ color: "white", fontSize: 30 }}></i>
                </a>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </div>
  );
}

export default App;