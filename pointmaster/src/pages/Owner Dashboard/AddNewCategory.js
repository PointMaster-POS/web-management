import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";

const AddNewCategory = ({ form, onAddCategory, onCancel }) => {
  const handleFinish = (values) => {
    onAddCategory(values); // Pass form values to Stores component
  };

  return (
    <Form
      form={form}
      name="add_category"
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
        label="Category Name"
        name="category_name"
        rules={[{ required: true, message: "Please input the category name!" }]}
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
          Add category
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddNewCategory;
