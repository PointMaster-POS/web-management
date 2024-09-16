import React from 'react';
import { Layout, Card, Form, Input, Button, DatePicker, Table } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, LockOutlined } from '@ant-design/icons';
import './Profile.css';

const { Content } = Layout;

const activityColumns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Activity',
    dataIndex: 'activity',
    key: 'activity',
  },
];

const activities = [
  {
    key: '1',
    date: '2024-07-12',
    activity: 'Logged in from IP 192.168.0.1',
  },
  {
    key: '2',
    date: '2024-07-11',
    activity: 'Changed password',
  },
  // Add more activities here
];

const Profile = () => {
  const handleUpdateProfile = (values) => {
    console.log('Profile updated:', values);
  };

  const handleChangePassword = (values) => {
    console.log('Password changed:', values);
  };

  return (
    <Content className="profile-content">
      <Card className="profile-card" title="Profile">
        <div className="profile-header">
          <img src="profile-pic-url" alt="Profile" className="profile-pic" />
          <div className="profile-info">
            <h2>John Doe</h2>
            <p>Role: Inventory Manager</p>
          </div>
        </div>
      </Card>

      <Card className="profile-card" title="Personal Information">
        <Form layout="vertical" onFinish={handleUpdateProfile}>
          <Form.Item name="date_of_birth" label="Date of Birth">
            <DatePicker />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input placeholder="Address" prefix={<HomeOutlined />} />
          </Form.Item>
          <Button type="primary" htmlType="submit">Update Profile</Button>
        </Form>
      </Card>

      <Card className="profile-card" title="Contact Information">
        <Form layout="vertical" onFinish={handleUpdateProfile}>
          <Form.Item name="email" label="Email">
            <Input placeholder="Email" prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input placeholder="Phone" prefix={<PhoneOutlined />} />
          </Form.Item>
          <Button type="primary" htmlType="submit">Update Contact Info</Button>
        </Form>
      </Card>

      <Card className="profile-card" title="Change Password">
        <Form layout="vertical" onFinish={handleChangePassword}>
          <Form.Item name="current_password" label="Current Password">
            <Input.Password placeholder="Current Password" prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item name="new_password" label="New Password">
            <Input.Password placeholder="New Password" prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item name="confirm_password" label="Confirm Password">
            <Input.Password placeholder="Confirm Password" prefix={<LockOutlined />} />
          </Form.Item>
          <Button type="primary" htmlType="submit">Change Password</Button>
        </Form>
      </Card>

      <Card className="profile-card" title="Activity Logs">
        <Table columns={activityColumns} dataSource={activities} pagination={false} />
      </Card>
    </Content>
  );
};

export default Profile;
