import React, { useState } from "react";
import "./LogIn.css";
import { Form, Input, Button, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../apiConfig";

export default function LogIn() {
  const [messageApi, contextHolder] = message.useMessage();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const onFinishLogin = (values) => {
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
          navigate("/dashboard");
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

  const onFinishForgotPassword = (values) => {
    setLoading(true);

    const url = "http://209.97.173.123:3002/forgot-password/foget-password-business-owners";
    axios
      .post(url, {
        business_mail: values.email,
        birthday: values.birthday,
        newPassword: values.newPassword,
      })
      .then((response) => {
        if (response.status === 200) {
          messageApi.open({
            type: "success",
            content: "Password reset successful! Please log in.",
            duration: 5,
          });
          setIsForgotPassword(false);
        } else {
          messageApi.open({
            type: "error",
            content: "Password reset failed. Please try again.",
            duration: 5,
          });
        }
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
          content: "Something went wrong. Please try again later.",
          duration: 5,
        });
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
          <h1 className="login-title">{isForgotPassword ? "Reset Password" : "Log In"}</h1>

          {isForgotPassword ? (
            <Form name="forgotPassword" onFinish={onFinishForgotPassword} layout="vertical">
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Please input your business email!" }]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Business Email"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="birthday"
                rules={[{ required: true, message: "Please input your birthday!" }]}
              >
                <Input
                  prefix={<CalendarOutlined />}
                  placeholder="Owner's Birthday (YYYY-MM-DD)"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="newPassword"
                rules={[{ required: true, message: "Please input your new password!" }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="New Password"
                  size="large"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              <Form.Item
                name="confirmNewPassword"
                dependencies={['newPassword']}
                hasFeedback
                rules={[
                  { required: true, message: "Please confirm your new password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("The two passwords do not match!"));
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Confirm New Password"
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
                  Reset Password
                </Button>
              </Form.Item>
              <p className="toggle-text" onClick={() => setIsForgotPassword(false)}>
                Back to Log In
              </p>
            </Form>
          ) : (
            <Form name="login" onFinish={onFinishLogin} layout="vertical">
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
              <p className="toggle-text" onClick={() => setIsForgotPassword(true)}>
                Forgot Password?
              </p>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}
