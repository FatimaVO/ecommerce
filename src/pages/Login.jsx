import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const submit = data => {
        axios
            .post("https://ecommerce-api-react.herokuapp.com/api/v1/users/login", data)
            .then(res => {
                navigate("/")
                localStorage.setItem("token", res.data.data.token);
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    alert("Credenciales inválidas");
                }
                console.log(error.response);
            });
        reset({
            email: "",
            password: ""
        });
    }

    return (
        <div className="login">
            <div className="loginContainer">
                <p className="loginTitle">Welcome! Enter your email and password to continue.</p>
                <div className="testDataContainer">
                    <p className="testData">Test data</p>
                    <p className='userText'> <i className="fa-solid fa-envelope"></i> fvo@gmail.com</p>
                    <p className='passwordText'> <i className="fa-solid fa-lock"></i> fvo1234</p>
                </div>
                <Form onSubmit={handleSubmit(submit)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" {...register("email")} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" {...register("password")} />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="loginButton">
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Login;