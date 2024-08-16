import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProfileData from '../Component/ProfileData'

const ProfileDetail = () => {
    const [profile, setProfile] = useState(null)
    const [editProfile, setEditProfile] = useState(null)
    const [updateProfile, setUpdateProfile] = useState(null)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:2000/employee/get")
            console.log("get data successfully", response.data)
            setProfile(response.data)

        } catch (error) {
            console.log("Error fetching data", error)
        }

    }
    useEffect(() => {
        fetchData()
    }, [])


    const handleEdit = async (employee, id) => {
        handleShow()
        setEditProfile(true)
        setUpdateProfile(employee)
        console.log(employee, "employeeemployeeemployeeemployee")

    }

    const handleDelete = async (id) => {
        console.log(id)
        try {
            const response = await axios.delete(`http://localhost:2000/employee/delete/${id}`)
            console.log("Deleted Employee record successfully", response)

        } catch (error) {
            console.log("Error Fetching Data", error)
        }

    }
    return (
        <>
            <h1>profile details</h1>
            <table className='table'>
                <thead>
                    <th>Image</th>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>Last Name</th>
                    <th>Date Of Birth</th>
                    <th>Father Name</th>
                    <th>Gender</th>
                    <th>Material Status</th>
                    <th>Identity Mark</th>
                    <th>Caste</th>
                    <th>Blood Group</th>
                    <th>Height</th>
                    <th>Medical Fitness</th>
                    <th>Certificate</th>
                    <th>Religion</th>
                    <th>Home State</th>
                    <th>HomeTown</th>
                    <th>Category</th>
                    <th>Home Distict</th>
                    <th>Near Railway</th>
                    <th>Remarks</th>
                    <th>Office Designation</th>
                    <th>Office Cadre</th>
                    <th>Current Office</th>
                    <th>Office Type</th>
                </thead>
                <tbody>
                    {
                        profile?.length > 0 && profile?.map((employee, index) => {

                            return (

                                <tr key={index}>
                                    <td> <img
                                        src={`http://localhost:2000/${employee.image}`}
                                        style={{ width: "100px", height: "100px" }} />
                                    </td>
                                    <td>{employee?.EmployeeData[0]?.firstName}</td>
                                    <td>{employee?.EmployeeData[0]?.middleName}</td>
                                    <td>{employee?.EmployeeData[0]?.lastName}</td>
                                    <td>{employee?.EmployeeData[0]?.dateofbirth.toString()}</td>
                                    <td>{employee?.EmployeeData[0]?.fatherName}</td>
                                    <td>{employee?.EmployeeData[0]?.gender}</td>
                                    <td>{employee?.EmployeeData[0]?.materialStatus}</td>
                                    <td>{employee?.EmployeeData[0]?.identityMark}</td>
                                    <td>{employee?.EmployeeData[0]?.caste}</td>
                                    <td>{employee?.EmployeeData[0]?.bloodGroup}</td>
                                    <td>{employee?.EmployeeData[0]?.height}</td>
                                    <td>{employee.medicalFitness}</td>
                                    <td>{employee.certificate}</td>
                                    <td>{employee.religion}</td>
                                    <td>{employee.homeState}</td>
                                    <td>{employee.homeTown}</td>
                                    <td>{employee.category}</td>
                                    <td>{employee.homeDistict}</td>
                                    <td>{employee.nearRailway}</td>
                                    <td>{employee.remarks}</td>
                                    <td>{employee.officeDesignation}</td>
                                    <td>{employee.OfficeCadre}</td>
                                    <td>{employee.currentOffice}</td>
                                    <td>{employee.officeType}</td>
                                    <td><button type="submit" className='btn btn-outline-success' onClick={() => handleEdit(employee)}>Edit</button></td>
                                    <td><button type="submit" className='btn btn-outline-danger' onClick={() => handleDelete(employee.EmployeeData[0]?._id)}>Delete</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <ProfileData handleClose={handleClose} show={show} handleShow={handleShow} editProfile={editProfile} updateProfile={updateProfile} fetchData={fetchData} />
        </>
    )
}

export default ProfileDetail