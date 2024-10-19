import React, { useState } from "react";
import { Form, Input, Button, Select, Upload, Typography, message } from "antd";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UploadOutlined, CheckOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { storage } from "../../../firebase";
import "./RegisterNewBusiness.css";
import axios from "axios";
import baseUrl from "../../../apiConfig";

const { Option } = Select;
const { Title } = Typography;

const RegisterNewBusiness = ({
  form,
  onCancel,
  isEditMode,
  onRegisterOrUpdateBusiness,
  defaultLogo_1,
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
        const logoURL = await handleUpload(fileList[0]);
        values.logo_url = logoURL;
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
        values.business_owner_photo_url = defaultLogo_1;
      }
    }
    onRegisterOrUpdateBusiness(values);
  };

  const handleUpload = async (file) => {
    try {
      const storageRef = ref(storage, `business-logos/${file.name}`);
      await uploadBytes(storageRef, file);
      const logoURL = await getDownloadURL(storageRef);
      return logoURL;
    } catch (error) {
      message.error("Error uploading image. Please try again.");
      throw new Error("File upload failed");
    }
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList.map((file) => file.originFileObj));
  };

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
      axios.post(`${baseUrl}:3001/registration/verify-email-send`, {
        email: form.getFieldValue("business_mail"),
      });
      message.success(
        `Verification code sent to ${form.getFieldValue("business_mail")}`
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
      email: form.getFieldValue("business_mail"),
      code: codeString,
    };

    try {
      const response = await axios.post(`${baseUrl}:3001/registration/verify-mail`, body);
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
    <React.Fragment>
      <div className="form-container">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{ status: true }}
          className="business-form"
        >
          <Form.Item
            label="Business Name"
            name="business_name"
            rules={[
              { required: true, message: "Please input the business name!" },
            ]}
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
              onChange={handleEmailChange} // Add email change handler
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

          {/* Other form fields */}
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
            rules={[
              { required: true, message: "Please input the hotline number!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Business Description" name="business_description">
            <TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Business Address"
            name="business_address"
            rules={[
              { required: true, message: "Please input the business address!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Business Logo"
            name="business_logo"
            rules={[
              {
                required: !isEditMode,
                message: "Please upload the business logo!",
              },
            ]}
          >
            <Upload
              listType="picture"
              beforeUpload={beforeUpload}
              onChange={handleFileChange}
              fileList={fileList}
            >
              <Button icon={<UploadOutlined />}>Upload Logo</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Business Registration Number"
            name="business_registration_number"
            rules={[
              {
                required: true,
                message: "Please input the registration number!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Business Type"
            name="business_type"
            rules={[
              { required: true, message: "Please select the business type!" },
            ]}
          >
            <Select placeholder="Select a type">
              <Option value="Technology">Technology</Option>
              <Option value="Retail">Retail</Option>
              <Option value="Health">Health</Option>
              <Option value="Restaurant">Restaurant</Option>
            </Select>
          </Form.Item>

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
              style={{ fontSize: "16px" }}
            >
              {isEditMode ? "Update" : "Register"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default RegisterNewBusiness;
