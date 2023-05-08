import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useEffect, useState } from 'react';
import { logoutUser } from '../../utils/ApiService';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import { Col } from "react-bootstrap";
import './SideNav.css';

interface NavBarProps {
    link: string;
}

export default function SideNav(props: NavBarProps) {
    const [active, setActive] = useState<string>('/');
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' });
    const navigate = useNavigate();
    const { mutateAsync } = useMutation({
        mutationFn: logoutUser,
    });
    const FormSubmit = async () => {
        const response = await mutateAsync();
        if (response?.status === 200) {
            navigate(`/`);
        }
    };

    useEffect(() => {
        setActive(props.link);
    }, [props.link]);

    return (
        <Col className="px-0" lg='auto' style={{width: isDesktopOrLaptop ? '20%' : 'auto', maxWidth: '350px'}}>
            <Nav activeKey={active} variant="pills" defaultActiveKey="/" className="flex-column" style={{ background: '#19376D', minHeight: '100vh', paddingInline: isDesktopOrLaptop ? 20 : 10 }}>
                <Navbar.Brand href="/" style={{ fontFamily: "Lato", fontWeight: 'bold', color: 'white', marginBlock: 20 }}>
                    <i className="bi bi-buildings-fill" style={{ marginRight: isDesktopOrLaptop ? 20 : 0 }}></i>
                    {isDesktopOrLaptop && <>HouseConnect</>}
                </Navbar.Brand>
                <Nav.Link style={{ color: 'white', marginBlock: 20, display: 'flex' }} href="/dashboard">
                    <i className="bi bi-ui-checks-grid" style={{ marginRight: isDesktopOrLaptop ? 20 : 0 }}></i>
                    {isDesktopOrLaptop && <>Dashboard</>}
                </Nav.Link>
                <Nav.Link style={{ color: 'white', marginBlock: 20, display: 'flex' }} href="/properties">
                    <i className="bi bi-houses-fill" style={{ marginRight: isDesktopOrLaptop ? 20 : 0 }}></i>
                    {isDesktopOrLaptop && <>Properties</>}
                </Nav.Link>
                <Nav.Link style={{ color: 'white', marginBlock: 20, display: 'flex' }} href="/tenants">
                    <i className="bi bi-people-fill" style={{ marginRight: isDesktopOrLaptop ? 20 : 0 }}></i>
                    {isDesktopOrLaptop && <>Tenants</>}
                </Nav.Link>
                <Nav.Link style={{ color: 'white', marginBlock: 20, display: 'flex' }} href="/leases">
                    <i className="bi bi-file-text-fill" style={{ marginRight: isDesktopOrLaptop ? 20 : 0 }}></i>
                    {isDesktopOrLaptop && <>Leases</>}
                </Nav.Link>
                <Nav.Link style={{ color: 'white', marginBlock: 20, display: 'flex' }} href="/tickets">
                    <i className="bi bi-ticket-detailed-fill" style={{ marginRight: isDesktopOrLaptop ? 20 : 0 }}></i>
                    {isDesktopOrLaptop && <>Tickets</>}
                </Nav.Link>
                <Nav.Link style={{ color: 'white', marginBlock: 20, display: 'flex' }} href="/profile">
                    <i className="bi bi-person-circle" style={{ marginRight: isDesktopOrLaptop ? 20 : 0 }}></i>
                    {isDesktopOrLaptop && <>Profile</>}
                </Nav.Link>
                <Nav.Link className="mt-auto" style={{ color: 'white', display: 'flex', marginBlock: 20 }} onClick={FormSubmit}>
                    <i className="bi bi-box-arrow-left" style={{ marginRight: isDesktopOrLaptop ? 20 : 0 }}></i>
                    {isDesktopOrLaptop && <>Sign Out</>}
                </Nav.Link>
            </Nav>
        </Col>
    );
}