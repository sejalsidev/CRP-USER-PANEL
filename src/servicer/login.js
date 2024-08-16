
import axios from "axios"

export const loginData = async (values) => {
    console.log(values, "sdhfjhdsjfvhsdajkvfhsdajhfvdsau")
    try {
        const response = await axios.post("http://localhost:2000/user/login", {
            email: values.email,
            password: values.password
        })
        console.log(response)
        const token = response.data.token;
        localStorage.setItem('token', token);
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log("Error Fetching Data", error)
    }
}