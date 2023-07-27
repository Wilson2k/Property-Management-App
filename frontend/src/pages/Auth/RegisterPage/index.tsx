import NavBar from '../../../components/HomeNav';
import RegisterForm from './RegisterForm';

export default function RegisterPage() {
  return (
    <div>
      <NavBar link={'/register'} />
      <RegisterForm />
    </div>
  );
}
