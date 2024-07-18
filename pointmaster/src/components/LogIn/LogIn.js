import React, { useState } from "react";
import "./LogIn.css";
import { Form, Input, Button, Checkbox, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

const LogIn = () => {
  const success = () => {};
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    try {
      const response = await fetch("http://localhost:5001/api/v2/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.username,
          password: values.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        localStorage.setItem("accessToken", data.token);
        localStorage.setItem("name", data.name);
        localStorage.setItem("role", data.role);
        console.log(response);
        // alert('login sucess');
        message.open({
          type: "success",
          content: "Login sucess",

          style: {
            marginTop: "2px",
          },
        });
      } else {
        message.open({
          type: "error",
          content: "Login failed",

          style: {
            marginTop: "2px",
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="image-section">
        <img src={`${process.env.PUBLIC_URL}/LogIn.png`} alt="Welcome" />
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
};

export default LogIn;
