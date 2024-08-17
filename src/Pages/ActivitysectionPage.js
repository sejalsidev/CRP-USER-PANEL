import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";

const ActivitysectionPage = () => {
    const [activity, setActivity] = useState([]);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get("http://localhost:2000/activitysection/getactivity", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setActivity(response.data.data);
            console.log("get activity section", response.data.data);
        } catch (error) {
            console.log("Error Fetching Data", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='container mt-4'>
            <div className='row'>
                {activity && activity.map((section, index) => (
                    <div className='col-md-4' key={index}>
                        <Card style={{ marginBottom: '30px', boxShadow: '0 4px 29px rgba(0, 0, 0, 0.4)', border: '1px solid #ccc' }}>
                            <Card.Body className='p-0'>
                                <div className='row'>
                                    <div className='col-md-4 d-flex justify-content-center align-items-center' style={{ background: "rgb(161 214 233)" }}>
                                        <Card.Img
                                            variant="top"
                                            src={require('../images/avtar-prifile-image.png')}
                                            className='profile-image rounded-circle w-75'
                                        />
                                    </div>
                                    <div className='col-md-8'>
                                        <div>
                                            <Card.Title><strong>Title:</strong> {section.title}</Card.Title>
                                            <ListGroup className="list-group-flush">
                                                <ListGroup.Item className='w-auto'>
                                                    <strong><small>Activity Type:</small></strong> {section.activityType} <br />
                                                    <strong><small>Activity Description:</small></strong> {section.activityDesc}<br />
                                                    <strong><small>Activity Date:</small></strong> {section.activityDate}
                                                </ListGroup.Item>
                                            </ListGroup>
                                            <Card.Body className="d-flex justify-content-center align-items-center">
                                                <Card.Link style={{ color: "#165a72", marginRight: '10px' }}><FiEdit3 /></Card.Link>
                                                <Card.Link style={{ color: "#165a72" }}><RiDeleteBin7Line /></Card.Link>
                                            </Card.Body>
                                        </div>

                                    </div>
                                </div>
                            </Card.Body>

                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ActivitysectionPage;
