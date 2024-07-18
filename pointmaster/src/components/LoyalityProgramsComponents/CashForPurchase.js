import React, { useState, useEffect } from "react";
import { Button, message, Steps, theme, Form } from "antd";
import CashForPurchaseFirstForm from './CashForPurchaseFirstForm';
import CashForPurchaseSecondForm from './CashForPurchaseSecondForm';
import CashForPurchaseThirdForm from './CashForPurchaseThirdForm';
const CashForPurchase = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();

  const [initialValues, setInitialValues] = useState({
    firstForm: {},
    secondForm: {},
    thirdForm: {},
  });

  useEffect(() => {
    form1.setFieldsValue(initialValues.firstForm);
    form2.setFieldsValue(initialValues.secondForm);
    form3.setFieldsValue(initialValues.thirdForm);
  }, [form1, form2, form3, initialValues]);

  const getChangedValues = (initial, current) => {
    return Object.keys(current).reduce((acc, key) => {
      if (initial[key] !== current[key]) {
        acc[key] = current[key];
      }
      return acc;
    }, {});
  };

  const steps = [
    {
      title: "Program Details Form",
      content: <CashForPurchaseFirstForm form={form1} />,
    },
    {
      title: "Rewards Setup Form",
      content: <CashForPurchaseSecondForm form={form2} />,
    },
    {
      title: "Rewarded Items Form",
      content: <CashForPurchaseThirdForm form={form3} />,
    },
  ];

  const next = () => {
    if (current === 0) {
      form1.validateFields().then((values) => {
        console.log('Form 1 Values:', values ? values : null);
        setCurrent(current + 1);
      });
    } else if (current === 1) {
      form2.validateFields().then((values) => {
        console.log('Form 2 Values:', values ? values : null);
        setCurrent(current + 1);
      });
    } else {
      form3.validateFields().then((values) => {
        console.log('Form 3 Values:', values ? values : null);
        setCurrent(current + 1);
      });
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handledDone = () => {
    Promise.all([form1.validateFields(), form2.validateFields(), form3.validateFields()]).then(([values1, values2, values3]) => {
      const changedValues1 = getChangedValues(initialValues.firstForm, values1);
      const changedValues2 = getChangedValues(initialValues.secondForm, values2);
      const changedValues3 = getChangedValues(initialValues.thirdForm, values3);
      
      console.log('Changed Form 1 Values:', changedValues1);
      console.log('Changed Form 2 Values:', changedValues2);
      console.log('Changed Form 3 Values:', changedValues3);
      
      message.success("Processing complete!");
      setCurrent(0);
    });
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

export default CashForPurchase;
