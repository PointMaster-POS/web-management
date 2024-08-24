import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import './register2.css';

function Register2() {
    const navigate = useNavigate();
    const location = useLocation();

    // Check if location.state is defined and if businessDetails1 exists within it
    const { businessDetails1 } = location.state || {};

    // Initialize state for the second part of business details
    const [businessDetails2, setbusinessDetails2] = useState({
        business_url: '',
        business_address: '',
        business_registration_number: '',
        business_type: '',
        business_registration_date: '',
        logo_location: ''
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setbusinessDetails2(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Merge the two sets of business details
        const data = {
            ...businessDetails1,
            ...businessDetails2
        };

        // Convert the data object to a JSON string
        let jsonString = JSON.stringify(data, null, 2);

        // Send the data to the server
        fetch('http://localhost:5000/api/v1/business', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonString
        })
        .then(response => {
            console.log("Response status:", response.status);
            return response.json().then(data => ({ status: response.status, body: data }));
        })
        .then(data => {
            if (data.status === 200 || data.status === 201) {
                console.log("Registration successful:", data.body);
                navigate('/success', { state: { businessId: data.body.business_id } });
            } else {
                console.error('Registration failed:', data.body);
                alert('Registration failed: ' + (data.body.error || 'Unknown error'));
            }
        })
        .catch(error => {
            console.error('An error occurred:', error);
            alert('An error occurred during registration. Please try again.');
        });
    };

    // Render the registration form
    return (
        <div className='register2'>
            <Header />
            <div className='content'>
                <div className='left-side'>
                    <div className='main-heading-container'>
                        <h1 className="main-heading">
                            <span className="line1">Point Master:</span>
                            <span className="line2">Secure Registration</span>
                        </h1>
                        <p className='h-description'>Provide Business Details</p>
                    </div>
                    <div className='form-container'>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group-2">
                                <label htmlFor="business_url">Business Website</label>
                                <input type="url" id="business_url" name="business_url" placeholder="www.abc.lk" onChange={handleChange} required />
                            </div>
                            <div className="form-group-2">
                                <label htmlFor="business_address">Business Address</label>
                                <input type="text" id="business_address" name="business_address" onChange={handleChange} required />
                            </div>
                            <div className="form-group-2">
                                <label htmlFor="business_registration_number">Business Registration Number</label>
                                <input type="text" id="business_registration_number" name="business_registration_number" onChange={handleChange} required />
                            </div>
                            <div className="form-group-2">
                                <label htmlFor="business_type">Business Type</label>
                                <input type="text" id="business_type" name="business_type" onChange={handleChange} required />
                            </div>
                            <div className="form-grou-2">
                                <label htmlFor="business_registration_date">Business Registration Date</label>
                                <input type="date" id="business_registration_date" name="business_registration_date" onChange={handleChange} required />
                            </div>
                            <div className="form-group-2">
                                <label htmlFor="logo_location">Logo Location</label>
                                <input type="text" id="logo_location" name="logo_location" onChange={handleChange} required />
                            </div>
                            <button type="submit" className="submit-button">Submit</button>
                        </form>
                    </div>
                </div>
                <div className='right-side'>
                    <img
                        src={`${process.env.PUBLIC_URL}/images/3.png`}
                        alt="registration-image"
                        className="registration-image"
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Register2;
