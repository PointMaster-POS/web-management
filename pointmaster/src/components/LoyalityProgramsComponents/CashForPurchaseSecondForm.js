import React from 'react';
import { Form, InputNumber, Divider } from 'antd';


const CashForPurchaseSecondForm = ({ form }) => {
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
        <Divider orientation="left" orientationMargin="0">Rewards Rate Setup</Divider>
        <Form.Item label="Points per Visit" name="Points" rules={[{ required: true, message: "Please enter the " }]}>
          <InputNumber min={1} max={10} defaultValue={4} />
        </Form.Item>
        <Divider orientation="left" orientationMargin="0">Select Valid Period</Divider>
        <Form.Item label="Period in Months" name="Period" rules={[{ required: true, message: "Please input!" }]}>
          <InputNumber min={1} max={24} defaultValue={3} />
        </Form.Item>
        <Divider orientation="left" orientationMargin="0">Minimum Number of Points to Redeem</Divider>
        <Form.Item label="Minimum Points" name="Minimum Points" rules={[{ required: true, message: "Please input!" }]}>
          <InputNumber defaultValue={100} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default CashForPurchaseSecondForm;
