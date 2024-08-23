import { TextField } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'
import { addActivitySection, editActivitySection } from '../servicer/activitysection'
import { Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker'

const ActivitysectionData = ({ show, handleClose, editActivity, updateActivity, fetchData }) => {
    const validationSchema = yup.object({
        activityType: yup.string().required("activityType is required"),
        activityDesc: yup.string().required("activityDesc is required"),
        activityDate: yup.string().required("activityDate is required"),
        title: yup.string().required("title is required")
    })
    const [startDate, setStartDate] = useState(new Date());
    const onSubmit = async (values, { resetForm }) => {
        console.log(values);
        try {
            if (editActivity) {
                console.log(updateActivity._id, "sssss")
                let id = updateActivity._id;
                const response = await editActivitySection(id, values);
                console.log("update activity section successfully", response.data.data);
            } else {
                const response = await addActivitySection(values);
                console.log("add activity section successfully", response.data.data);
            }
            fetchData();
            resetForm();
            handleClose();
        } catch (error) {
            console.log("Error Fetching Data", error);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editActivity ? "Update-Activity-Section" : "Add-Activity-Section"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className='col'>
                                <Formik initialValues={editActivity ? {
                                    activityType: updateActivity.activityType,
                                    activityDesc: updateActivity.activityDesc,
                                    activityDate: updateActivity.activityDate,
                                    title: updateActivity.title
                                } : {
                                    activityType: "",
                                    activityDesc: "",
                                    activityDate: "",
                                    title: ""
                                }}
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmit}
                                >
                                    {({ setFieldValue }) => (

                                        <Form>
                                            <div className='form-group'>
                                                <label htmlFor='activityType'>Activity Type</label>
                                                <Field as={TextField} name="activityType" className="form-control" />
                                                <ErrorMessage component="div" name="activityType" className='text-danger' />
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor='activityDesc'>Activity Description</label>
                                                <Field as={TextField} name="activityDesc" className="form-control" />
                                                <ErrorMessage component="div" name="activityDesc" className='text-danger' />
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor='title'>Title</label>
                                                <Field as={TextField} name="title" className="form-control" />
                                                <ErrorMessage component="div" name="title" className='text-danger' />
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor='activityDate'>Activity Date</label>
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={(date) => {
                                                        setStartDate(date);
                                                        setFieldValue('activityDate', date);
                                                    }}
                                                    className="form-control"
                                                />
                                                <ErrorMessage component="div" name="activityDate" className='text-danger' />
                                            </div>
                                            <div>
                                                <button type="submit" className='btn btn-primary'>{editActivity ? "Update" : "Submit"}</button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal >

        </>
    )
}

export default ActivitysectionData