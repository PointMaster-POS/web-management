import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register1.css';
import Header from '../../Components/Header';



function Register1() {
    const navigate = useNavigate();
    const [businessDetails1, setBusinessDetails] = useState({
        business_mail: '',
        business_hotline: '',
        business_owner_name: '',
        business_owner_mail: '',
        business_password: '',
        business_description: ''    
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBusinessDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/register2', { state: { businessDetails1 } });
    };

    return (
        <div className='register1'>
            <Header />
            <div className='content'>
                <div className='left-side'>
                    <div className='main-heading-container'>
                        <h1 className="main-heading">
                            <span className="line1">Welcome to</span>
                            <span className="line2">Point Master:</span>
                            <span className="line3">Secure Registration</span>
                        </h1>
                        {/* <p className='h-description'>Provide Your Business Details</p> */}
                    </div>
                    <div className='form-container'>
                        <form onSubmit={handleSubmit}>   
                            
                            {/* <div className="input-row">
                                <div className="form-group">
                                    <label htmlFor="business_name">Business Name</label>
                                    <input type="text" id="business_name" name="business_name" placeholder="abc" onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="business_hotline">Business Phone Number</label>
                                    <input type="tel" id="business_hotline" name="business_hotline" placeholder="+94 7xxxxxxx" onChange={handleChange} required />
                                </div>
                            </div> */}
                            
                            <div className="form-group">
                                <label htmlFor="business_mail">Business Email</label>
                                <input type="email" id="business_mail" name="business_mail" placeholder="abc@gmail.com" onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="business_hotline">Business Phone Number</label>
                                <input type="tel" id="business_hotline" name="business_hotline" placeholder="+94 7xxxxxxx" onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="business_owner_name">Owner Name</label>
                                <input type="text" id="business_owner_name" name="business_owner_name" onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="business_owner_mail">Owner Email</label>
                                <input type="email" id="business_owner_mail" name="business_owner_mail" onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="business_password">Password</label>
                                <input type="password" id="business_password" name="business_password" onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="business_description">Business Description</label>
                                <textarea id="business_description" name="business_description" rows="6" placeholder="Describe your business" onChange={handleChange} required></textarea>
                            </div>
                            <button type="submit" className="submit-button">Next</button>
                        </form>
                    </div>
                </div>
                <div className='right-side'>
                    <img
                        src={`${process.env.PUBLIC_URL}/images/1.jpg`}
                        alt="Registration Image"
                        className="registration-image"
                    />
                </div>
            </div>
            <footer className='footer'></footer>
        </div>
    );
}

export default Register1;
