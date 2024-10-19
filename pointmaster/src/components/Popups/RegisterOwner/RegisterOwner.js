import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, message, Typography } from "antd";
import { UploadOutlined, CheckOutlined } from "@ant-design/icons";
import { storage } from "../../../firebase"; // Your Firebase setup
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import "./RegisterOwner.css";

const { Title } = Typography;

const RegisterOwner = ({
  form,
  onCancel,
  isEditMode,
  onRegisterOrUpdateOwner,
  defaultLogo_2,
}) => {
  const [fileList, setFileList] = useState([]);
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [isVerified, setIsVerified] = useState(false);
  const [verifyButtonText, setVerifyButtonText] = useState("Verify Email");

  // Handle form submission
  const handleFinish = async (values) => {
    if (!isVerified) {
      message.error("Please verify your email before submitting the form.");
      return;
    }

    // If there is a file selected, upload it
    if (fileList.length > 0) {
      try {
        const imageUrl = await handleUpload(fileList[0]);
        values.business_owner_photo_url = imageUrl;
      } catch (error) {
        message.error("Failed to upload the logo. Please try again.");
        return;
      }
    } else {
      // If no file is selected and it's edit mode, keep the existing image or set to defaultLogo_2
      if (!isEditMode) {
        message.error("Please upload a business logo.");
        return;
      } else if (!values.business_owner_photo_url) {
        // If no image exists, set the default logo
        values.business_owner_photo_url = defaultLogo_2;
      }
    }

    onRegisterOrUpdateOwner(values);
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
    setFileList(fileList.map((file) => file.originFileObj));
  };

  // File validation logic
  const beforeUpload = (file) => {
    const isValidType = file.type === "image/jpeg" || file.type === "image/png";
    if (!isValidType) {
      message.error("You can only upload JPG/PNG files!");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return false;
    }
    return true;
  };

  const handleVerifyEmail = () => {
    try {
      axios.post("http://209.97.173.123:3001/registration/verify-email-send", {
        email: form.getFieldValue("business_owner_mail"),
      });
      message.success(
        `Verification code sent to ${form.getFieldValue("business_owner_mail")}`
      );
    } catch (error) {
      message.error("Failed to send verification code. Please try again.");
    }
    setIsCodeVisible(true);
  };

  const handleVerifyCode = async () => {
    const codeString = verificationCode.join("");
    let isCodeValid = false;

    const body = {
      email: form.getFieldValue("business_owner_mail"),
      code: codeString,
    };

    try {
      const response = await axios.post(
        "http://209.97.173.123:3001/registration/verify-mail",
        body
      );
      if (response.status === 200) {
        isCodeValid = true;
      }
    } catch (error) {
      message.error("Failed to verify code. Please try again.");
      return;
    }

    if (isCodeValid) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsVerified(true);
      setVerifyButtonText(<CheckOutlined style={{ color: "green" }} />);
      setIsCodeVisible(false);
      message.success("Email verified successfully!");
    } else {
      message.error("Invalid verification code. Please try again.");
    }
  };

  const handleCodeChange = (index, value) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    if (value && index < 3) {
      const nextInput = document.getElementById(
        `verification-code-${index + 1}`
      );
      if (nextInput) nextInput.focus();
    }
    setVerificationCode(newCode);
  };

  const handleEmailChange = () => {
    setIsVerified(false);
    setVerifyButtonText("Verify Email");
    setVerificationCode(["", "", "", ""]);
    setIsCodeVisible(false);
  };

  return (
    <div className="owner-form-container">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="owner-form"
        initialValues={{ status: true }}
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
          <Input
            onChange={handleEmailChange}
            suffix={
              <Button
                type="link"
                onClick={handleVerifyEmail}
                style={{ color: isVerified ? "green" : undefined }}
              >
                {isVerified ? verifyButtonText : "Verify Email"}
              </Button>
            }
          />
        </Form.Item>

        {isCodeVisible && !isVerified && (
          <Form.Item label="Verification Code" required>
            <div style={{ display: "flex", gap: "10px" }}>
              {verificationCode.map((code, index) => (
                <Input
                  key={index}
                  id={`verification-code-${index}`}
                  maxLength={1}
                  style={{ width: "40px", textAlign: "center" }}
                  value={code}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                />
              ))}
            </div>
            <Button
              type="primary"
              onClick={handleVerifyCode}
              style={{ marginTop: "10px" }}
            >
              Verify
            </Button>
          </Form.Item>
        )}

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

        <Form.Item
          label="Image"
          name="photo_url"
          rules={[
            { required: !isEditMode, message: "Please upload the image!" },
          ]}
        >
          <Upload
            listType="picture"
            beforeUpload={beforeUpload}
            onChange={handleFileChange}
            fileList={fileList}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>

        {!isEditMode && (
          <>
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

            <Form.Item
              label="Confirm Password"
              name="confirm_password"
              dependencies={["business_password"]}
              rules={[
                { required: true, message: "Please confirm the password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      getFieldValue("business_password") === value
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </>
        )}

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
