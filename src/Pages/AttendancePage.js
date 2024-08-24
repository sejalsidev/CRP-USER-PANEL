import React, { useState } from 'react'
import AttendanceData from '../Component/AttendanceData';

const AttendancePage = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (

        <>
            <button type="submit" className='btn btn-outline-primary' onClick={handleShow}>Add-Attendance-Record</button>
            <AttendanceData show={show} handleClose={handleClose} handleShow={handleShow} />
        </>

    )
}

export default AttendancePage