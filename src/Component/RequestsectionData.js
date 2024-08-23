import { TextField } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import * as yup from 'yup'
import { addRequestSection, updateRequestSection } from '../servicer/requestsection'

const RequestsectionData = ({ show, handleClose, fetchData, editrequest, updaterequest }) => {
    const [startDate, setStartDate] = useState(new Date());

    const validationSchema = yup.object({
        title: yup.string().required("title is required"),
        description: yup.string().required("description is required"),
        priority: yup.string().required("priority is required"),
        status: yup.string().required("status is required"),
        dateCreated: yup.string().required("dateCreated is required"),
        dateUpdated: yup.string().required("dateUpdated is required")
    })

    const onSubmit = async (values, { resetForm }) => {
        console.log(values)
        try {
            if (editrequest) {
                const response = await updateRequestSection(updaterequest._id, values)
                console.log("update request section successfully", response.data.data)
            }
            else {
                const response = await addRequestSection(values)
                console.log("add request section successfully", response.data.data)
            }
            resetForm()
            fetchData()
            handleClose()
        } catch (error) {
            console.log("Error Fetching Data", error)
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editrequest ? "Update Request Section" : "Add Request Section"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik initialValues={editrequest ? {
                        title: updaterequest && updaterequest.title,
                        description: updaterequest && updaterequest.description,
                        priority: updaterequest && updaterequest.priority,
                        dateCreated: updaterequest && updaterequest.dateCreated,
                        dateUpdated: updaterequest && updaterequest.dateUpdated
                    } : {
                        title: "",
                        description: "",
                        priority: "",
                        status: "",
                        dateCreated: "",
                        dateUpdated: ""
                    }}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ setFieldValue }) => (
                            <Form>
                                <div className='form-group'>
                                    <label htmlFor='title'>Title</label>
                                    <Field as={TextField} name="title" className="form-control" />
                                    <ErrorMessage name="title" className='text-danger' component="div" />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='description'>Description</label>
                                    <Field as={TextField} name="description" className="form-control" />
                                    <ErrorMessage name="description" className='text-danger' component="div" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="priority">Priority</label>
                                    <Field as="select" name="priority" className="form-control">
                                        <option value="">Select</option>
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                        <option value="low">Low</option>
                                    </Field>
                                    <ErrorMessage component="div" name="priority" className='text-danger' />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <Field as="select" name="status" className="form-control">
                                        <option value="">Select</option>
                                        <option value="Approve">Approve</option>
                                        <option value="Not Approve">Not Approve</option>
                                        <option value="Cancel">Cancel</option>
                                    </Field>
                                    <ErrorMessage component="div" name="status" className='text-danger' />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='dateCreated'>Date Created</label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => {
                                            setStartDate(date);
                                            setFieldValue('dateCreated', date);
                                        }}
                                        className="form-control"
                                    />
                                    <ErrorMessage component="div" name="dateCreated" className='text-danger' />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='dateUpdated'>Date Updated</label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => {
                                            setStartDate(date);
                                            setFieldValue('dateUpdated', date);
                                        }}
                                        className="form-control"
                                    />
                                    <ErrorMessage component="div" name="dateUpdated" className='text-danger' />
                                </div>
                                <div>
                                    <button type="submit" className='btn btn-primary'>{editrequest ? "Update" : "Submit"}</button>
                                </div>
                            </Form>

                        )}

                    </Formik>
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

export default RequestsectionData