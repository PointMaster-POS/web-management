import React, { useState } from "react";
import "./LogIn.css";
import ForgotPassword from "./ForgotPassword"; // Import ForgotPassword here
import { Form, Input, Button, Checkbox, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LogIn({ forgotPassword = false }) { // Added forgotPassword prop
  const [messageApi, contextHolder] = message.useMessage();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    // console.log("Success:", values);
    setLoading(true);

    // Call API to check if the password is correct
    const url = "http://localhost:3002/employee/login";
    axios
      .post(url, {
        email: values.username,
        password: values.password,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("accessToken", response.data);
          if (!isAuthenticated) {
            setIsAuthenticated(true);
            navigate("/dashboard");
          }
        } else {
          messageApi.open({
            type: "error",
            content: "Entered password is incorrect",
            duration: 5,
          });
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          messageApi.open({
            type: "error",
            content: "Invalid credentials. Please try again.",
            duration: 5,
          });
        } else {
          messageApi.open({
            type: "error",
            content: "Something went wrong. Please try again later.",
            duration: 5,
          });
        }
        // console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="login-container">
      {contextHolder}
      <div className="image-section">
        <img src={`${process.env.PUBLIC_URL}images/LogIn.png`} alt="Welcome" />
      </div>
      <div className="form-section">
        {forgotPassword ? (
          <ForgotPassword />
        ) : (
          <>
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
                  loading={loading}
                >
                  Log In
                </Button>
              </Form.Item>

              <div className="remember-forgot">
                <Checkbox className="remember-me-checkbox">Remember me</Checkbox>
                <a className="login-form-forgot" href="/forgot-password">
                  Forgot password
                </a>
              </div>

              <div className="register-link">
                <p>
                  Don't have an account? <a href="#">Register</a>
                </p>
              </div>
            </Form>
          </>
        )}
      </div>
    </div>
  );
}
