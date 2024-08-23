import axios from "axios"

export const addRequestSection = async (values) => {
    console.log(values, "valdjhsajdfhsaudfhsadhdus")
    try {
        const response = await axios.post("http://localhost:2000/requestsection/add", {
            title: values.title,
            description: values.description,
            priority: values.priority,
            status: values.status,
            dateCreated: values.dateCreated,
            dateUpdated: values.dateUpdated
        })
        console.log("Add request section successfully", response.data)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log("Error Fetching data", error)
    }
}

export const updateRequestSection = async (id, values) => {
    console.log(values, "valdjhsajdfhsaudfhsadhdus")
    try {
        const response = await axios.put(`http://localhost:2000/requestsection/update/${id}`, {
            title: values.title,
            description: values.description,
            priority: values.priority,
            status: values.status,
            dateCreated: values.dateCreated,
            dateUpdated: values.dateUpdated
        })
        console.log("update request section successfully", response.data)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log("Error Fetching data", error)
    }
}