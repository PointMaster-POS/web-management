import React, { useState } from "react";
import "./LogIn.css";
import { Form, Input, Button, Checkbox, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

export default function LogIn({ isAuthenticated, setIsAuthenticated }) {
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values) => {
    console.log("Success:", values);

    if (values.password === "pass") {
      if (!isAuthenticated) {
        setIsAuthenticated(true);
      }
    } else {
      messageApi.open({
        type: "error",
        content: "Entered password is incorrect",
        duration: 5,
      });
    }
  };

  return (
    <div className="login-container">
      {contextHolder}
      <div className="image-section">
        <img src={`${process.env.PUBLIC_URL}images/LogIn.png`} alt="Welcome" />
      </div>
      <div className="form-section">
        <h1>
          Welcome Back! <br />
          Login to your account
        </h1>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log In
            </Button>
          </Form.Item>

          <div className="remember-forgot">
            <Checkbox className="remember-me-checkbox">Remember me</Checkbox>
            <a className="login-form-forgot" href="#">
              Forgot password
            </a>
          </div>

          <div className="register-link">
            <p>
              Don't have an account? <a href="#">Register</a>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}
