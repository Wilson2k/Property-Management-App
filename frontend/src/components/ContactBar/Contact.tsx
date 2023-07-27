import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Contact() {
  return (
    <div style={{ height: '8vh', background: '#0B2447', display: 'flex' }}>
      <Container style={{ display: 'flex', justifyContent: 'center' }}>
        <Row style={{ alignItems: 'center' }}>
          <Col>
            <a href="https://github.com/Wilson2k">
              <i className="bi bi-github" style={{ color: 'white', fontSize: 30 }}></i>
            </a>
          </Col>
          <Col>
            <a href="https://www.linkedin.com/in/wilsonchen2000/">
              <i className="bi bi-linkedin" style={{ color: 'white', fontSize: 30 }}></i>
            </a>
          </Col>
          <Col>
            <a href="mailto:wilsonchen819@gmail.com">
              <i
                className="bi bi-envelope-fill"
                style={{ color: 'white', fontSize: 30 }}
              ></i>
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
