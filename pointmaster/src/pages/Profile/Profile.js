import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Button,
  Modal,
  Image,
  Form,
  message,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import RegisterNewBusiness from "../../components/Popups/RegisterNewBusiness/RegisterNewBusiness";
import RegisterOwner from "../../components/Popups/RegisterOwner/RegisterOwner";
import defaultLogo_1 from './default-profile-images';

const { Title, Text } = Typography;

const ProfilePage = () => {
  const [form_first] = Form.useForm();
  const [form_second] = Form.useForm();
  const [isBusinessModalVisible, setIsBusinessModalVisible] = useState(false);
  const [isOwnerModalVisible, setIsOwnerModalVisible] = useState(false);
  const [businessImageBase64, setBusinessImageBase64] = useState("");

  const [details, setDetails] = useState({});

  const fetchDetails = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `http://209.97.173.123:3001/employee/owner-profile`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const fetched_data = await response.json();
      setDetails(fetched_data);
      if (fetched_data.business_image) {
        const bufferData = fetched_data.business_image.data;
        const base64 = arrayBufferToBase64(bufferData);
        setBusinessImageBase64(`data:image/png;base64,${base64}`);
        // console.log({hello : base64});
        console.log({image : businessImageBase64});
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      message.error("Failed to fetch categories.");
    }
  };
  console.log(details);


  const handleUpdateBusiness = async (values) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
    }

    /*
    {
  "business_name": "Tech Innovators Ltd.",
  "business_mail": "contact@techinnovators.com",
  "business_url": "https://www.techinnovators.com",
  "business_hotline": "+1-800-TECH-INNO",
  "business_description": " tech solutions.",
  "business_address": "1234 Innovation Drive, Silicon Valley, CA",
  "logo_location": "https://www.techinnovators.com/logo.png",
  "business_registration_number": "TIN-12345678",
  "business_type": "Technology",
  "business_registration_date": "2022-01-15"
    }   
  need to filter those values from values
  */

  const dto = {
    business_name: values.business_name,
    business_mail: values.business_mail,
    business_url: values.business_url,
    business_hotline: values.business_hotline,
    business_description: values.business_description,
    business_address: values.business_address,
    business_registration_number: values.business_registration_number,
    business_type: values.business_type,
    business_registration_date: values.business_registration_date,
    logo_url: values.logo_url,
  };

    console.log(dto);

    try {
      const response = await fetch(
        "http://209.97.173.123:3001/business/update-business-details",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dto),
        }
      );

      if (response.ok) {
        message.success("Business updated successfully");
        setIsBusinessModalVisible(false);
        fetchDetails();
        form_first.resetFields();
      } else {
        message.error("Failed to update business. Please try again.");
      }
    } catch (error) {
      console.error(error);
      message.error("Error occurred while updating business.");
    }
  };


  const handleUpdateOwner = async (values) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
    }
    console.log(values);

    //filter values
    const dto = {
      business_owner_name: values.business_owner_name,
      business_owner_mail: values.business_owner_mail,
      business_owner_phone: values.business_owner_phone,
      business_owner_address: values.business_owner_address,
      business_owner_birthday: values.business_owner_birthday,
      business_owner_photo_url: values.business_owner_photo_url,

    };

    try {
      const response = await fetch(
        "http://209.97.173.123:3001/business/update-owner-details",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(dto),
        }
      );

      if (response.ok) {
        message.success("Owner updated successfully!");
        setIsOwnerModalVisible(false);
        form_second.resetFields();
        fetchDetails();
      } else {
        message.error("Failed to update owner. Please try again.");
      }
    } catch (error) {
      console.error("Error updating owner:", error);
      message.error("An error occurred. Please try again.");
    }
  };

  const arrayBufferToBase64 = (buffer) => {
    const binary = String.fromCharCode(...new Uint8Array(buffer));
    return btoa(binary); // Convert binary to Base64
  };
  
  // const fetchAndSetImage = async () => {
  //   await fetchDetails();
  // }


  useEffect( () => {
    fetchDetails();
     
   
  }, [navigator.onLine]);

  const handleEditBusiness = () => {
    form_first.setFieldsValue(details); // Set the form with business details when editing
    setIsBusinessModalVisible(true);
  };

  const handleEditOwner = () => {
    form_second.setFieldsValue(details); // Set the form with owner details when editing
    setIsOwnerModalVisible(true);
  };

  const handleChangePassword = () => {
    Modal.info({
      title: "Change Password",
      content: (
        <div>
          {/* Here you can add a form for changing the password */}
          <Text>Functionality to change password goes here.</Text>
        </div>
      ),
      onOk() {},
    });
  };
 
  const handleCancelBusinessModal = () => {
    setIsBusinessModalVisible(false);
    form_first.resetFields(); // Reset the form when the modal is closed
  };

  const handleCancelOwnerModal = () => {
    setIsOwnerModalVisible(false);
    form_second.resetFields(); // Reset the form when the modal is closed
  };



  const defaultLogo_2 = "/images/placeholder_for_owner.png";

  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Profile Overview
      </Title>
      <Row gutter={24} style={{ marginTop: "30px" }}>
        {/* Business Details Section */}
        <Col span={12}>
          <Card
            title="Business Details"
            bordered={false}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              padding: "20px",
            }}
            extra={
              <Button icon={<EditOutlined />} onClick={handleEditBusiness} />
            }
          >
            {/* Business Logo */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>

              {/* console log image here */}
              {console.log({imagebody: details.business_image})}
              <Image
                width={100}
                height={100}
                src={  details.logo_url || defaultLogo_1} // Business logo from details
                preview={false}
                style={{ borderRadius: "50%" }}
              />
              <Title level={4} style={{ marginTop: "10px" }}>
                {details.business_name} {/* Business name below logo */}
              </Title>
            </div>
            <Row style={{ marginBottom: 10 }}>
              <Col span={24}>
                <Text strong style={{ fontSize: "16px" }}>
                  Email:{" "}
                </Text>
                <Text style={{ fontSize: "16px" }}>
                  {details.business_mail}
                </Text>
              </Col>
            </Row>
            <Row style={{ marginBottom: 16 }}>
              <Col span={24}>
                <Text strong style={{ fontSize: "16px" }}>
                  Website:{" "}
                </Text>
                <a
                  href={details.businees_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "16px" }}
                >
                  {details.business_url}
                </a>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col span={24}>
                <Text strong style={{ fontSize: "16px" }}>
                  Hotline:{" "}
                </Text>
                <Text style={{ fontSize: "16px" }}>
                  {details.business_hotline}
                </Text>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col span={24}>
                <Text strong style={{ fontSize: "16px" }}>
                  Description:{" "}
                </Text>
                <Text style={{ fontSize: "16px" }}>
                  {details.business_description}
                </Text>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col span={24}>
                <Text strong style={{ fontSize: "16px" }}>
                  Address:{" "}
                </Text>
                <Text style={{ fontSize: "16px" }}>
                  {details.business_address}
                </Text>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col span={24}>
                <Text strong style={{ fontSize: "16px" }}>
                  Registration Number:{" "}
                </Text>
                <Text style={{ fontSize: "16px" }}>
                  {details.business_registration_number}
                </Text>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col span={24}>
                <Text strong style={{ fontSize: "16px" }}>
                  Type:{" "}
                </Text>
                <Text style={{ fontSize: "16px" }}>
                  {details.business_type}
                </Text>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col span={24}>
                <Text strong style={{ fontSize: "16px" }}>
                  Registration Date:{" "}
                </Text>
                <Text style={{ fontSize: "16px" }}>
                  {details.business_registration_date
                    ? new Date(details.business_registration_date)
                        .toISOString()
                        .split("T")[0]
                    : "Invalid Date"}
                </Text>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Owner Details Section */}
        <Col span={12}>
          <Card
            title="Owner Details"
            bordered={false}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              padding: "20px",
            }}
            extra={<Button icon={<EditOutlined />} onClick={handleEditOwner} />}
          >
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <Image
                width={100}
                height={100}
                src={ details.business_owner_photo_url ||  defaultLogo_2} // Business logo from details
                preview={false}
                style={{ borderRadius: "50%" }}
              />
              <Title level={4} style={{ marginTop: "10px" }}>
                {details.business_owner_name} {/* Business name below logo */}
              </Title>
            </div>
            <Row style={{ marginBottom: 10 }}>
              <Col span={24}>
                <Text strong style={{ fontSize: "16px" }}>
                  Email:
                </Text>{" "}
                <Text style={{ fontSize: "16px" }}>
                  {details.business_owner_mail}
                </Text>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col span={24}>
                <Text strong style={{ fontSize: "16px" }}>
                  Contact Number:
                </Text>{" "}
                <Text style={{ fontSize: "16px" }}>
                  {details.business_owner_phone}
                </Text>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col span={24}>
                <Text strong style={{ fontSize: "16px" }}>
                  Address:
                </Text>{" "}
                <Text style={{ fontSize: "16px" }}>
                  {details.business_owner_address}
                </Text>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col span={24}>
                <Text strong style={{ fontSize: "16px" }}>
                  Birthday:{" "}
                </Text>
                <Text style={{ fontSize: "16px" }}>
                  {details.business_owner_birthday
                    ? new Date(details.business_owner_birthday)
                        .toISOString()
                        .split("T")[0]
                    : "Invalid Date"}
                </Text>
              </Col>
            </Row>
            <Button
              type="link"
              onClick={handleChangePassword}
              style={{ fontSize: "16px", paddingLeft: "0" }}
            >
              Change Password
            </Button>
          </Card>
        </Col>
      </Row>

      {/* Modal for editing business */}
      <Modal
        title={
          <div
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Update Business Details
          </div>
        }
        visible={isBusinessModalVisible}
        onCancel={handleCancelBusinessModal}
        footer={null}
        width={750}
        centered
      >
        <RegisterNewBusiness
          form={form_first}
          onCancel={handleCancelBusinessModal}
          isEditMode={true}
          onRegisterOrUpdateBusiness={handleUpdateBusiness}
        />
      </Modal>

      {/* Modal for editing owner */}
      <Modal
        title={
          <div
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Update Owner Details
          </div>
        }
        visible={isOwnerModalVisible}
        onCancel={handleCancelOwnerModal}
        footer={null}
        centered
      >
        <RegisterOwner
          form={form_second}
          onCancel={handleCancelOwnerModal}
          isEditMode={true}
          onRegisterOrUpdateOwner={handleUpdateOwner}
        />
      </Modal>
    </div>
  );
};

export default ProfilePage;
