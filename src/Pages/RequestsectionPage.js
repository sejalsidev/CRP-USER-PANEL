import React, { useEffect, useState } from 'react'
import RequestsectionData from '../Component/RequestsectionData';
import { AiTwotoneEdit } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import axios from 'axios';

const RequestsectionPage = () => {
    const [requestData, setRequestData] = useState(null)
    const [editrequest, setRequest] = useState(null)
    const [updaterequest, setUpdateRequest] = useState(null)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchData = async (req, res) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get("http://localhost:2000/requestsection/get", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            console.log("get request section data successfully", response.data.data)
            setRequestData(response.data.data)
        } catch (error) {
            console.log("Error Fetching Data", error)
        }
    }
    useEffect(() => {
        fetchData()

    }, [])


    const handleEdit = async (request) => {
        handleShow()
        setRequest(true)
        console.log(setRequest, "reqesdfdfgdfgvdfgvdfgvfdgdf")
        setUpdateRequest(request)
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:2000/requestsection/delete/${id}`)
            console.log("Delete request section successfully", response.data.data)
            fetchData()
        } catch (error) {
            console.log("Error Fetching data", error)
        }
    }
    return (

        <>
            <button type="submit" className='btn btn-outline-primary' onClick={handleShow}>
                Add-Request-Section
            </button>
            <table className='table'>
                <thead>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Date Created</th>
                    <th>Date Updated</th>
                </thead>
                <tbody>
                    {
                        requestData && requestData.map((request, index) => (
                            <tr key={index}>
                                <td>{request.title}</td>
                                <td>{request.description}</td>
                                <td>{request.priority}</td>
                                <td>{request.status}</td>
                                <td>{request.dateCreated}</td>
                                <td>{request.dateUpdated}</td>
                                <td><AiTwotoneEdit onClick={() => handleEdit(request)} /></td>
                                <td><MdOutlineDeleteOutline onClick={() => handleDelete(request._id)} /></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <RequestsectionData show={show} handleClose={handleClose} handleShow={handleShow} fetchData={fetchData} editrequest={editrequest} updaterequest={updaterequest} />
        </>
    )
}

export default RequestsectionPage