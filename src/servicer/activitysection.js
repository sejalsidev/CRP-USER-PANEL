import axios from "axios"

export const addActivitySection = async (values) => {
    const token = localStorage.getItem('token');
    const response = await axios.post("http://localhost:2000/activitysection/add", {
        activityType: values.activityType,
        activityDesc: values.activityDesc,
        activityDate: values.activityDate,
        title: values.title

    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    console.log("Add activity section successfully", response.data);
    console.log(response.data)
    return response.data
}

export const editActivitySection = async (id, values) => {
    console.log(id, "ddd")
    const token = localStorage.getItem('token');
    const response = await axios.put(`http://localhost:2000/activitysection/update/${id}`, {
        activityType: values.activityType,
        activityDesc: values.activityDesc,
        activityDate: values.activityDate,
        title: values.title

    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    console.log("update activity section successfully", response.data);
    console.log(response.data)
    return response.data
}