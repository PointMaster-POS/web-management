import React, { useState } from "react";
import { Card, Col, Row, Typography, Button, Modal, Image, Form, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import RegisterNewBusiness from "../../components/Popups/RegisterNewBusiness/RegisterNewBusiness";
import RegisterOwner from "../../components/Popups/RegisterOwner/RegisterOwner";

const { Title, Text } = Typography;

const ProfilePage = () => {
  const [form_first] = Form.useForm();
  const [form_second] = Form.useForm();
  const [isBusinessModalVisible, setIsBusinessModalVisible] = useState(false);
  const [isOwnerModalVisible, setIsOwnerModalVisible] = useState(false);

  const [businessDetails, setBusinessDetails] = useState({});

  const [ownerDetails, setOwnerDetails] = useState({});

  /* const fetchBusinessDetails = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/category/owner/${branchID}`,
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
      setBusinessDetails(fetch_data)
    } catch (error) {
      console.error("Error fetching categories:", error);
      message.error("Failed to fetch categories.");
    }
  };
 */
  /* const fetchOwnerDetails = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/category/owner/${branchID}`,
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
      setOwnerDetails(fetched_data)
    } catch (error) {
      console.error("Error fetching categories:", error);
      message.error("Failed to fetch categories.");
    }
  }; */

  /* useEffect(() => {
    fetchBusinessDetails(), fetchOwnerDetails();
  }, []); */

  const handleEditBusiness = () => {
    form_first.setFieldsValue(businessDetails); // Set the form with business details when editing
    setIsBusinessModalVisible(true);
  };

  const handleEditOwner = () => {
    form_second.setFieldsValue(ownerDetails); // Set the form with owner details when editing
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


  const defaultLogo_1 = "/images/logo-placeholder.webp";
  const defaultLogo_2 = "/images/placeholder_for_owner.png";

  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Profile Overview
      </Title>
      <Row gutter={16}>
        {/* Business Details Section */}
        <Col span={12}>
          <Card
            title="Business Details"
            bordered={false}

            extra={
              <Button icon={<EditOutlined />} onClick={handleEditBusiness} />
            }
          >
            {/* Business Logo */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <Image
                width={100}
                height={100}
                src={businessDetails.logo || defaultLogo_1} // Business logo from details
                preview={false}
                style={{ borderRadius: "50%" }}
              />
              <Title level={4} style={{ marginTop: "10px" }}>
                {businessDetails.name} {/* Business name below logo */}
              </Title>
            </div>
            <Row style={{ marginBottom: 10 }}>
              <Col span={24}>
                <Text strong style={{ fontSize: "16px" }}>
                  Email:{" "}
                </Text>
                <Text style={{ fontSize: "16px" }}>
                  {businessDetails.email}
                </Text>
              </Col>
            </Row>
            <Row style={{ marginBottom: 16 }}>
              <Col span={24}>
                <Text strong style={{ fontSize: "16px" }}>
                  Website:{" "}
                </Text>
                  <a
                    href={businessDetails.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "16px" }}
                  >
                    {businessDetails.url}
                  </a>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col span={24}>
                <Text strong style={{ fontSize: "16px" }}>
                  Hotline:{" "}
                </Text>
                <Text style={{ fontSize: "16px" }}>
                  {businessDetails.hotline}
                </Text>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col span={24}>
                <Text strong style={{ fontSize: "16px" }}>
                  Description:{" "}
                </Text>
                <Text style={{ fontSize: "16px" }}>
                  {businessDetails.description}
                </Text>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col span={24}>
                <Text strong style={{ fontSize: "16px" }}>
                  Address:{" "}
                </Text>
                <Text style={{ fontSize: "16px" }}>
                  {businessDetails.address}
                </Text>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col span={24}>
                <Text strong style={{ fontSize: "16px" }}>
                  Registration Number:{" "}
                </Text>
                <Text style={{ fontSize: "16px" }}>
                  {businessDetails.registrationNumber}
                </Text>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col span={24}>
                <Text strong style={{ fontSize: "16px" }}>
                  Type:{" "}
                </Text>
                <Text style={{ fontSize: "16px" }}>
                  {businessDetails.type}
                </Text>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col span={24}>
                <Text strong style={{ fontSize: "16px" }}>
                  Registration Date:{" "}
                </Text>
                <Text style={{ fontSize: "16px" }}>
                  {businessDetails.registrationDate}
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
            extra={<Button icon={<EditOutlined />} onClick={handleEditOwner} />}
          >
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <Image
                width={100}
                height={100}
                src={businessDetails.logo || defaultLogo_2} // Business logo from details
                preview={false}
                style={{ borderRadius: "50%" }}
              />
              <Title level={4} style={{ marginTop: "10px" }}>
                {ownerDetails.name} {/* Business name below logo */}
              </Title>
            </div>
            <Text strong style={{ fontSize: "16px" }}>
              Email:
            </Text>{" "}
            <Text style={{ fontSize: "16px" }}>{ownerDetails.email}</Text>
            <br />
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

      {/* Recent Activity Section */}
      <Card
        title="Recent Activity"
        style={{ marginTop: "20px" }}
        bordered={false}
      >
        <Text>Display recent activity or notifications here.</Text>
      </Card>

      {/* Modal for editing business */}
      <Modal
        title="Edit Business Details"
        visible={isBusinessModalVisible}
        onCancel={handleCancelBusinessModal}
        footer={null}
        width={750}
        centered
      >
        <RegisterNewBusiness form={form_first} onCancel={handleCancelBusinessModal} />
      </Modal>


      {/* Modal for editing owner */}
      <Modal
        title="Edit Owner Details"
        visible={isOwnerModalVisible}
        onCancel={handleCancelOwnerModal}
        footer={null}
        centered
      >
        <RegisterOwner form={form_second} onCancel={handleCancelOwnerModal} />
      </Modal>
    </div>
  );
};

export default ProfilePage;
