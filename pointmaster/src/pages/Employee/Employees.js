import React, { useState } from 'react';
import './employees.css';
import EmployeeCard from './EmployeeCard';
import EdetailsPopup from './EdetailsPopup';
import { useNavigate } from 'react-router-dom';

export default function Employees() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleShowDetails = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleClosePopup = () => {
    setSelectedEmployee(null);
  };

  const navigate = useNavigate();

  const handleAddEmployee = () => {
    navigate('/ereg'); // Navigate to the Employee Registration page
  };

  // Example array of employees (hard-coded for demonstration)
  const employees = [
      {
        employee_id: '001',
        employee_name: 'Pavani Karunarathna',
        branch_id: 'B001',
        address: '123 Main St, City',
        date_of_birth: '2001-11-03',
        email: 'pavani@gmail.com',
        role: 'store manager',
        salary: 50000,
        photo_url: `${process.env.PUBLIC_URL}/images/me3.heic`
      },
      {
        employee_id: '002',
        employee_name: 'Emliy Paris',
        branch_id: 'B456',
        address: '456 Elm St, City',
        date_of_birth: '2001-11-03',
        email: 'jane.smith@example.com',
        role: 'cashier',
        salary: 40000,
        photo_url: `${process.env.PUBLIC_URL}/images/employee.jpg`
      },
      {
        employee_id: '003',
        employee_name: 'Alice Johnson',
        branch_id: 'C789',
        address: '789 Oak St, City',
        date_of_birth: '1985-08-20',
        email: 'alice.johnson@example.com',
        role: 'product manager',
        salary: 60000,
        photo_url: `${process.env.PUBLIC_URL}/images/employee.jpg`
      },
      {
        employee_id: '004',
        employee_name: 'Michael Brown',
        branch_id: 'D012',
        address: '012 Pine St, City',
        date_of_birth: '1993-04-10',
        email: 'michael.brown@example.com',
        role: 'cashier',
        salary: 42000,
        photo_url: `${process.env.PUBLIC_URL}/images/employee.jpg`
      },
      {
        employee_id: '005',
        employee_name: 'Emma Wilson',
        branch_id: 'E345',
        address: '345 Cedar St, City',
        date_of_birth: '1998-12-28',
        email: 'emma.wilson@example.com',
        role: 'store manager',
        salary: 55000,
        photo_url: `${process.env.PUBLIC_URL}/images/employee.jpg`
      },
      {
        employee_id: '006',
        employee_name: 'David Lee',
        branch_id: 'F678',
        address: '678 Maple St, City',
        date_of_birth: '1991-07-16',
        email: 'david.lee@example.com',
        role: 'cashier',
        salary: 41000,
        photo_url: `${process.env.PUBLIC_URL}/images/employee.jpg`
      },
      {
        employee_id: '007',
        employee_name: 'Sophia Garcia',
        branch_id: 'G901',
        address: '901 Walnut St, City',
        date_of_birth: '1989-02-05',
        email: 'sophia.garcia@example.com',
        role: 'staff',
        salary: 38000,
        photo_url: `${process.env.PUBLIC_URL}/images/employee.jpg`
      },
      {
        employee_id: '008',
        employee_name: 'Matthew Taylor',
        branch_id: 'H234',
        address: '234 Birch St, City',
        date_of_birth: '1987-10-12',
        email: 'matthew.taylor@example.com',
        role: 'product manager',
        salary: 62000,
        photo_url: `${process.env.PUBLIC_URL}/images/employee.jpg`
      },
      {
        employee_id: '009',
        employee_name: 'Olivia Martinez',
        branch_id: 'I567',
        address: '567 Elm St, City',
        date_of_birth: '1995-03-25',
        email: 'olivia.martinez@example.com',
        role: 'store manager',
        salary: 54000,
        photo_url: `${process.env.PUBLIC_URL}/images/employee.jpg`
      },
      {
        employee_id: '010',
        employee_name: 'Daniel Clark',
        branch_id: 'J890',
        address: '890 Oak St, City',
        date_of_birth: '1994-06-30',
        email: 'daniel.clark@example.com',
        role: 'cashier',
        salary: 43000,
        photo_url: `${process.env.PUBLIC_URL}/images/employee.jpg`
      }
    ];

    const filteredEmployees = employees.filter((employee) =>
      employee.employee_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div >
        <header className='header'>
          <div className='logo'>PointMaster</div>
          <button className='btn' onClick={handleAddEmployee}>Add Employee</button>
        </header>
        <h1 className='title'>Employees</h1>
        <div className='search-bar'>
          <input
            type='text'
            placeholder='Search by employee name...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='content'>
          {filteredEmployees.map((employee, index) => (
            <EmployeeCard key={index} employee={employee} onShowDetails={handleShowDetails} />
          ))}
        </div>
        {selectedEmployee && (
          <EdetailsPopup employee={selectedEmployee} onClose={handleClosePopup} />
        )}
      </div>
    );
  }