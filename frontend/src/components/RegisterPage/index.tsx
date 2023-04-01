import NavBar from "../NavBar";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
    return (
        <div>
            <NavBar link={'/register'} />
            <RegisterForm />
        </div>
    );
}
