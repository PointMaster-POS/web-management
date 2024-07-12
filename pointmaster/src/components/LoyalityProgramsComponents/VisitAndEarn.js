import React, { useState } from "react";
import {
  Button,
  message,
  Steps,
  theme,
  Form,
  Input,
  Divider,
    InputNumber,
 Cascader,
  DatePicker,
} from "antd";

const { SHOW_CHILD } = Cascader;
const options = [
  {
    label: 'Light',
    value: 'light',
    children: new Array(20).fill(null).map((_, index) => ({
      label: `Number ${index}`,
      value: index,
    })),
  },
  {
    label: 'Bamboo',
    value: 'bamboo',
    children: [
      {
        label: 'Little',
        value: 'little',
        children: [
          {
            label: 'Toy Fish',
            value: 'fish',
          },
          {
            label: 'Toy Cards',
            value: 'cards',
          },
          {
            label: 'Toy Bird',
            value: 'bird',
          },
        ],
      },
    ],
  },
];

const VisitAndEarn = () => {
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
            <Input />
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
            <Input.TextArea
            
             />
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
            <RangePicker
              

             />
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
          <Divider orientation="left" orientationMargin="0">
            Rewards Rate Setup
    </Divider>

          <Form.Item
            label="Points per Visit"
            name="Points"
            rules={[
              {
                required: true,
                message: "Please enter the ",
              },
            ]}
          >
            <InputNumber min={1} max={10} defaultValue={4} />
          </Form.Item>
          <Divider orientation="left" orientationMargin="0">
            Select Valid Period
    </Divider>

            <Form.Item 
            label="Period in Months"
            name="Period"
            rules={[
                {
                    required: true,
                    message: "Please input!",
                },
            ]}
            
            >

<InputNumber min={1} max={24} defaultValue={3} />
          </Form.Item>
          <Divider orientation="left" orientationMargin="0">
            Minimum Number of Points to Redeem
    </Divider>

            <Form.Item 
            label="Minimum Points"
            name="Minimum Points"
            rules={[
                {
                    required: true,
                    message: "Please input!",
                },
            ]}
            >

<InputNumber  defaultValue={100} />
          </Form.Item>
        </Form>
        
        
      </div>
    );
  };

  const ThirdForm = () => {
    const onChange = (value) => {
        console.log(value);
      };
    return (
      <>
        <Cascader
        style={{
          width: '100%',
        }}
        options={options}
        onChange={onChange}
        multiple
        maxTagCount="responsive"
        showCheckedStrategy={SHOW_CHILD}
        defaultValue={[
          ['bamboo', 'little', 'fish'],
          ['bamboo', 'little', 'cards'],
          ['bamboo', 'little', 'bird'],
        ]}
      />
        </>
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
      title: "Rewaded Items Form",
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

export default VisitAndEarn;
