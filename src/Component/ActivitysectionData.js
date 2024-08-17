import { TextField } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'

const ActivitysectionData = () => {
    const validationSchema = yup.object({
        activityType: yup.string().required("activityType is required"),
        activityDesc: yup.string().required("activityDesc is required"),
        activityDate: yup.string().required("activityDate is required"),
        title: yup.string().required("title is required")
    })

    const onSubmit = async (values) => {
        console.log(values)
    }
    return (
        <>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col'>
                        <Formik initialValues={{
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
                                        <ErrorMessage component="div" name="activityType" />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='activityDesc'>Activity Description</label>
                                        <Field as={TextField} name="activityDesc" className="form-control" />
                                        <ErrorMessage component="div" name="activityDesc" />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='title'>Title</label>
                                        <Field as={TextField} name="title" className="form-control" />
                                        <ErrorMessage component="div" name="title" />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='activityDate'>Date</label>
                                        <Field as={TextField} name="activityDate" className="form-control" onChange={(date) => setFieldValue("date", date)} />
                                        <ErrorMessage component="div" name="activityDate" />
                                    </div>
                                    <div>
                                        <button type="submit" className='btn btn-primary'>Submit</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ActivitysectionData