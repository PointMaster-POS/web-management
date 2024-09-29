import React, { useState } from 'react';
import { Card, Typography, Button, Form, Input, Switch, Modal, Row, Col } from 'antd';

const { Title, Text } = Typography;

const SettingsPage = () => {
  const [isEmailNotifications, setEmailNotifications] = useState(true);
  const [isSMSNotifications, setSMSNotifications] = useState(false);

  const handleEmailChange = (value) => {
    // Logic to update email
    console.log('Email updated to:', value);
  };

  const handlePasswordChange = () => {
    Modal.info({
      title: 'Change Password',
      content: (
        <Form layout="vertical">
          <Form.Item label="New Password" name="newPassword">
            <Input.Password />
          </Form.Item>
          <Form.Item label="Confirm Password" name="confirmPassword">
            <Input.Password />
          </Form.Item>
        </Form>
      ),
      onOk() {
        // Logic to change password
        console.log('Password changed');
      },
    });
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Settings</Title>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Account Settings" bordered={false}>
            <Form layout="vertical" onFinish={handleEmailChange}>
              <Form.Item label="Email Address" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input />
              </Form.Item>
              <Button type="primary" htmlType="submit">Update Email</Button>
              <Button type="link" onClick={handlePasswordChange} style={{ marginLeft: '10px' }}>Change Password</Button>
            </Form>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Business Settings" bordered={false}>
            <Form layout="vertical">
              <Form.Item label="Business Name" name="businessName">
                <Input />
              </Form.Item>
              <Form.Item label="Business Address" name="businessAddress">
                <Input />
              </Form.Item>
              <Form.Item label="Business Hours" name="businessHours">
                <Input.TextArea rows={3} />
              </Form.Item>
              <Button type="primary">Save Changes</Button>
            </Form>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <Card title="Notification Settings" bordered={false}>
            <Text>Email Notifications</Text>
            <Switch checked={isEmailNotifications} onChange={setEmailNotifications} /><br />
            <Text>SMS Notifications</Text>
            <Switch checked={isSMSNotifications} onChange={setSMSNotifications} />
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Payment Settings" bordered={false}>
            <Form layout="vertical">
              <Form.Item label="Accepted Payment Methods" name="paymentMethods">
                <Input placeholder="e.g. Credit Card, PayPal" />
              </Form.Item>
              <Form.Item label="Default Currency" name="currency">
                <Input placeholder="e.g. USD, EUR" />
              </Form.Item>
              <Button type="primary">Save Payment Settings</Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SettingsPage;
