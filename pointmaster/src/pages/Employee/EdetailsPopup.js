import React from 'react';
import { useNavigate } from 'react-router-dom';
import './edetailspopup.css';

const EdetailsPopup = ({ employee, onClose }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/edit', { state: { employee } });
  };
  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="popup-content">
          <div className="photo-section">
            <img src={employee.photo_url} alt={employee.employee_name} className="employee-photo" />
          </div>
          <div className="details-section">
            <h1>EID: {employee.employee_id}<br/>
            {employee.employee_name}</h1>
            <div className="details">
              <p><strong>Branch ID:</strong> {employee.branch_id}</p>
              <p><strong>Address:</strong> {employee.address}</p>
              <p><strong>Date of Birth:</strong> {employee.date_of_birth}</p>
              <p><strong>Email:</strong> {employee.email}</p>
              <p><strong>Role:</strong> {employee.role}</p>
              <p><strong>Salary:</strong> ${employee.salary}</p>
            </div>
          </div>
        </div>
        <button className="edit-btn" onClick={handleEditClick}>Edit</button>
      </div>
    </div>
  );
};

export default EdetailsPopup;
