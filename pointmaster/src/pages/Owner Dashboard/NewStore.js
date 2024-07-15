import React from 'react';
import { Form, Input, Select } from 'antd';

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
    >
      <Form.Item
        label="Branch Name"
        name="branchName"
        rules={[{ required: true, message: 'Please input the branch name!' }]}
      >
        <Input placeholder="Enter branch name" />
      </Form.Item>

      <Form.Item
        label="Branch Telephone"
        name="branchTelephone"
        rules={[{ required: true, message: 'Please input the branch telephone!' }]}
      >
        <Input placeholder="Enter branch telephone" />
      </Form.Item>

      <Form.Item
        label="Branch Email"
        name="branchEmail"
        rules={[
          { required: true, message: 'Please input the branch email!' },
          { type: 'email', message: 'The input is not valid E-mail!' },
        ]}
      >
        <Input placeholder="Enter branch email" />
      </Form.Item>

      <Form.Item
        label="Branch Manager"
        name="branchManager"
        rules={[{ required: true, message: 'Please select a branch manager!' }]}
      >
        <Select placeholder="Select a manager">
          {managers.map((manager) => (
            <Option key={manager.id} value={manager.id}>
              {manager.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Branch Location"
        name="branchLocation"
        rules={[{ required: true, message: 'Please input the branch location!' }]}
      >
        <Input placeholder="Enter branch location" />
      </Form.Item>
    </Form>
  );
};

export default NewStore;
