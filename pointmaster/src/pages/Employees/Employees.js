import React, { useState,useEffect } from "react";
import {
  Button,
  Card,
  Modal,
  Table,
  Space,
  Typography,
  Tooltip,
  Input,
  Form,
  message,
  Avatar,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import AddNewEmployee from "../../components/Popups/AddNewEmployee";
import ViewEmployeeProfile from "../../components/Popups/EmployeeProfileModel/EmployeeProfileModel";
import { useMenu } from "../../context/MenuContext";

const { Title } = Typography;
const { confirm } = Modal;
const { Search } = Input;

const Employees = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [viewEmployee, setViewEmployee] = useState(null);
  const [form] = Form.useForm();
  const {branchID, role} = useMenu();

  const fetchEmployees = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
    }
    let url;
    if (role === "owner") {
      url = `http://209.97.173.123:3001/employee/all-employee/${branchID}`;
    } else if (role === "branchmanager") {
      url = `http://209.97.173.123:3001/employee/branch-employee`;
    }


    if (!branchID) {
      message.warning("Select a branch to view employees.");
      return;
    }
      

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      if (data.length === 0) {
        message.info("No employees available.");
        return;
      }

      setData(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      message.error("Failed to fetch employees.");
    }
  };

  useEffect(() => {

    fetchEmployees();
  }, [branchID, role]);


  const handleAddEmployee = async (values) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch("http://209.97.173.123:3001/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const newEmployee = await response.json();
        console.log(newEmployee)
        message.success("Employee added successfully");
        setIsModalVisible(false);
        form.resetFields();
        fetchEmployees();
      } else {
        message.error("Failed to add employee");
      }
    } catch (error) {
      console.error(error);
      message.error("Error occurred while adding employee");
    }
  };

  const handleUpdateEmployee = async (values) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `http://209.97.173.123:3001/employee/${editingEmployee.employee_id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        message.success("Employee updated successfully");
        setIsModalVisible(false);
        form.resetFields();
        setEditingEmployee(null);
        fetchEmployees();
      } else {
        message.error("Failed to update employee");
      }
    } catch (error) {
      console.error(error);
      message.error("Error occurred while updating employee");
    }
  };

  const handleEdit = (record) => {
    setEditingEmployee(record); // Set the store to be edited
    form.setFieldsValue(record); // Pre-fill the form with the selected store's data
    setIsModalVisible(true); // Open the modal for editing
  };


  const handleDelete = (employee_id, employee_name) => {
    confirm({
      title: "Are you sure you want to delete this employee?",
      icon: <ExclamationCircleOutlined />,
      content: `This action will delete the employee "${employee_name}".`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const token = localStorage.getItem("accessToken");
          if (!token) {
            message.error(
              "Authorization token is missing. Please log in again."
            );
            return;
          }

          await fetch(`http://209.97.173.123:3001/employee/${employee_id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          fetchEmployees();
          message.success("Employee deleted successfully.");
        } catch (error) {
          console.error("Error deleting employee:", error);
          message.error("Failed to delete employee.");
        }
      },
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingEmployee(null); // Reset editing state
  };


  const handleSearch = (value, exactMatch = false) => {
    const filtered = data.filter((item) => {
      const employee_name = item.employee_name.toLowerCase();
      const employee_id = item.employee_id.toString().toLowerCase();
      const searchValue = value.toLowerCase();

      if (exactMatch) {
        return employee_name === searchValue || employee_id === searchValue;
      } else {
        return (
          employee_name.includes(searchValue) ||
          employee_id.includes(searchValue)
        );
      }
    });
    setFilteredData(filtered);
    setSearchText(value);
  };

  const handleViewEmployee = (employee) => {
    setViewEmployee(employee);


  }

  const handleCancelView = () => {
    setViewEmployee(null);
  }


  const columns = [
    {
      title: "Phtoto",
      dataIndex: "photo_url",
      key: "photo_url",
      render: (image) => <Avatar src={image} size={50} />,
    }, 
    {
      title: "Employee ID",
      dataIndex: "employee_id",
      key: "employee_id",
    },
    {
      title: "Employee Name",
      dataIndex: "employee_name",
      key: "employee_name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Contact Number",
      dataIndex: "phone",
      key: "contact_number",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space size="middle">
          <Tooltip title="Edit Employee">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              disabled={role === "branchmanager"}
              style={{
                borderColor: "#1890ff",
                color: "#1890ff",
              }}
            />
          </Tooltip>
          <Tooltip title="Delete Employee">
            <Button
              icon={<DeleteOutlined />}
              disabled={role === "branchmanager"}
              onClick={() => handleDelete(record.employee_id,record.employee_name)}
              danger
            />
          </Tooltip>
        </Space>
      ),
    },

    {
      title: "",
      key: "",
      render: (record) => (
        <Button onClick={() => handleViewEmployee(record)}>View More</Button>
      
      ),
    },
  ];

  return (
    <Card
      style={{
        margin: 30,
        padding: 30,
        borderRadius: "10px",
      }}
      bodyStyle={{ padding: "20px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={3} style={{ marginBottom: 10 }}>
          Employees Data
        </Title>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Search
            placeholder="Search by Employee ID or Employee Name"
            onSearch={(value) => handleSearch(value, true)}
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            style={{ marginRight: 10, width: 300 }}
          />
          {role === "owner" && (
          <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
            Add New Employee
          </Button>
          )}
        </div>
      </div>
      <hr color="#1890ff" />

      <Modal
        title={editingEmployee ? "Edit Employee" : "Add New Employee"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <AddNewEmployee
          form={form}
          onAddEmployee={
            editingEmployee ? handleUpdateEmployee : handleAddEmployee
          }
          onCancel={handleCancel}
          initialValues={editingEmployee || {}}
        />
      </Modal>

      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={{ pageSize: 7 }}
        locale={{
          emptyText: "No employees available.",
        }}
        style={{ marginTop: 20 }}
      />


      {/* View Employee Profile Modal */}
      {viewEmployee && (
        <ViewEmployeeProfile
          visible={!!viewEmployee}
          onCancel={handleCancelView}
          employee={viewEmployee}
        />
      )}
    </Card>
  );
};

export default Employees;
