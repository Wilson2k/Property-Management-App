import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavBar() {
    return (
        <Navbar collapseOnSelect expand="lg" style={{ background: "white", marginInline: "2%" }}>
            <Navbar.Brand href="/home" style={{ fontFamily: "Lato", fontWeight: 'bold' }}>
                <i className="bi bi-buildings-fill" style={{ marginRight: 10 }}></i>
                HouseConnect
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ border: "none" }} />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/features">Features</Nav.Link>
                    <Nav.Link href="/resources">Resources</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}