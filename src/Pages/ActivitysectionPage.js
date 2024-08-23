import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";
import ActivitysectionData from '../Component/ActivitysectionData';

const ActivitysectionPage = () => {
    const [activity, setActivity] = useState([]);
    const [editActivity, setEditActivity] = useState(null);
    const [updateActivity, setUpdateActivity] = useState(null);
    const [show, setShow] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardClick = (section) => {
        if (selectedCard === section._id) {
            setSelectedCard(null); // Deselect the card if it's already selected
        } else {
            setSelectedCard(section._id); // Select the card
        }
    };


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get("http://localhost:2000/activitysection/getactivity", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setActivity(response.data.data);
            console.log("Fetched activity section:", response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = (section) => {
        handleShow();
        setEditActivity(true);
        setUpdateActivity(section);
    };
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:2000/activitysection/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            console.log("delete record successfully", response.data.data)
        } catch (error) {
            console.log("Error Fetching data", error)
        }
    }
    return (
        <>
            <button type="button" className="btn btn-outline-primary" onClick={handleShow}>
                Add Activity
            </button>
            <div className="container mt-4 ">
                <div className="row">
                    {activity.map((section, index) => (
                        <div className={`col-md-4 ${selectedCard === section._id ? 'col-md-4' : ''}`} key={index} onClick={() => handleCardClick(section)}>
                            <Card
                                style={{
                                    margin: '20px',
                                    boxShadow: '0 4px 29px rgba(0, 0, 0, 0.5)',
                                    border: '1px solid #ccc',
                                    borderRadius: '10px',
                                    transform: selectedCard === section._id ? 'scale(1.1)' : 'scale(1)',
                                    transition: 'transform 0.3s ease-in-out',
                                    cursor: 'pointer',
                                }}
                                className="card-hover"
                            >
                                <Card.Body className="p-0">
                                    <div className="row">
                                        <div className="col-md-4 d-flex justify-content-center align-items-center" style={{ background: "rgb(161 214 233)", borderRadius: '5px' }}>
                                            <Card.Img
                                                variant="top"
                                                src={require('../images/avtar-prifile-image.png')}
                                                className="profile-image rounded-circle w-75"
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <Card.Title><strong>Title:</strong> {section.title}</Card.Title>
                                            <ListGroup className="list-group-flush">
                                                <ListGroup.Item>
                                                    <strong><small>Activity Type:</small></strong> {section.activityType}<br />
                                                    <strong><small>Activity Description:</small></strong> {section.activityDesc}<br />
                                                    <strong><small>Activity Date:</small></strong> {section.activityDate.toString()}
                                                </ListGroup.Item>
                                            </ListGroup>
                                            <Card.Body className="d-flex justify-content-center align-items-center">
                                                <Card.Link style={{ color: "#165a72", marginRight: '10px' }} onClick={(e) => { e.stopPropagation(); handleEdit(section); }}>
                                                    <FiEdit3 />
                                                </Card.Link>
                                                <Card.Link style={{ color: "#165a72" }} onClick={(e) => { e.stopPropagation(); handleDelete(section._id); }}>
                                                    <RiDeleteBin7Line />
                                                </Card.Link>
                                            </Card.Body>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}

                </div>
            </div>
            <ActivitysectionData
                show={show}
                handleClose={handleClose}
                editActivity={editActivity}
                updateActivity={updateActivity}
                fetchData={fetchData}
            />
        </>
    );
}

export default ActivitysectionPage;
