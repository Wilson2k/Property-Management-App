import NavBar from '../NavBar';
import LoginForm from './LoginForm';

export default function LoginPage() {
    return (
        <div>
            <NavBar link={'/login'} />
            <LoginForm />
        </div>
    );
}
