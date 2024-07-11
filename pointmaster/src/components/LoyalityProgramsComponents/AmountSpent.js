import React, { useState } from "react";
import {
  Button,
  message,
  Steps,
  theme,
  Form,
  Input,
 
  DatePicker,
} from "antd";

const AmountSpent = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  
  

  const FirstForm = () => {
    const { RangePicker } = DatePicker;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 6,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 14,
        },
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
          variant="filled"
          style={{
            maxWidth: 600,
            margin: "auto",
          }}
        >
          <Form.Item
            label="Program Name"
            name="Input"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input 
                
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="TextArea"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Select Valid Period"
            name="RangePicker"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <RangePicker />
          </Form.Item>
        </Form>
      </div>
    );
  };

  const SecondForm = () => {
    const { RangePicker } = DatePicker;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 6,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 14,
        },
      },
    }
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
          variant="filled"
          style={{
            maxWidth: 600,
            margin: "auto",
          }}
        >
          <Form.Item
            label="Program Name"
            name="Input"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input 
                
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="TextArea"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Select Valid Period"
            name="RangePicker"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <RangePicker />
          </Form.Item>
        </Form>
        
      </div>
    );
  };

  const ThirdForm = () => {
    return (
      <div>
        <h1>Third Form</h1>
      </div>
    );
  };

  const steps = [
    {
      title: "Program Details Form",
      content: <FirstForm />,
    },
    {
      title: "Rewards Setup Form",
      content: <SecondForm />,
    },
    {
      title: "Customer Engagement Form",
      content: <ThirdForm />,
    },
  ];
  const next = () => {
    
   
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
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

  const handledDone = () => {
    message.success("Processing complete!");
    setCurrent(0);
  };
  return (
    <Form.Provider>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={handledDone}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </Form.Provider>
  );
};

export default AmountSpent;
