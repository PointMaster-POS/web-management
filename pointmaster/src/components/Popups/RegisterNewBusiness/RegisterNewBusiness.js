import React from "react";
import { Form, Input, Button, Select, Upload, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import "./RegisterNewBusiness.css";

const { Option } = Select;
const { Title } = Typography;

const RegisterNewBusiness = ({
  form,
  onCancel,
  isEditMode,
  onRegisterOrUpdateBusiness,
}) => {
  const handleFinish = (values) => {
    onRegisterOrUpdateBusiness(values);
  };

  return (
    <React.Fragment>
      <div className="form-container">
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
            // valuePropName="fileList"
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
              {isEditMode ? "Update" : "Register Business"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default RegisterNewBusiness;
