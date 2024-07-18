import React from "react";
import { Form, InputNumber, Divider } from "antd";
import { getRequiredRule } from "../../utils/utilFunctions";

const AmountSpentSecondForm = ({ form }) => {
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
    <div
      style={{
        padding: "20px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="secondForm"
        style={{ maxWidth: 600, margin: "auto" }}
      >
        <Divider orientation="left" orientationMargin="0">
          Rewards Rate Setup
        </Divider>
        <Form.Item
          label="Per Money Spent"
          name="moneySpent"
          rules={[{ required: true, message: "Please enter the " }]}
          initialValue={100}
        >
          <InputNumber min={1} max={10000} />
        </Form.Item>

        <Form.Item
          label="Rewarded Points"
          name="rewardedPoints"
          rules={[{ required: true, message: "Please enter the " }]}
          initialValue={2}
        >
          <InputNumber min={1} max={10} />
        </Form.Item>

        <Divider orientation="left" orientationMargin="0">
          Select Valid Period
        </Divider>
        <Form.Item
          label="Period in Months"
          name="periodInMonths"
          rules={[{ required: true, message: "Please input!" }]}
          initialValue={4}
        >
          <InputNumber min={1} max={24} />
        </Form.Item>

        <Divider orientation="left" orientationMargin="0">
          Minimum Number of Points to Redeem
        </Divider>
        <Form.Item
          label="Minimum Points"
          name="minimumPoints"
          rules={[getRequiredRule()]}
          initialValue={5}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </div>
  );
};

export default AmountSpentSecondForm;
