import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, message, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { storage } from "../../../firebase"; // Your Firebase setup
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./RegisterOwner.css";

const { Title } = Typography;

const RegisterOwner = ({
  form,
  onCancel,
  isEditMode,
  onRegisterOrUpdateOwner,
  ownerData = {} // Pre-fill data when editing
}) => {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (isEditMode && ownerData.photo_url) {
      setFileList([{ url: ownerData.photo_url, name: "Existing image" }]);
    }
  }, [isEditMode, ownerData.photo_url]);

  // Handle form submission
  const handleFinish = async (values) => {
    try {
      // Check if a new image is uploaded or retain the existing one
      if (fileList.length > 0 && fileList[0].originFileObj) {
        const imageUrl = await handleUpload(fileList[0].originFileObj);
        values.business_owner_photo_url = imageUrl;
      } else if (isEditMode) {
        // Use the existing image URL for updates if no new image is uploaded
        values.business_owner_photo_url = ownerData.photo_url;
      }

      // Pass form values to the parent function
      onRegisterOrUpdateOwner(values, isEditMode ? ownerData.id : null);
    } catch (error) {
      message.error("Error submitting the form. Please try again.");
      console.error("Form submission error:", error);
    }
  };

  // Handle image upload to Firebase Storage
  const handleUpload = async (file) => {
    try {
      const storageRef = ref(storage, `owner-images/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      message.error("Error uploading image. Please try again.");
      throw new Error("Image upload failed");
    }
  };

  // Handle file selection in the Upload component
  const handleFileChange = ({ fileList }) => {
    setFileList(fileList.map((file) => file.originFileObj || file));
  };

  return (
    <div className="owner-form-container">
      <Title level={3}>{isEditMode ? "Update Owner" : "Register New Owner"}</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="owner-form"
        initialValues={isEditMode ? ownerData : {}}
      >
        <Form.Item
          label="Owner Name"
          name="business_owner_name"
          rules={[{ required: true, message: "Please input the owner's name!" }]}
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
          label="Address"
          name="business_owner_address"
          rules={[{ required: true, message: "Please enter an address" }]}
        >
          <Input />
        </Form.Item>

        {/* Image Upload */}
        <Form.Item
          label="Image"
          name="photo_url"
          rules={[{ required: !isEditMode, message: "Please upload the image!" }]}
        >
          <Upload
            listType="picture"
            beforeUpload={() => false} // Prevent auto-upload
            onChange={handleFileChange}
            fileList={fileList}
            defaultFileList={
              isEditMode && ownerData.photo_url
                ? [{ url: ownerData.photo_url, name: "Current Image" }]
                : []
            }
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
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

        {
          !isEditMode && (
            <Form.Item
              label="Confirm Password"
              name="confirm_password"
              dependencies={["business_password"]}
              rules={[
                { required: true, message: "Please confirm the password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("business_password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Passwords do not match!");
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          )
        }

        <Form.Item style={{ textAlign: "right" }}>
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
