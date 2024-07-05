import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './edetailsedit.css';

const EdetailsEdit = ({ onSave }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employee } = location.state;

  const [formData, setFormData] = useState({
    employee_id: employee.employee_id,
    employee_name: employee.employee_name,
    branch_id: employee.branch_id,
    address: employee.address,
    date_of_birth: employee.date_of_birth,
    email: employee.email,
    role: employee.role,
    salary: employee.salary,
    photo_url: employee.photo_url,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-btn" onClick={() => navigate(-1)}>×</button>
        <div className="popup-content">
          <div className="photo-section">
            <img src={formData.photo_url} alt={formData.employee_name} className="employee-photo" />
          </div>
          <div className="details-section">
            <h1>Edit Employee Details</h1>
            <div className="details">
              <p>
                <strong>EID:</strong> 
                <input 
                  type="text" 
                  name="employee_id" 
                  value={formData.employee_id} 
                  onChange={handleChange} 
                  disabled 
                />
              </p>
              <p>
                <strong>Name:</strong> 
                <input 
                  type="text" 
                  name="employee_name" 
                  value={formData.employee_name} 
                  onChange={handleChange} 
                />
              </p>
              <p>
                <strong>Branch ID:</strong> 
                <input 
                  type="text" 
                  name="branch_id" 
                  value={formData.branch_id} 
                  onChange={handleChange} 
                />
              </p>
              <p>
                <strong>Address:</strong> 
                <input 
                  type="text" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                />
              </p>
              <p>
                <strong>Date of Birth:</strong> 
                <input 
                  type="date" 
                  name="date_of_birth" 
                  value={formData.date_of_birth} 
                  onChange={handleChange} 
                />
              </p>
              <p>
                <strong>Email:</strong> 
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                />
              </p>
              <p>
                <strong>Role:</strong> 
                <input 
                  type="text" 
                  name="role" 
                  value={formData.role} 
                  onChange={handleChange} 
                />
              </p>
              <p>
                <strong>Salary:</strong> 
                <input 
                  type="text" 
                  name="salary" 
                  value={formData.salary} 
                  onChange={handleChange} 
                />
              </p>
            </div>
            <button className="save-btn" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdetailsEdit;

//save is not working

