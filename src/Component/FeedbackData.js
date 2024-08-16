import { TextField } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import * as yup from 'yup';
import { addfeedback, updateFeedbackData } from '../servicer/feedback';

const FeedbackData = ({ show, handleShow, handleClose, getFeedback, editFeedback, updateFeedback }) => {
    const [startDate, setStartDate] = useState(new Date());
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const validationSchema = yup.object({
        comments: yup.string().required("comments are required"),
        rating: yup.string().required("rating is required"),
        dateSubmitted: yup.date().required("dateSubmitted is required")
    });

    const onSubmit = async (values, { resetForm }) => {
        try {
            if (editFeedback) {
                console.log(editFeedback)
                const response = await updateFeedbackData(updateFeedback._id, values)
                console.log("update feedback succesfully", response.data.data)
            }
            else {
                const response = await addfeedback(values)
                console.log("add feedback", response.data.data)
            }
            getFeedback()
            handleClose();
            resetForm()
        } catch (error) {
            console.log("Error Submitting Feedback", error);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{editFeedback ? "Update Feedback Form" : "Add Feedback Form"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className='col'>
                                <Formik
                                    initialValues={editFeedback ? {
                                        comments: updateFeedback.comments,
                                        rating: updateFeedback.rating,
                                        dateSubmitted: updateFeedback.dateSubmitted
                                    } : {
                                        comments: "",
                                        rating: "",
                                        datesubmitted: startDate
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmit}
                                >
                                    {({ setFieldValue }) => (
                                        <Form>
                                            <div className="form-group">
                                                <label htmlFor='comments'>Comments</label>
                                                <Field as={TextField} name="comments" className="form-control" />
                                                <ErrorMessage component="div" name="comments" className='text-danger' />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor='rating'>Rating</label>
                                                <Field as={TextField} name="rating" className="form-control" />
                                                <ErrorMessage component="div" name="rating" className='text-danger' />
                                            </div>
                                            <div className="form-group" style={{ marginBottom: "10px" }}>
                                                <label htmlFor='dateSubmitted'>Date</label>
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={(date) => { setStartDate(date); setFieldValue('dateSubmitted', date); }}
                                                    className='form-control'
                                                />
                                                <ErrorMessage component="div" name="dateSubmitted" className='text-danger' />
                                            </div>
                                            <div>
                                                <button type="submit" className='btn btn-primary'>
                                                    {editFeedback ? "Update Feedback" : "Add Feedback"}
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </>
    );
};

export default FeedbackData;
