import { Container } from "react-bootstrap";
import { Nav, Navbar, Button, Offcanvas } from "react-bootstrap";
import { useMediaQuery } from 'react-responsive';
import { useState } from "react";
import * as Filter from '../../types/Filter';

export default function PageFilter(props: Filter.PageFilter) {
    const [showOffCanvas, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' });
    return (
        <Navbar expand="lg" className="my-2" style={{ paddingBottom: 0 }}>
            <Container fluid={!isDesktopOrLaptop} style={{ display: isDesktopOrLaptop ? 'inline' : 'flex', maxWidth: '100%' }}>
                {!isDesktopOrLaptop && <Navbar.Brand>{props.title}</Navbar.Brand>}
                <Navbar.Toggle onClick={handleShow} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-lg`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                    placement={"top"}
                    responsive={'lg'}
                    style={{ height: `${isDesktopOrLaptop ? 'auto' : '100vh'}` }}
                    show={showOffCanvas}
                >
                    <Offcanvas.Header>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                            {props.title}
                        </Offcanvas.Title>
                        <Button className="btn-close" onClick={handleClose} />
                    </Offcanvas.Header>
                    {!isDesktopOrLaptop && <hr style={{ border: '1px solid black', margin: 0 }} />}
                    <Offcanvas.Body>
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            {props.children}
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}