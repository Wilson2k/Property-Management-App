import Form from 'react-bootstrap/Form';

export default function LoginForm() {
    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBlock: '7rem' }}>
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                    <div className="card-body p-5 text-center">
                        <div className="mb-md-5">
                            <h2 className="fw-bold mb-4 text-uppercase">Login</h2>
                            <div className="form-outline form-white mb-4">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" id="typeEmailX" className="form-control form-control-lg" placeholder={"Enter your email"} />
                            </div>

                            <div className="form-outline form-white mb-4">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" id="typePasswordX" className="form-control form-control-lg" placeholder={"Enter your password"} />
                            </div>

                            <button className="btn btn-outline-light btn-lg px-5 mt-4" type="submit">Login</button>
                        </div>
                        <div>
                            <p className="mb-0 mt-4">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}