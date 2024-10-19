import React, { useState } from "react";
import "./LogIn.css";
import { Form, Input, Button, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../apiConfig";

export default function LogIn({ forgotPassword = false }) {
  const [messageApi, contextHolder] = message.useMessage();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);

    const url = `${baseUrl}:3002/employee/login`;
    axios
      .post(url, {
        email: values.username,
        password: values.password,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("accessToken", response.data.accessToken);
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="login-wrapper">
       <div className="overlay"></div>
      <div className="login-background"></div>
      <div className="login-form-container">
        {contextHolder}
        <div className="login-form">
          <h1 className="login-title">Log In</h1>
          <Form name="login" onFinish={onFinish} layout="vertical">
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-button"
                loading={loading}
                block
              >
                Log In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
