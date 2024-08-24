import { TextField } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import * as yup from 'yup'

const AttendanceData = ({ show, handleClose }) => {
    const [startDate, setStartDate] = useState(new Date());
    const validationSchema = yup.object({
        employee: yup.string().required("employee is required"),
        date: yup.string().required("date is required"),
        clockIn: yup.string().required("clockIn is required"),
        clockOut: yup.string().required("clockOut is required"),
        status: yup.string().required("status is required"),
        notes: yup.string().required("notes is required")
    })
    const onSubmit = async (values) => {
        console.log(values)
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className='col'>
                                <Formik initialValues={{ employee: "", date: "", clockIn: "", clockOut: "", status: "", notes: "" }}
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmit}
                                >
                                    {({ setFieldValue }) => (
                                        <Form>
                                            <div className='form-group'>
                                                <label htmlFor='employee'>Employee</label>
                                                <Field as={TextField} name="employee" className="form-control" />
                                                <ErrorMessage component="div" name="employee" className='text-danger' />
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor='date'>Date</label>
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={(date) => {
                                                        setStartDate(date);
                                                        setFieldValue('date', date);
                                                    }}
                                                    className="form-control"
                                                />
                                                <ErrorMessage component="div" name="date" className='text-danger' />
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor='clockIn'>Clock In</label>
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={(date) => {
                                                        setStartDate(date);
                                                        setFieldValue('clockIn', date);
                                                    }}
                                                    className="form-control"
                                                />
                                                <ErrorMessage component="div" name="clockIn" className='text-danger' />
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor='clockOut'>Clock Out</label>
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={(date) => {
                                                        setStartDate(date);
                                                        setFieldValue('clockOut', date);
                                                    }}
                                                    className="form-control"
                                                />
                                                <ErrorMessage component="div" name="clockOut" className='text-danger' />
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor='status'>Status</label>
                                                <Field as={TextField} name="status" className="form-control" />
                                                <ErrorMessage component="div" name="status" className='text-danger' />
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor='notes'>Notes</label>
                                                <Field as={TextField} name="notes" className="form-control" />
                                                <ErrorMessage component="div" name="notes" className='text-danger' />
                                            </div>
                                        </Form>
                                    )}

                                </Formik>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer> */}
            </Modal>

        </>
    )
}

export default AttendanceData