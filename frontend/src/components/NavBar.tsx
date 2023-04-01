import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavBar() {
    return (
        <Navbar collapseOnSelect expand="lg" style={{background: "linear-gradient(90deg, rgba(15,65,167,1) 0%, rgba(15,188,191,1) 100%)"}}>
            <Container>
                <Navbar.Brand href="#home">PropertyApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#register">Register</Nav.Link>
                        <Nav.Link href="#login">Login</Nav.Link>
                        <Nav.Link href="#about">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}