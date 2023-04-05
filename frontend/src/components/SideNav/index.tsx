import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useEffect, useState } from 'react';
import { logoutUser } from '../../config/ApiService';
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from "react-router-dom";
import './SideNav.css'

interface NavBarProps {
    link: string
}

export default function SideNav(props: NavBarProps) {
    const [active, setActive] = useState<string>('/');
    const navigate = useNavigate();
    const { mutateAsync } = useMutation({
        mutationFn: logoutUser,
    });
    const FormSubmit = async () => {
        const response = await mutateAsync();
        if(response?.status === 200){
            navigate(`/`);
        }
    }

    useEffect (() => {
        setActive(props.link);
    }, [props.link])

    return (
        <Nav activeKey={active} variant="pills" defaultActiveKey="/" className="flex-column" style={{ background: '#19376D', minHeight: '100vh', width: '250px', padding: 0 }}>
            <Navbar.Brand href="/" style={{ fontFamily: "Lato", fontWeight: 'bold', color: 'white', marginBlock: 20 }}>
                <i className="bi bi-buildings-fill" style={{ marginRight: 10 }}></i>
                HouseConnect
            </Navbar.Brand>
            <Nav.Link style={{ color: 'white', margin: 10, display: 'flex' }} href="/profile">
                <i className="bi bi-person-circle" style={{ marginRight: 20 }}></i>
                Profile
            </Nav.Link>
            <Nav.Link style={{ color: 'white', margin: 10, display: 'flex' }} href="/properties">
                <i className="bi bi-houses-fill" style={{ marginRight: 20 }}></i>
                Properties
            </Nav.Link>
            <Nav.Link style={{ color: 'white', margin: 10, display: 'flex' }} href="/tenants">
                <i className="bi bi-people-fill" style={{ marginRight: 20 }}></i>
                Tenants
            </Nav.Link>
            <Nav.Link style={{ color: 'white', margin: 10, display: 'flex' }} href="/leases">
                <i className="bi bi-file-text-fill" style={{ marginRight: 20 }}></i>
                Leases
            </Nav.Link>
            <Nav.Link style={{ color: 'white', margin: 10, display: 'flex' }} href="/tickets">
                <i className="bi bi-ticket-detailed-fill" style={{ marginRight: 20 }}></i>
                Tickets
            </Nav.Link>
            <Nav.Link className="mt-auto" style={{ color: 'white', margin: 10 }} onClick={FormSubmit}>
                <i className="bi bi-box-arrow-left" style={{ marginRight: 20 }}></i>
                Sign Out
            </Nav.Link>
        </Nav>
    );
}