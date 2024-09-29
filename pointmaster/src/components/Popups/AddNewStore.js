import React from "react";
import { Form, Input, Button } from "antd";

const AddNewStore = ({ form, onAddStore, onCancel }) => {
  const handleFinish = (values) => {
    onAddStore(values);
  };

  return (
    <Form
      form={form}
      name="add_branch"
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
        label="Branch Name"
        name="branch_name"
        rules={[{ required: true, message: "Please input the branch name!" }]}
        style={{ marginBottom: "20px" }}
      >
        <Input placeholder="Enter branch name" />
      </Form.Item>

      <Form.Item
        label="Location"
        name="branch_location"
        rules={[{ required: true, message: "Please input the branch location!" }]}
        style={{ marginBottom: "20px" }}
      >
        <Input placeholder="Enter branch location" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ textAlign: "right" }}>
        <Button
          type="default"
          onClick={onCancel}
          style={{ marginRight: "10px" }}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
        >
          Add Store
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddNewStore;
