import React from 'react';
import { Form, Input, DatePicker } from 'antd';

const CashForPurchaseFirstForm = ({ form }) => {
  const { RangePicker } = DatePicker;
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
      <Form {...formItemLayout} form={form} variant="filled" style={{ maxWidth: 600, margin: "auto" }}>
        <Form.Item label="Program Name" name="Input" rules={[{ required: true, message: "Please input!" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="TextArea" rules={[{ required: true, message: "Please input!" }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Select Valid Period" name="RangePicker" rules={[{ required: true, message: "Please input!" }]}>
          <RangePicker />
        </Form.Item>
      </Form>
    </div>
  );
};

export default CashForPurchaseFirstForm;
