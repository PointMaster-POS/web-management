import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  Typography,
  Modal,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import "./RegisterNewBusiness.css";
import RegisterOwner from "../RegisterOwner/RegisterOwner";

const { Option } = Select;
const { Title } = Typography;

const RegisterNewBusiness = ({ form, onCancel }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [token, setToken] = useState(null);
  const [form_second] = Form.useForm();

  const onFinish = async (values) => {
    // Get the current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split("T")[0];

    // Add current date to the values object
    values.business_registration_date = currentDate;
    console.log(values);

    try {
      // Send business data to the endpoint
      const response = await fetch(
        "http://localhost:3001/registration/business-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();
      console.log(data.token);

      if (response.ok) {
        setToken(data.token); // Store the token
        message.success(data.message); // Show success message
        onCancel();
        setIsModalVisible(true); // Show owner registration modal
      } else {
        message.error("Failed to register business. Please try again.");
      }
    } catch (error) {
      console.error("Error registering business:", error);
      message.error("An error occurred. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form_second.resetFields();
  };

  return (
    <React.Fragment>
      <div className="form-container">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            status: true,
          }}
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
            <Input />
          </Form.Item>

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

          {/* <Form.Item
            label="Business Logo"
            name="logo_location"
            valuePropName="fileList"
            rules={[
              { required: true, message: "Please upload the business logo!" },
            ]}
          >
            <Upload listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload Logo</Button>
            </Upload>
          </Form.Item> */}

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
            </Select>
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 8, span: 16 }} // Center align buttons by removing offset
            style={{ textAlign: "right" }} // Center align buttons
          >
            <Button
              type="default"
              onClick={onCancel}
              style={{ marginRight: "20px", fontSize: "16px" }} // Bigger buttons
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
              Register Business
            </Button>
          </Form.Item>
        </Form>

        <Modal
          title={<div className="custom-modal-title">Register Owner</div>}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          centered
        >
          <RegisterOwner
            token={token}
            form={form_second}
            onCancel={handleCancel}
          />
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default RegisterNewBusiness;
