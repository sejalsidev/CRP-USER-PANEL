import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Navbar/NavBar.css'
import { Dropdown } from 'react-bootstrap'
import ProfileData from '../ProfileData'

const Navbar = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate()

    const handleProfile = () => {
        handleShow(true)
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/Login')
    }

    return (

        <>
            <nav className="navbar navbar-expand-lg border navbar-custom ">
                <div className="container">
                    <Link className="navbar-brand" to="/home">
                        <img src={require('../../images/crp-group-removebg-preview.png')} style={{ width: "100px", height: "50px" }} />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {/* <Link className="nav-link active" aria-current="page" to="/">
                                    Home
                                </Link> */}
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link" to="/aboutus">
                                    About Us
                                </Link>
                            </li> */}
                        </ul>
                        {/* <form className="d-flex" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button className="btn btn btn-light" type="submit">
                                Search
                            </button> */}
                        <Dropdown>
                            <Dropdown.Toggle as="a" id="dropdown-custom-components" className="ms-2 profile-dropdown">
                                <img
                                    src={require('../../images/avtar-prifile-image.png')}
                                    alt="profile"
                                    className="profile-image rounded-circle"
                                    style={{ width: "40px", height: "40px" }}
                                />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/profiledetails" onClick={handleProfile} >Profile</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/login" onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {/* </form> */}
                    </div>
                </div>
            </nav>
            <ProfileData handleClose={handleClose} show={show} handleShow={handleShow} />
        </>
    )
}

export default Navbar