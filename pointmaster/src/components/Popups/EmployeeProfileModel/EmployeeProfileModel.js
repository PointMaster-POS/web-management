import React from "react";
import { Modal, Descriptions, Avatar, Row, Col, Typography } from "antd";

const { Title } = Typography;

const ViewEmployeeProfile = ({ visible, onCancel, employee }) => {
  return (
    <Modal
      title="Employee Profile"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      centered
      width={700}
    >
      <Row gutter={16} align="middle" style={{ marginBottom: 20 }}>
        <Col span={6}>
          <Avatar
            src={employee?.photo_url}
            size={100}
            style={{
              display: "block",
              margin: "0 auto",
              border: "2px solid #1890ff",
            }}
          />
        </Col>
        <Col span={18}>
          <Title level={4} style={{ marginBottom: 0 }}>
            {employee?.employee_name || "N/A"}
          </Title>
          <p style={{ color: "gray" }}>{employee?.role || "N/A"}</p>
          <p>{employee?.email || "No email provided"}</p>
          <p>{employee?.phone || "No contact number"}</p>
        </Col>
      </Row>

      <Descriptions title="Employee Details" bordered>
        <Descriptions.Item label="Employee ID" span={3}>
          {employee?.employee_id || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Role" span={3}>
          {employee?.role || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Contact Number" span={3}>
          {employee?.phone || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Email" span={3}>
          {employee?.email || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Joined Date" span={3}>
          {employee?.joined_date || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Department" span={3}>
          {employee?.department || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Address" span={3}>
          {employee?.address || "N/A"}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default ViewEmployeeProfile;
