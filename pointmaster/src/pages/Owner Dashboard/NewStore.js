import React from 'react';
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

const managers = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
]  

const NewStore = ({onFinish, onCancel }) => {
  return (
    <Form
      name="add_branch"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      style={{
        padding: '30px',
        borderRadius: '8px',
        backgroundColor: '#f9f9ff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
      labelAlign="left"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input the branch name!' }]}
        style={{ marginBottom: '20px' }}
      >
        <Input 
          placeholder="Enter branch name" 
        />
      </Form.Item>

      <Form.Item
        label="Location"
        name="location"
        rules={[{ required: true, message: 'Please input the branch location!' }]}
        style={{ marginBottom: '20px' }}
      >
        <Input 
          placeholder="Enter branch location" 
        />
      </Form.Item>

      <Form.Item
        label="Manager"
        name="manager"
        rules={[{ required: true, message: 'Please select a branch manager!' }]}
        style={{ marginBottom: '20px' }}
      >
        <Select 
          placeholder="Select a manager" 
        >
          {managers.map((manager) => (
            <Option key={manager.id} value={manager.id}>
              {manager.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Telephone"
        name="telephone"
        rules={[{ required: true, message: 'Please input the branch telephone!' }]}
        style={{ marginBottom: '20px' }}
      >
        <Input 
          placeholder="Enter branch telephone" 
        />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please input the branch email!' },
          { type: 'email', message: 'The input is not valid E-mail!' },
        ]}
        style={{ marginBottom: '20px' }}
      >
        <Input 
          placeholder="Enter branch email" 
        />
      </Form.Item>
  

      <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ textAlign: 'right' }}>
        <Button 
          type="default" 
          onClick={onCancel}
          style={{ marginRight: '10px' }}
        >
          Cancel
        </Button>
        <Button 
          type="primary" 
          htmlType="submit"
          style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
        >
          Add Store
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewStore;
