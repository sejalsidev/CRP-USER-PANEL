import { TextField } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import * as yup from 'yup'
import { addWorkAllocate, updateWorkAllocate } from '../servicer/workallocate'
import axios from 'axios'

const WorkAllocateData = ({ show, handleClose, editingWork, updatework, fetchData }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [startDate1, setStartDate1] = useState(new Date());
    const [employees, setemployee] = useState(null)

    const validationSchema = yup.object({

        employeeId: yup.string().required("employeeId is required"),
        companyName: yup.string().required("companyName id required"),
        jobTitle: yup.string().required("jobTitle is required"),
        startDate: yup.string().required("startDate is required"),
        endDate: yup.string().required("endDate is required"),
        status: yup.string().required("status is required"),
        assignTask: yup.string().required("assignTask is required")

    })

    const getEmployeeName = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get("http://localhost:2000/workallocate/getEmployeeName", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setemployee(response.data.employeeData)
            console.log("get employee data", response.data.employeeData)
        } catch (error) {
            console.log("Error fetching data", error)
        }
    }

    useEffect(() => {
        getEmployeeName()
    }, [])
    const onSubmit = async (values, { resetForm }) => {
        console.log(values)
        try {
            if (editingWork) {
                const response = await updateWorkAllocate(updatework._id, values)
                console.log("update work allocate successfully", response.data.data)
            }
            else {
                const response = await addWorkAllocate(values)
                console.log("work allocate successfully", response.data.data)
            }
            fetchData()
            resetForm()
            handleClose()
        } catch (error) {
            console.log("Error Fetching Data", error)
        }
        resetForm()
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingWork ? "Update WorkAllocate" : "Add WorkAllocate"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='row justify-content-center' >
                            <div className='col'>
                                <Formik initialValues={editingWork ? {
                                    employeeId: updatework.employeeId,
                                    companyName: updatework.companyName,
                                    jobTitle: updatework.jobTitle,
                                    startDate: updatework.startDate,
                                    endDate: updatework.endDate,
                                    status: updatework.status,
                                    assignTask: updatework.assignTask
                                } : { employeeId: "", companyName: "", jobTitle: "", startDate: null, endDate: null, status: "", assignTask: "" }}
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmit}
                                >
                                    {({ setFieldValue }) => (
                                        <Form>
                                            <div className="form-group">
                                                <label htmlFor="employeeId">Employee</label>
                                                <Field as="select" name="employeeId" className="form-control">
                                                    <option value="">Select</option>
                                                    {employees && employees.map((employee) => (
                                                        <option key={employee._id} value={employee._id}>
                                                            {employee.userName}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage component="div" name="employeeId" className='text-danger' />
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor='companyName'>Company Name</label>
                                                <Field as={TextField} name="companyName" className="form-control" />
                                                <ErrorMessage name="companyName" component="div" className='text-danger' />
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor='startDate'>Start Date</label>
                                                <DatePicker
                                                    selected={startDate1}
                                                    onChange={(date) => { setStartDate1(date); setFieldValue('startDate', date); }}
                                                    className='form-control'
                                                />
                                                <ErrorMessage name="startDate" component="div" className='taxt-danger' />
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor='jobTitle'>JobTitle</label>
                                                <Field as={TextField} name="jobTitle" className="form-control" />
                                                <ErrorMessage name="jobTitle" component="div" className='text-danger' />
                                            </div>

                                            <div className='form-group'>
                                                <label htmlFor='endDate'>End Date</label>
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={(date) => { setStartDate(date); setFieldValue('endDate', date); }}
                                                    className='form-control'
                                                />
                                                <ErrorMessage name="endDate" component="div" className='taxt-danger' />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="status">Status</label>
                                                <Field as="select" name="status" className="form-control">
                                                    <option value="">Select</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="in-progress">In Progress</option>
                                                    <option value="completed">Completed</option>
                                                </Field>
                                                <ErrorMessage component="div" name="status" className='text-danger' />
                                            </div>
                                            <div className='form-group' style={{ marginBottom: "10px" }}>
                                                <label htmlFor='assignTask'>Assign Task</label>
                                                <Field as={TextField} name="assignTask" className="form-control" />
                                                <ErrorMessage name="assignTask" component="div" className='text-danger' />
                                            </div>
                                            <div className='form-group'>
                                                <button type="submit" className='btn btn-primary'>{editingWork ? "Update" : "Submit"}</button>
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

export default WorkAllocateData