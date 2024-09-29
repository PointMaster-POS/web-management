import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import "./RegisterOwner.css";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const RegisterOwner = ({ token, form, onCancel, isEditMode }) => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const endpoint = isEditMode
        ? "http://localhost:3001/registration/update-owner-details" // Example update endpoint
        : "http://localhost:3001/registration/owner-details"; // Original create endpoint

      // Send owner data along with the token to the endpoint
      const response = await fetch(endpoint, {
        method: isEditMode ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        message.success("Owner registered successfully!");
        navigate("/login");
      } else {
        message.error("Failed to register owner. Please try again.");
      }
    } catch (error) {
      console.error("Error registering owner:", error);
      message.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="owner-form-container">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="owner-form"
      >
        <Form.Item
          label="Owner Name"
          name="business_owner_name"
          rules={[
            { required: true, message: "Please input the owner's name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Owner Email"
          name="business_owner_mail"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input a valid email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {!isEditMode && (
          <Form.Item
            label="Password"
            name="business_password"
            rules={[
              { required: true, message: "Please input the password!" },
              { min: 8, message: "Password must be at least 8 characters!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item
          wrapperCol={{ offset: 8, span: 16 }}
          style={{ textAlign: "right" }}
        >
          <Button
            type="default"
            onClick={onCancel}
            style={{ marginRight: "20px", fontSize: "16px" }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "#007bff",
              borderColor: "#007bff",
              fontSize: "16px",
            }}
          >
            {isEditMode ? "Update" : "Register Owner"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterOwner;
