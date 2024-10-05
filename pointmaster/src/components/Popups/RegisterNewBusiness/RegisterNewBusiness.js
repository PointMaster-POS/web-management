import React, { useState } from "react";
import { Form, Input, Button, Select, Upload, Typography, message } from "antd";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UploadOutlined, CheckOutlined } from "@ant-design/icons"; // Import CheckOutlined
import TextArea from "antd/es/input/TextArea";
import { storage } from "../../../firebase"; 
import "./RegisterNewBusiness.css"; // Ensure this CSS file is present and properly styles the form
import axios from "axios";

const { Option } = Select;
const { Title } = Typography;

const RegisterNewBusiness = ({
  form,
  onCancel,
  isEditMode,
  onRegisterOrUpdateBusiness,
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

    if (fileList.length > 0) {
      try {
        // Upload the file to Firebase storage
        const logoURL = await handleUpload(fileList[0]);
        // Add the uploaded logo URL to form values
        values.logo_url = logoURL;
        console.log("Form values:", logoURL);
        // Submit the form with updated values
        onRegisterOrUpdateBusiness(values);
      } catch (error) {
        message.error("Failed to upload the logo. Please try again.");
      }
    } else {
      message.error("Please upload a business logo.");
    }
  };

  // Function to handle image upload to Firebase
  const handleUpload = async (file) => {
    try {
      const storageRef = ref(storage, `business-logos/${file.name}`);
      await uploadBytes(storageRef, file);
      console.log("File uploaded successfully!");
      const logoURL = await getDownloadURL(storageRef);
      return logoURL;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error("File upload failed");
    }
  };

  // Handle file selection in the Upload component
  const handleFileChange = ({ fileList }) => {
    setFileList(fileList.map((file) => file.originFileObj));
  };

  // Optional file validation before upload (e.g., check file type and size)
  const beforeUpload = (file) => {
    const isValidType = file.type === "image/jpeg" || file.type === "image/png";
    if (!isValidType) {
      message.error("You can only upload JPG/PNG files!");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2; // 2MB max file size
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return false;
    }
    return true;
  };

  // Handle email verification
  const handleVerifyEmail = () => {
    //send email verification code
  try{
    axios.post("http://209.97.173.123:3001/registration/verify-email-send", {
      email: form.getFieldValue("business_mail"),
    });

    message.success(`Verification code sent to ${form.getFieldValue("business_mail")}`);
  } catch (error) {
    console.error("Error sending verification code:", error);
    message.error("Failed to send verification code. Please try again.");
  }

    setIsCodeVisible(true);
  };

  const handleVerifyCode = async () => {
    // Check if the verification code is correct
    const codeString = verificationCode.join('');
    let isCodeValid = false;

    console.log("Verification code:", codeString);
    const body = {
      email: form.getFieldValue("business_mail"),
      code: codeString,
    };
    // verify the code
    try {
      const response = await axios.post("http://209.97.173.123:3001/registration/verify-mail", 
      body,
      {
        headers: {
          "Content-Type": "application/json",
        }
      }

      );
        
     
     if (response.status === 200) {
      isCodeValid = true;
    }
      

    } catch (error) {
      console.error("Error verifying code:", error);
      message.error("Failed to verify code. Please try again.");
      return;
    }

    if (isCodeValid) {
      // Simulating async verification
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsVerified(true);
      setVerifyButtonText(<CheckOutlined style={{ color: 'green' }} />); // Change button to green tick icon
      setIsCodeVisible(false); // Hide the 4-digit input space
      message.success("Email verified successfully!");
    } else {
      message.error("Invalid verification code. Please try again.");
    }
  };

  // Handle input change for verification code boxes
  const handleCodeChange = (index, value) => {
    const newCode = [...verificationCode];
    newCode[index] = value;

    // Move focus to the next input if the current one is filled
    if (value && index < 3) {
      const nextInput = document.getElementById(`verification-code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    setVerificationCode(newCode);
  };

  return (
    <React.Fragment>
      <div className="form-container">
        <Title level={3}>{isEditMode ? "Update Business" : "Register New Business"}</Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            status: true,
          }}
          className="business-form"
        >
          <Form.Item
            label="Business Name"
            name="business_name"
            rules={[{ required: true, message: "Please input the business name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Business Email"
            name="business_mail"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input a valid email!",
              },
            ]}
          >
            <Input
              suffix={
                <Button
                  type="link"
                  onClick={handleVerifyEmail}
                  style={{ color: isVerified ? "green" : undefined }} // Change color to green if verified
                >
                  {isVerified ? verifyButtonText : "Verify Email"}
                </Button>
              }
            />
          </Form.Item>

          {/* Verification code input */}
          {isCodeVisible && !isVerified && (
            <Form.Item label="Verification Code" required>
              <div style={{ display: 'flex', gap: '10px' }}>
                {verificationCode.map((code, index) => (
                  <Input
                    key={index}
                    id={`verification-code-${index}`}
                    maxLength={1}
                    style={{ width: '40px', textAlign: 'center' }}
                    value={code}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                  />
                ))}
              </div>
              <Button type="primary" onClick={handleVerifyCode} style={{ marginTop: '10px' }}>
                Verify
              </Button>
            </Form.Item>
          )}

          <Form.Item
            label="Business URL"
            name="business_url"
            rules={[{ type: "url", message: "Please input a valid URL!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Business Hotline"
            name="business_hotline"
            rules={[{ required: true, message: "Please input the hotline number!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Business Description" name="business_description">
            <TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Business Address"
            name="business_address"
            rules={[{ required: true, message: "Please input the business address!" }]}
          >
            <Input />
          </Form.Item>

          {/* Business Logo Upload */}
          <Form.Item
            label="Business Logo"
            name="business_logo"
            rules={[{ required: true, message: "Please upload the business logo!" }]}
          >
            <Upload
              listType="picture"
              beforeUpload={beforeUpload} // File validation (optional)
              onChange={handleFileChange}
              fileList={fileList}
            >
              <Button icon={<UploadOutlined />}>Upload Logo</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Business Registration Number"
            name="business_registration_number"
            rules={[{ required: true, message: "Please input the registration number!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Business Type"
            name="business_type"
            rules={[{ required: true, message: "Please select the business type!" }]}
          >
            <Select placeholder="Select a type">
              <Option value="Technology">Technology</Option>
              <Option value="Retail">Retail</Option>
              <Option value="Health">Health</Option>
              <Option value="Restaurant">Restaurant</Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ textAlign: "right" }}>
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
              {isEditMode ? "Update" : "Register Business"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default RegisterNewBusiness;
