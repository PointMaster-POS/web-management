import React, { useState } from "react";
import { Button, message, Steps, theme, Form } from "antd";
import AmountSpentFirstForm from './AmountSpentFirstForm';
import AmountSpentSecondForm from './AmountSpentSecondForm';
import AmountSpentThirdForm from './AmountSpentThirdForm';

const AmountSpent = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();

  const steps = [
    {
      title: "Program Details Form",
      content: <AmountSpentFirstForm form={form1} />,
    },
    {
      title: "Rewards Setup Form",
      content: <AmountSpentSecondForm form={form2} />,
    },
    {
      title: "Rewarded Items Form",
      content: <AmountSpentThirdForm form={form3} />,
    },
  ];

  const next = () => {
    if (current === 0) {
      form1.validateFields().then((values) => {
        console.log('Form 1 Values:', values?  values : "empty");
        setCurrent(current + 1);
      });
    } else if (current === 1) {
      form2.validateFields().then((values) => {
        console.log('Form 2 Values:', values);
        setCurrent(current + 1);
      });
    } else {
      form3.validateFields().then((values) => {
        console.log('Form 3 Values:', values);
        setCurrent(current + 1);
      });
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handledDone = () => {
    message.success("Processing complete!");
    setCurrent(0);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <Form.Provider>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={handledDone}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={prev}>
            Previous
          </Button>
        )}
      </div>
    </Form.Provider>
  );
};

export default AmountSpent;
