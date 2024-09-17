import React, { useState } from 'react';
import './ereg.css';

function Ereg() {
    return (
        <div className='ereg'>
            <div className='header'>PointMaster</div>
            <div className='content'>
                <div className='left-side'>
                    <div className='main-heading-container'>
                        <h1 className="main-heading">
                            <span className="line1">Point Master:</span>
                            <span className="line2">Employee Registration</span>
                        </h1>
                        <p className='h-description'>Provide Employee Details</p>
                    </div>
                    <div className='form-container'>
                        <form>
                            <div className="form-group">
                                <label htmlFor="employee_name">Employee Name</label>
                                <input type="text" id="employee_name" name="employee_name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="branch_id">Branch ID</label>
                                <input type="text" id="branch_id" name="branch_id" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input type="text" id="address" name="address" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="date_of_birth">Date of Birth</label>
                                <input type="date" id="date_of_birth" name="date_of_birth" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="role">Role</label>
                                <select id="role" name="role" required>
                                    <option value="">Select Role</option>
                                    <option value="store manager">Store Manager</option>
                                    <option value="product manager">Product Manager</option>
                                    <option value="cashier">Cashier</option>
                                    <option value="staff">Staff</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="salary">Salary</label>
                                <input type="text" id="salary" name="salary" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="starting_date">Starting Date</label>
                                <input type="date" id="starting_date" name="starting_date" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="photo_url">Photo URL</label>
                                <input type="url" id="photo_url" name="photo_url" required />
                            </div>
                            <button type="submit" className="submit-button">Register</button>
                        </form>
                    </div>
                </div>
                <div className='right-side'>
                    <img
                        src={`${process.env.PUBLIC_URL}/images/Ereg.jpg`}
                        alt="registration"
                        className="registration-image"
                    />
                </div>
            </div>
        </div>
    );
}

export default Ereg;
