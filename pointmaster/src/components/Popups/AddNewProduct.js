import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import "./Styles.css"

const AddNewProduct = ({ form, onAddProduct, onCancel }) => {
  const handleFinish = (values) => {
    onAddProduct(values); // Pass form values to Stores component
  };

  return (
    <Form className="large-font-form"
      form={form}
      name="add_product"
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
        label="Product Name"
        name="product_name"
        rules={[{ required: true, message: "Please input the product name!" }]}
        style={{ marginBottom: "20px" }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Category"
        name="Category"
        rules={[
          { required: true, message: "Please input the product category!" },
        ]}
        style={{ marginBottom: "20px" }}
      >
        <Input />
      </Form.Item>

      {/* <Form.Item
        label="Quantity"
        name="Quantyity"
        style={{ marginBottom: "20px" }}
      >
        <Input />
      </Form.Item>
 */}
      <Form.Item
        label="Buying Price"
        name="buying_price"
        rules={[{ required: true, message: "Please input the buying price!" }]}
        style={{ marginBottom: "20px" }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Seling Price"
        name="selling_price"
        rules={[{ required: true, message: "Please input the sellinh price!" }]}
        style={{ marginBottom: "20px" }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="Supplier ID"
        label="supplier_id"
        rules={[{ required: true, message: "Please input the supplier ID!" }]}
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
          Add Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddNewProduct;
