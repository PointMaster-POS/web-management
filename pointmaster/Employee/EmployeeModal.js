import React, { useState } from 'react';
import './employees.css';

const EmployeeModal = ({ onClose, onSubmit }) => {
  const [employeeData, setEmployeeData] = useState({
    branch_id: '',
    employee_name: '',
    address: '',
    date_of_birth: '',
    email: '',
    role: '',
    salary: '',
    starting_date: '',
    photo_url: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(employeeData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Employee Registration</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Branch ID:
            <input type="text" name="branch_id" value={employeeData.branch_id} onChange={handleChange} required />
          </label>
          {/* Add other input fields for employee details */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;
