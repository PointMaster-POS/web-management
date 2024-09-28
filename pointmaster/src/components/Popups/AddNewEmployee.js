import React, { useEffect,useState } from "react";
import { Form, Input, Select, Button,message } from "antd";

const { Option } = Select;

const Roles = [
  { name: "cashier" },
  { name: "branch manager" },
];

const AddNewEmployee = ({ form,onAddEmployee, onCancel }) => {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    // Fetch branches when the component mounts
    const fetchBranches = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        message.error("Authorization token is missing. Please log in again.");
        return;
      }

      try {
        const response = await fetch("http://localhost:3001/branch", {
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
        setBranches(data); // Store fetched branches
      } catch (error) {
        console.error("Error fetching branches:", error);
        message.error("Failed to fetch branches.");
      }
    };

    fetchBranches();
  }, []);
  
  const handleFinish = (values) => {
    onAddEmployee(values);
  };

  return (
    <Form
    form={form}
      name="add_employee"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={handleFinish}
      style={{
        padding: "30px",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
      labelAlign="left"
    >

      <Form.Item
        label="Employee Name"
        name="employee_name"
        rules={[{ required: true, message: "Please input the employee name!" }]}
        style={{ marginBottom: "20px" }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Select Role"
        name="role"
        rules={[{ required: true, message: "Please select a role" }]}
        style={{ marginBottom: "20px" }}
      >
        <Select>
          {Roles.map((role) => (
            <Option key={role.name} value={role.name}>
              {role.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Select Branch"
        name="branch_id" // This will pass the branch_id
        rules={[{ required: true, message: "Please select a branch!" }]}
        style={{ marginBottom: "20px" }}
      >
        <Select placeholder="Select a branch">
          {branches.map((branch) => (
            <Option key={branch.branch_id} value={branch.branch_id}>
              {branch.branch_name} {/* Display branch name */}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Contact Number"
        name="phone"
        rules={[
          { required: true, message: "Please input the contact number!" },
        ]}
        style={{ marginBottom: "20px" }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{ offset: 8, span: 16 }}
        style={{ textAlign: "right" }}
      >
        <Button
          type="default"
          onClick={() => {
            onCancel();
          }}
          style={{ marginRight: "10px" }}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
        >
          Add Employee
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddNewEmployee;
