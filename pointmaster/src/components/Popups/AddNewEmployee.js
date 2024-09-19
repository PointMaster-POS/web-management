import React, { useEffect } from "react";
import { Form, Input, Select, Button } from "antd";

const { Option } = Select;

const Stores = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const AddNewEmployee = ({ onAddEmployee, onCancel }) => {
  
  const handleFinish = (values) => {
    onAddEmployee(values); // Pass form values to Stores component
  };

  return (
    <Form
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
        label="Employee ID"
        name="Employee_id"
        rules={[{ required: true, message: "Please input the employee id!" }]}
        style={{ marginBottom: "20px" }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Employee Name"
        name="employee_name"
        rules={[{ required: true, message: "Please input the employee name!" }]}
        style={{ marginBottom: "20px" }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Branch ID"
        name="branch_id"
        rules={[{ required: true, message: "Please select a branch id!" }]}
        style={{ marginBottom: "20px" }}
      >
        <Select>
          {Stores.map((store) => (
            <Option key={store.id} value={store.name}>
              {store.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Role"
        name="role"
        rules={[{ required: true, message: "Please input the employee role!" }]}
        style={{ marginBottom: "20px" }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Contact Number"
        name="contact_number"
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
