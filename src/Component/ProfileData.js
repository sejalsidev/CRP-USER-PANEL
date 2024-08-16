import { TextField } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from 'react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { Modal } from 'react-bootstrap';
import { profileData, updateProfileData } from '../servicer/profile';

const ProfileData = ({ show, handleShow, handleClose, editProfile, updateProfile, fetchData }) => {
    const [startDate, setStartDate] = useState(new Date());
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const validationSchema = yup.object({
        firstName: yup.string().required("First Name is required"),
        middleName: yup.string().required("Middle Name is required"),
        lastName: yup.string().required("Last Name is required"),
        dateofbirth: yup.date().required("Date of Birth is required"),
        fatherName: yup.string().required("Father Name is required"),
        gender: yup.string().required("Gender is required"),
        materialStatus: yup.string().required("Marital Status is required"),
        identityMark: yup.string().required("Identity Mark is required"),
        caste: yup.string().required("Caste is required"),
        bloodGroup: yup.string().required("Blood Group is required"),
        height: yup.string().required("Height is required"),
        medicalFitness: yup.string().required("Medical Fitness is required"),
        certificate: yup.string().required("Certificate is required"),
        religion: yup.string().required("Religion is required"),
        homeState: yup.string().required("Home State is required"),
        homeTown: yup.string().required("Home Town is required"),
        category: yup.string().required("Category is required"),
        homeDistict: yup.string().required("Home District is required"),
        nearRailway: yup.string().required("Near Railway is required"),
        remarks: yup.string().required("Remarks are required"),
        officeDesignation: yup.string().required("Office Designation is required"),
        OfficeCadre: yup.string().required("Office Cadre is required"),
        currentOffice: yup.string().required("Current Office is required"),
        officeType: yup.string().required("Office Type is required"),
        image: yup.string().required("image is required"),
    });

    const onsubmit = async (values) => {
        console.log(values, "valuesvaluesvaluesvaluesvalues");
        try {
            console.log(updateProfile._id, "updateidupdateidupdateidupdateidupdateidupdateid")
            if (editProfile) {
                console.log(editProfile)
                const id = await updateProfile.EmployeeData[0]?._id
                const response = await updateProfileData(values, id)
                console.log(updateProfile._id, "idididiididididididididididididdididi")
                console.log(response)
                if (response) {

                    console.log("Update Employee record successfully", response)
                }

            }
            else {
                const response = await profileData(values)
                console.log(response)
                console.log("Add Profile Data Successfully", response)

            }
            fetchData()
            handleClose();
        } catch (error) {
            console.log("Error Fetching Data", error)
        }

    };

    return (
        <>
            {/* <button type="button" className='btn btn-outline-primary' onClick={handleShow}>
                Add Profile Record
            </button> */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editProfile ? "Update Profile Record" : "Add Profile Record"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='row justify-content-center align-items-center'>
                            <div className='col'>
                                <Formik
                                    initialValues={editProfile ? {
                                        firstName: updateProfile.EmployeeData[0].firstName,
                                        middleName: updateProfile.EmployeeData[0].middleName,
                                        lastName: updateProfile.EmployeeData[0].lastName,
                                        dateofbirth: updateProfile.EmployeeData[0].dateofbirth,
                                        fatherName: updateProfile.EmployeeData[0].fatherName,
                                        gender: updateProfile.EmployeeData[0].gender,
                                        materialStatus: updateProfile.EmployeeData[0].materialStatus,
                                        identityMark: updateProfile.EmployeeData[0].identityMark,
                                        caste: updateProfile.EmployeeData[0].caste,
                                        bloodGroup: updateProfile.EmployeeData[0].bloodGroup,
                                        height: updateProfile.EmployeeData[0].height,
                                        medicalFitness: updateProfile.medicalFitness,
                                        certificate: updateProfile.certificate,
                                        religion: updateProfile.religion,
                                        homeState: updateProfile.homeState,
                                        homeTown: updateProfile.homeTown,
                                        category: updateProfile.category,
                                        homeDistict: updateProfile.homeDistict,
                                        nearRailway: updateProfile.nearRailway,
                                        remarks: updateProfile.remarks,
                                        officeDesignation: updateProfile.officeDesignation,
                                        OfficeCadre: updateProfile.OfficeCadre,
                                        currentOffice: updateProfile.currentOffice,
                                        officeType: updateProfile.officeType,
                                        image: updateProfile.EmployeeData[0].image,

                                    } : {
                                        firstName: "",
                                        middleName: "",
                                        lastName: "",
                                        dateofbirth: new Date(),
                                        fatherName: "",
                                        gender: "",
                                        materialStatus: "",
                                        identityMark: "",
                                        caste: "",
                                        bloodGroup: "",
                                        height: "",
                                        medicalFitness: "",
                                        certificate: "",
                                        religion: "",
                                        homeState: "",
                                        homeTown: "",
                                        category: "",
                                        homeDistict: "",
                                        nearRailway: "",
                                        remarks: "",
                                        officeDesignation: "",
                                        OfficeCadre: "",
                                        currentOffice: "",
                                        officeType: "",
                                        image: null
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={onsubmit}
                                >
                                    {({ setFieldValue }) => (
                                        <Form>
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='col-lg-6 col-md-6 col-sm-6'>
                                                        <div className='form-group'>
                                                            <label htmlFor='firstName'>First Name</label>
                                                            <Field as={TextField} name="firstName" className="form-control" />
                                                            <ErrorMessage component="div" name="firstName" className='text-danger' />
                                                        </div>
                                                        <div className='form-group'>
                                                            <label htmlFor='middleName'>Middle Name</label>
                                                            <Field as={TextField} name="middleName" className="form-control" />
                                                            <ErrorMessage component="div" name="middleName" className='text-danger' />
                                                        </div>
                                                        <div className='form-group'>
                                                            <label htmlFor='lastName'>Last Name</label>
                                                            <Field as={TextField} name="lastName" className="form-control" />
                                                            <ErrorMessage component="div" name="lastName" className='text-danger' />
                                                        </div>
                                                        <div className='form-group'>
                                                            <label htmlFor='dateofbirth'>Date of Birth</label>
                                                            <DatePicker
                                                                selected={startDate}
                                                                onChange={(date) => {
                                                                    setStartDate(date);
                                                                    setFieldValue('dateofbirth', date);
                                                                }}
                                                                className="form-control"
                                                            />
                                                            <ErrorMessage component="div" name="dateofbirth" className='text-danger' />
                                                        </div>
                                                        <div className='form-group'>
                                                            <label htmlFor='fatherName'>Father Name</label>
                                                            <Field as={TextField} name="fatherName" className="form-control" />
                                                            <ErrorMessage component="div" name="fatherName" className='text-danger' />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="gender">Gender</label>
                                                            <div className="form-check">
                                                                <Field type="radio" name="gender" value="male" className="form-check-input" />
                                                                <label className="form-check-label" htmlFor="male">Male</label>
                                                            </div>
                                                            <div className="form-check">
                                                                <Field type="radio" name="gender" value="female" className="form-check-input" />
                                                                <label className="form-check-label" htmlFor="female">Female</label>
                                                            </div>
                                                            <ErrorMessage component="div" name="gender" className='text-danger' />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="materialStatus">Material Status</label>
                                                            <Field as="select" name="materialStatus" className="form-control">
                                                                <option value="">Select</option>
                                                                <option value="single">Single</option>
                                                                <option value="married">Married</option>
                                                            </Field>
                                                            <ErrorMessage component="div" name="maritalStatus" className='text-danger' />
                                                        </div>
                                                        <div className='form-group'>
                                                            <label htmlFor='identityMark'>Identity Mark</label>
                                                            <Field as={TextField} name="identityMark" className="form-control" />
                                                            <ErrorMessage component="div" name="identityMark" className='text-danger' />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="caste">Caste</label>
                                                            <Field as="select" name="caste" className="form-control">
                                                                <option value="">Select</option>
                                                                <option value="hindu">Hindu</option>
                                                                {/* Add other caste options here */}
                                                            </Field>
                                                            <ErrorMessage component="div" name="caste" className='text-danger' />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="bloodGroup">Blood Group</label>
                                                            <Field as="select" name="bloodGroup" className="form-control">
                                                                <option value="">Select</option>
                                                                <option value="A+">A+</option>
                                                                <option value="A-">A-</option>
                                                                <option value="B+">B+</option>
                                                                <option value="B-">B-</option>
                                                                <option value="AB+">AB+</option>
                                                                <option value="O+">O+</option>
                                                                <option value="O-">O-</option>
                                                            </Field>
                                                            <ErrorMessage component="div" name="bloodGroup" className='text-danger' />
                                                        </div>
                                                        <div className='form-group'>
                                                            <label htmlFor='height'>Height</label>
                                                            <Field as={TextField} name="height" className="form-control" />
                                                            <ErrorMessage component="div" name="height" className='text-danger' />
                                                        </div>
                                                        <div className='form-group'>
                                                            <label htmlFor='officeType'>Office Type</label>
                                                            <Field as={TextField} name="officeType" className="form-control" />
                                                            <ErrorMessage component="div" name="officeType" className='text-danger' />
                                                        </div>
                                                        <div className='form-group'>
                                                            <label htmlFor='image'>Image</label>
                                                            <input type="file" name="image" onChange={(e) => setFieldValue("image", e.currentTarget.files[0])} className="form-control" />
                                                            <ErrorMessage component="div" name="image" className='text-danger' />
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-6 col-md-6 col-sm-6'>
                                                        <div className='form-group'>
                                                            <label htmlFor='medicalFitness'>Medical Fitness</label>
                                                            <Field as={TextField} name="medicalFitness" className="form-control" />
                                                            <ErrorMessage component="div" name="medicalFitness" className='text-danger' />
                                                        </div>
                                                        <div className='form-group'>
                                                            <label htmlFor='certificate'>Certificate</label>
                                                            <Field as={TextField} name="certificate" className="form-control" />
                                                            <ErrorMessage component="div" name="certificate" className='text-danger' />
                                                        </div>
                                                        <div className='form-group'>
                                                            <label htmlFor='religion'>Religion</label>
                                                            <Field as={TextField} name="religion" className="form-control" />
                                                            <ErrorMessage component="div" name="religion" className='text-danger' />
                                                        </div>
                                                        <div className='form-group'>
                                                            <label htmlFor='homeState'>Home State</label>
                                                            <Field as={TextField} name="homeState" className="form-control" />
                                                            <ErrorMessage component="div" name="homeState" className='text-danger' />
                                                        </div>
                                                        <div className='form-group'>
                                                            <label htmlFor='homeTown'>Home Town</label>
                                                            <Field as={TextField} name="homeTown" className="form-control" />
                                                            <ErrorMessage component="div" name="homeTown" className='text-danger' />
                                                        </div>
                                                        <div className='form-group'>
                                                            <label htmlFor='category'>Category</label>
                                                            <Field as={TextField} name="category" className="form-control" />
                                                            <ErrorMessage component="div" name="category" className='text-danger' />
                                                        </div>
                                                        <div className='form-group'>
                                                            <label htmlFor='homeDistict'>Home District</label>
                                                            <Field as={TextField} name="homeDistict" className="form-control" />
                                                            <ErrorMessage component="div" name="homeDistict" className='text-danger' />
                                                        </div>
                                                        <div className='form-group'>
                                                            <label htmlFor='nearRailway'>Near Railway</label>
                                                            <Field as={TextField} name="nearRailway" className="form-control" />
                                                            <ErrorMessage component="div" name="nearRailway" className='text-danger' />
                                                        </div>
                                                        <div className='form-group'>
                                                            <label htmlFor='remarks'>Remarks</label>
                                                            <Field as={TextField} name="remarks" className="form-control" />
                                                            <ErrorMessage component="div" name="remarks" className='text-danger' />
                                                        </div>
                                                        <div className='form-group'>
                                                            <label htmlFor='officeDesignation'>Office Designation</label>
                                                            <Field as={TextField} name="officeDesignation" className="form-control" />
                                                            <ErrorMessage component="div" name="officeDesignation" className='text-danger' />
                                                        </div>
                                                        <div className='form-group'>
                                                            <label htmlFor='OfficeCadre'>Office Cadre</label>
                                                            <Field as={TextField} name="OfficeCadre" className="form-control" />
                                                            <ErrorMessage component="div" name="OfficeCadre" className='text-danger' />
                                                        </div>
                                                        <div className='form-group'>
                                                            <label htmlFor='currentOffice'>Current Office</label>
                                                            <Field as={TextField} name="currentOffice" className="form-control" />
                                                            <ErrorMessage component="div" name="currentOffice" className='text-danger' />
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary">{editProfile ? "Edit-Profile" : "Add-Profile"}</button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </>
    );
}

export default ProfileData;
