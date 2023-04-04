import Nav from 'react-bootstrap/Nav';

interface NavBarProps {
    link: string
}

export default function DashNav(props: NavBarProps) {
    return (
        <Nav variant="pills" defaultActiveKey="/home" className="flex-column">
            <Nav.Link href="/home">Profile</Nav.Link>
            <Nav.Link eventKey="properties">Properties</Nav.Link>
            <Nav.Link eventKey="tenants">Tenants</Nav.Link>
            <Nav.Link eventKey="leases">Leases</Nav.Link>
            <Nav.Link eventKey="tickets">Tickets</Nav.Link>
        </Nav>
    );
}