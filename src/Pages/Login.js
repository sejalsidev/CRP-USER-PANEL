import React from 'react';
import { loginData } from '../servicer/login';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from "yup";
import { TextField, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const validationSchema = yup.object({
        email: yup.string().email('Invalid email format').required("email is required"),
        password: yup.string().required("password is required"),
    });

    const fetchData = async (values) => {
        try {
            console.log(values, "valuesvalues")
            const response = await loginData(values);
            console.log(response.data);
            navigate("/")

        } catch (error) {
            console.log("Error Fetching Data", error);
            // toast.error('Login failed. Please try again.');
        }
    };

    const onsubmit = async (values, { resetForm }) => {
        fetchData(values)
        console.log(values, "valuesschdschsdhsdgcfhusdhgcfhusd");
        toast.success('Login successful!');
        resetForm();
    };



    return (
        <>
            <div className='container' style={{ marginTop: "300px" }}>
                <div className='row justify-content-center p-2 border'>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <img src={require('../images/image.png')} style={{ width: "800px", height: "300px" }} alt="Login" />
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <div className='row'>
                            <Formik
                                initialValues={{ email: "", password: "" }}
                                validationSchema={validationSchema}
                                onSubmit={onsubmit}
                            >
                                <Form>
                                    <h4>Login</h4>
                                    <div className='form-group'>
                                        <label htmlFor='email'>Email</label>
                                        <Field as={TextField} name="email" className="form-control" />
                                        <ErrorMessage component="div" className='text-danger' name="email" />
                                    </div>
                                    <div className='form-group' style={{ marginBottom: "10px" }}>
                                        <label htmlFor='password'>Password</label>
                                        <Field as={TextField} name="password" type="password" className="form-control" />
                                        <ErrorMessage component="div" className='text-danger' name="password" />
                                    </div>
                                    <div>
                                        <Button type="submit" variant="contained" color="primary">Login</Button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default Login;
