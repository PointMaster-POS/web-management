import React from 'react';
import { Form, Input, DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const AmountSpentFirstForm = ({ form }) => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  return (
    <div style={{ padding: "20px", justifyContent: "center", alignItems: "center" }}>
      <Form
        {...formItemLayout}
        form={form}
        name="firstForm"
        style={{ maxWidth: 600, margin: "auto" }}
      >
        <Form.Item
          label="Program Name"
          name="programName"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Select Valid Period"
          name="validPeriod"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <RangePicker />
        </Form.Item>
      </Form>
    </div>
  );
};

export default AmountSpentFirstForm;
