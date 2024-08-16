import React, { useEffect, useState } from 'react'
import WorkAllocateData from '../Component/WorkAllocateData';
import axios from 'axios';

const WorkAllocatePage = () => {
    const [workallocate, setworkallocate] = useState(null)
    const [editingWork, setEditingWork] = useState(null)
    const [updatework, setUpdateWork] = useState(null)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get("http://localhost:2000/workallocate/get", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log("get work allocate data", response.data)
            setworkallocate(response.data.data)
        } catch (error) {
            console.log("Error fetching Data", error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleEdit = async (work) => {
        handleShow()
        setEditingWork(true)
        setUpdateWork(work)
    }
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:2000/workallocate/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log("delete record successfully", response.data.data)
        } catch (error) {
            console.log("Error Fetching Data", error)
        }
    }
    return (
        <>
            <button type="submit" className='btn btn-primary' onClick={handleShow}>Add-WorkAllocate</button>
            <table className='table'>
                <thead>
                    <th>Company Name</th>
                    <th>JobTitle</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Assign Task</th>
                </thead>
                <tbody>
                    {
                        workallocate && workallocate.map((work, index) => (
                            <tr key={index}>
                                <td>{work.companyName}</td>
                                <td>{work.jobTitle}</td>
                                <td>{work.startDate}</td>
                                <td>{work.endDate}</td>
                                <td>{work.status}</td>
                                <td>{work.assignTask}</td>
                                <td><button type="submit" className='btn btn-success' onClick={() => handleEdit(work)}>Edit</button></td>
                                <td><button type="submit" className='btn btn-danger' onClick={() => handleDelete(work._id)}>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <WorkAllocateData show={show} handleShow={handleShow} handleClose={handleClose} fetchData={fetchData} editingWork={editingWork} updatework={updatework} />
        </>
    )
}

export default WorkAllocatePage