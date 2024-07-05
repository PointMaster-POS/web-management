import React from 'react';
import './employeecard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const EmployeeCard = ({ employee, onShowDetails }) => {
  return (
    <div className='employee-card'>
      <div className='employee-photo'>
        <img src={employee.photo_url}/>
      </div>
      <div className='employee-info'>
        <div className='employee-id'>{employee.employee_id}</div>
        <div className='employee-name'>{employee.employee_name}</div>
        <button className='details-btn' onClick={() => onShowDetails(employee)}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
