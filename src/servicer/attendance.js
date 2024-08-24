import axios from "axios"

export const addAttendance = async (values) => {
    try {
        const response = await axios.post("http://localhost:2000/attendance/add", {
            employee: values.employee,
            date: values.date,
            clockIn: values.clockIn,
            clockOut: values.clockOut,
            status: values.status,
            notes: values.notes
        })
        console.log("Add Attendance Successfully", response.data)
        console.log(response.data)
    } catch (error) {
        console.log("Error Fetching Data", error)
    }
}
