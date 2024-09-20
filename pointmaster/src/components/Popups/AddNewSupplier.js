import React from "react";
import { Form, Input, Button } from "antd";

const AddNewSupplier = ({ form, onAddSupplier, onCancel }) => {
  const handleFinish = (values) => {
    onAddSupplier(values); // Pass form values to Stores component
  };

  return (
    <Form
      form={form}
      name="add_supplier"
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
        label="Supplier Name"
        name="supplier_name"
        rules={[{ required: true, message: "Please input the supplier name!" }]}
        style={{ marginBottom: "20px" }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Contact Person"
        name="contact_person"
        rules={[
          { required: true, message: "Please input the branch location!" },
        ]}
        style={{ marginBottom: "20px" }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Contact Number"
        name="contact_number"
        rules={[{ required: true, message: "Please select a branch manager!" }]}
        style={{ marginBottom: "20px" }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email Address"
        name="email"
        rules={[
          { required: true, message: "Please input the branch telephone!" },
          { type: "email", message: "The input is not valid E-mail!" },
        ]}
        style={{ marginBottom: "20px" }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input the branch email!" },
          { type: "email", message: "The input is not valid E-mail!" },
        ]}
        style={{ marginBottom: "20px" }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        rules={[{ required: true, message: "Please input the address!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="bank_details"
        label="Bank Details"
        rules={[{ required: true, message: "Please input the bank details!" }]}
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
          Add Supplier
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddNewSupplier;
