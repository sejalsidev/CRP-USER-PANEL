import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import FeedbackData from '../Component/FeedbackData';

const FeedBackPage = () => {
    const [feedback, setFeedback] = useState('');
    const [editFeedback, setEditfeedback] = useState(null)
    const [updateFeedback, setUpdateFeedback] = useState(null)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getFeedback = async () => {
        try {
            const response = await axios.get("http://localhost:2000/feedback/getfeedback");
            console.log("get feedback successfully", response.data.data);
            setFeedback(response.data.data);
        } catch (error) {
            console.log("Error Fetching Data", error);
        }
    };

    useEffect(() => {
        getFeedback();
    }, []);

    const handleEdit = async (user) => {
        setEditfeedback(user)
        setUpdateFeedback(user)
        handleShow()
    }
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:2000/feedback/deletefeedback/${id}`)
            console.log("deleted feedback", response.data)
            return response.data
        } catch (error) {
            console.log("Error Fetching data", error)
        }
    }

    return (
        <>
            <Button type="button" className='btn btn-primary' onClick={handleShow}>Add Feedback</Button>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Comments</th>
                        <th>Rating</th>
                        <th>Date Submitted</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        feedback && feedback.map((user, index) => (
                            <tr key={index}>
                                <td>{user.comments}</td>
                                <td>{user.rating}</td>
                                <td>{new Date(user.dateSubmitted).toLocaleDateString()}</td>
                                <td><button className='btn btn-success' onClick={() => handleEdit(user)}>Edit</button></td>
                                <td><button className='btn btn-danger' onClick={() => handleDelete(user._id)}>Delete</button></td>
                            </tr>
                        ))

                    }
                </tbody>
            </table>
            <FeedbackData show={show} handleShow={handleShow} handleClose={handleClose} getFeedback={getFeedback} editFeedback={editFeedback} updateFeedback={updateFeedback} />
        </>
    );
};

export default FeedBackPage;
