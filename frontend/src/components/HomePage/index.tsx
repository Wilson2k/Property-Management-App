import NavBar from '../NavBar';
import Home from './Home';

export default function HomePage() {
    return (
        <div>
            <NavBar link={'/'} />
            <Home />
        </div>
    );
}
