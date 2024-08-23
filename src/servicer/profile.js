import axios from "axios"

export const profileData = async (values) => {
    console.log(values, "dfxgvdfgidfguisdyfguiysdfuysd")
    const formData = new FormData()
    formData.append('firstName', values.firstName)
    formData.append('middleName', values.middleName);
    formData.append('lastName', values.lastName);
    formData.append('dateofbirth', values.dateofbirth);
    formData.append('fatherName', values.fatherName);
    formData.append('gender', values.gender);
    formData.append('materialStatus', values.materialStatus);
    formData.append('identityMark', values.identityMark);
    formData.append('caste', values.caste);
    formData.append('bloodGroup', values.bloodGroup);
    formData.append('height', values.height);
    formData.append('medicalFitness', values.medicalFitness);
    formData.append('certificate', values.certificate);
    formData.append('religion', values.religion);
    formData.append('homeState', values.homeState);
    formData.append('homeTown', values.homeTown);
    formData.append('category', values.category);
    formData.append('homeDistict', values.homeDistict);
    formData.append('nearRailway', values.nearRailway);
    formData.append('remarks', values.remarks);
    formData.append('officeDesignation', values.officeDesignation);
    formData.append('OfficeCadre', values.OfficeCadre);
    formData.append('currentOffice', values.currentOffice);
    formData.append('officeType', values.officeType);
    formData.append('image', values.image);
    console.log(values)
    try {
        const response = await axios.post("http://localhost:2000/employee/add",
            formData
        )
        console.log(response)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log("Error Fetching Data",  )
    }
}

export const updateProfileData = async (values, id) => {
    console.log(values, "updateupdateupdateupdateupdateupdateupdateupdate")
    console.log(id, "ffffff")
    const formData = new FormData()
    formData.append('firstName', values.firstName)
    formData.append('middleName', values.middleName);
    formData.append('lastName', values.lastName);
    formData.append('dateofbirth', values.dateofbirth);
    formData.append('fatherName', values.fatherName);
    formData.append('gender', values.gender);
    formData.append('materialStatus', values.materialStatus);
    formData.append('identityMark', values.identityMark);
    formData.append('caste', values.caste);
    formData.append('bloodGroup', values.bloodGroup);
    formData.append('height', values.height);
    formData.append('medicalFitness', values.medicalFitness);
    formData.append('certificate', values.certificate);
    formData.append('religion', values.religion);
    formData.append('homeState', values.homeState);
    formData.append('homeTown', values.homeTown);
    formData.append('category', values.category);
    formData.append('homeDistict', values.homeDistict);
    formData.append('nearRailway', values.nearRailway);
    formData.append('remarks', values.remarks);
    formData.append('officeDesignation', values.officeDesignation);
    formData.append('OfficeCadre', values.OfficeCadre);
    formData.append('currentOffice', values.currentOffice);
    formData.append('officeType', values.officeType);
    formData.append('image', values.image);
    console.log(values.image, "imageimageimageimageimageimageimageimageimageimageimageimage")
    try {
        const response = await axios.put(`http://localhost:2000/employee/update/${id}`,
            formData

        )
        console.log(response)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log("Error Fetching Data", error)
    }
}