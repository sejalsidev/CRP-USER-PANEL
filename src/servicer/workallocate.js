import axios from "axios"

export const addWorkAllocate = async (values) => {
    console.log(values, "valuesvaluesvaluesvaluesvaluesvaluesvaluesvalues")
    const token = localStorage.getItem('token');
    console.log("tokentokentokentokentokentokentoken", token)
    try {
        const response = await axios.post("http://localhost:2000/workallocate/add", {
            employeeId: values.employeeId,
            companyName: values.companyName,
            jobTitle: values.jobTitle,
            startDate: values.startDate,
            endDate: values.endDate,
            status: values.status,
            assignTask: values.assignTask

        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(response)
        console.log("add work allocate succesfully", response.data)
        return response.data
    } catch (error) {
        console.log("Error add work allocate", error)
    }
}

export const updateWorkAllocate = async (id, values) => {
    console.log(values, "dhsccjsdhcjhsxjhjsxchjksdhcjksdhcjjsdhcjksdfh")
    console.log(id, "ididididiidiidididididiididiididididiididididididi")
    const token = localStorage.getItem('token');
    console.log("tokentokentokentokentokentokentoken", token);
    try {
        const response = await axios.put(`http://localhost:2000/workallocate/update/${id}`, {
            employeeId: values.employeeId,
            companyName: values.companyName,
            jobTitle: values.jobTitle,
            startDate: values.startDate,
            endDate: values.endDate,
            status: values.status,
            assignTask: values.assignTask
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response);
        console.log("update work allocate successfully", response.data)
        return response.data
    } catch (error) {
        console.log("Error updating work allocate", error)
        throw error;
    }
}