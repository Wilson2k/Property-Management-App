import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useEffect, useState } from 'react';
import './NavBar.css'

interface NavBarProps {
    link: string
}

export default function HomeNav(props: NavBarProps) {
    const [active, setActive] = useState<string>('/');

    useEffect (() => {
        setActive(props.link);
    }, [props.link])

    return (
        <Navbar className="shadow-lg bg-body" expand="lg" style={{ background: "white", paddingInline: "2%" , width: "100%", position: 'sticky', top:0 }}>
            <Navbar.Brand href="/" style={{ fontFamily: "Lato", fontWeight: 'bold' }}>
                <i className="bi bi-buildings-fill" style={{ marginRight: 10 }}></i>
                HouseConnect
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ border: "none" }} />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav activeKey={active} className="me-auto">
                    {active === "/about" ? <></> :<Nav.Link href="/about">About</Nav.Link>}
                    {active === "/contact" ? <></> :<Nav.Link href="/contact">Contact</Nav.Link>}
                </Nav>
                <Nav activeKey={active}>
                    {active === "/login" ? <></> : <Nav.Link href="/login">Login</Nav.Link>}
                    {active === "/register" ? <></> : <Nav.Link href="/register">Register</Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}