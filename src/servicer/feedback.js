import axios from "axios"

export const addfeedback = async (values) => {
    try {
        let response = await axios.post("http://localhost:2000/feedback/addFeedback", {
            comments: values.comments,
            rating: values.rating,
            dateSubmitted: values.dateSubmitted
        })
        console.log(response)
        console.log("add feedback succesfully", response.data.data)
        return response.data
    } catch (error) {
        console.log("Error Fetching Data", error)
    }
}

export const updateFeedbackData = async (id, values) => {
    try {
        let response = await axios.put(`http://localhost:2000/feedback/updatefeedback/${id}`, values)
        console.log(response)
        console.log("update feedback", response.data)
        return response.data
    } catch (error) {
        console.log("Error Fecthing Data", error)
    }
}