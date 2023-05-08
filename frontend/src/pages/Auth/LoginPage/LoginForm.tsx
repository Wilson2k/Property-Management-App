import Form from 'react-bootstrap/Form';
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { loginUser, getUser } from '../../../utils/ApiService';
import * as UserTypes from '../../../types/User';

export default function LoginForm() {
    const defualtLogin: UserTypes.UserLoginContext = {
        email: '',
        password: ''
    };
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({ defaultValues: defualtLogin });
    const [isLoading, setLoading] = useState(false);
    const [response, setResponse] = useState(0);
    const { mutateAsync } = useMutation({
        mutationFn: loginUser,
        onSettled: () => {
            setLoading(false);
        },
    });
    const FormSubmit = async (data: UserTypes.UserLoginContext) => {
        setLoading(true)
        const response = await mutateAsync(data);
        setResponse(response?.status || 500);
        if (response?.status === 200) {
            navigate(`/dashboard`);
        }
    }

    // Redirect to dashboard if already logged in
    const { data } = useQuery({
        queryKey: ['profile'],
        queryFn: getUser,
    });
    useEffect(() => {
        if (data?.status === 200) {
            navigate(`/dashboard`);
        }
    })
    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBlock: '11rem' }}>
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                    <Form className="card-body p-5 text-center" onSubmit={handleSubmit(FormSubmit)}>
                        <div className="mb-md-5">
                            <h2 className="fw-bold mb-4 text-uppercase">Login</h2>
                            <div className="form-outline form-white mb-4">
                                <Form.Label>Email</Form.Label>
                                <Form.Control disabled={isLoading} type="email" id="typeEmailX" className="form-control form-control-lg" placeholder={"Enter your email"}
                                    {...register('email')} />
                            </div>

                            <div className="form-outline form-white mb-4">
                                <Form.Label>Password</Form.Label>
                                <Form.Control disabled={isLoading} type="password" id="typePasswordX" className="form-control form-control-lg" placeholder={"Enter your password"}
                                    {...register('password')} />
                            </div>
                            {response === 422 ? <div className="card bg-danger">Invalid input</div> : <></>}
                            {response === 404 ? <div className="card bg-danger">Account not found</div> : <></>}
                            {response === 400 ? <div className="card bg-danger">Incorrect password</div> : <></>}
                            {response === 500 ? <div className="card bg-danger">Error logging in</div> : <></>}
                            {response === 200 ? <div className="card bg-success">Successfully Logged In</div> : <></>}

                            <button className="btn btn-outline-light btn-lg px-5 mt-4" type="submit">
                                {isLoading && <span className="spinner-border spinner-border-sm me-3"></span>}
                                Login
                            </button>
                        </div>
                        <div>
                            <p className="mb-0 mt-4">Don't have an account? <a href="/register" className="text-white-50 fw-bold">Sign Up</a>
                            </p>
                        </div>

                    </Form>
                </div>
            </div>
        </div >
    )
}