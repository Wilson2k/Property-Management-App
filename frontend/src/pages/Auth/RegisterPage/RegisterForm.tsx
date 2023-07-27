import Form from 'react-bootstrap/Form';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../../utils/ApiService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as UserTypes from '../../../types/User';

export default function RegisterForm() {
  const defaultRegister: UserTypes.UserRegisterContext = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({ defaultValues: defaultRegister });
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState(0);
  const { mutateAsync } = useMutation({
    mutationFn: registerUser,
    onSettled: () => {
      setLoading(false);
    },
  });
  const FormSubmit = async (data: UserTypes.UserRegisterContext) => {
    setLoading(true);
    const response = await mutateAsync(data);
    setResponse(response?.status || 500);
    if (response?.status === 200) {
      navigate(`/login`);
    }
  };

  return (
    <div
      className="container"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBlock: '7rem',
      }}
    >
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
          <Form
            className="card-body p-5 text-center"
            onSubmit={(event) => void handleSubmit(FormSubmit)(event)}
          >
            <div className="mb-md-5">
              <h2 className="fw-bold mb-4 text-uppercase">Register</h2>
              <div className="form-outline form-white mb-4">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  disabled={isLoading}
                  type="fname"
                  id="typefnameX"
                  className="form-control form-control-lg"
                  placeholder={'Enter your first name'}
                  {...register('firstName')}
                />
              </div>

              <div className="form-outline form-white mb-4">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  disabled={isLoading}
                  type="lname"
                  id="typelnameX"
                  className="form-control form-control-lg"
                  placeholder={'Enter your last name'}
                  {...register('lastName')}
                />
              </div>

              <div className="form-outline form-white mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  disabled={isLoading}
                  type="email"
                  id="typeEmailX"
                  className="form-control form-control-lg"
                  placeholder={'Enter your email'}
                  {...register('email')}
                />
              </div>

              <div className="form-outline form-white mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  disabled={isLoading}
                  type="password"
                  id="typePasswordX"
                  className="form-control form-control-lg"
                  placeholder={'Enter your password'}
                  {...register('password')}
                />
              </div>
              {response === 422 ? (
                <div className="card bg-danger">Invalid input</div>
              ) : (
                <></>
              )}
              {response === 409 ? (
                <div className="card bg-danger">Email taken</div>
              ) : (
                <></>
              )}
              {response === 500 ? (
                <div className="card bg-danger">Error registering</div>
              ) : (
                <></>
              )}
              {response === 200 ? (
                <div className="card bg-success">Successfully Registered</div>
              ) : (
                <></>
              )}

              <button
                className="btn btn-outline-light btn-lg px-5 mt-4"
                type="submit"
                disabled={isLoading}
              >
                {isLoading && (
                  <span className="spinner-border spinner-border-sm me-3"></span>
                )}
                Register
              </button>
            </div>
            <div>
              <p className="mb-0 mt-4">
                Already have an account?{' '}
                <a href="/login" className="text-white-50 fw-bold">
                  Login
                </a>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
