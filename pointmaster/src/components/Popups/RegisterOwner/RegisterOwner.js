import React from "react";
import { Form, Input, Button, Typography } from "antd";
import "./RegisterOwner.css";

const { Title } = Typography;

const RegisterOwner = ({ form, onCancel, isEditMode, onRegisterOrUpdateOwner }) => {

  const handleFinish = (values) => {
      onRegisterOrUpdateOwner(values);
  };

  return (
    <div className="owner-form-container">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
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

        <Form.Item
          label="Contact Number"
          name="business_owner_phone"
          rules={[
            { required: true, message: "Please input the contact number!" },
          ]}
          style={{ marginBottom: "20px" }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="business_owner_address"
          label="Address"
          rules={[{ required: true, message: "Please enter an address" }]}
        >
          <Input />
        </Form.Item>

        {/* <Form.Item
        name="business_owner_birthday"
        label="Birthday"
        rules={[{ required: true, message: "Please select a birth date" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
 */}

        {/* <Form.Item
        label="Image"
        name="photo_url"
        valuePropName="fileList"
        rules={[{ required: true, message: "Please upload the image!" }]}
      >
        <Upload listType="picture" beforeUpload={() => false}>
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Form.Item> */}

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
