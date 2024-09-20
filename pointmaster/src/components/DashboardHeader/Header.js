import React from "react";
import {
  Space,
  Typography,
  Avatar,
  Popover,
  List,
  Badge,
  Dropdown,
} from "antd";
import {
  BellFilled,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { notifications } from "../Data";

const Header = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogOut = () => {
    setIsAuthenticated(false);
  };

  // Custom styles for menu items
  const menuItemStyle = {
    fontWeight: "bold",
    fontSize: "16px",
    padding: "10px 20px",
  };

  // Menu items array with inline styles
  const menuItems = [
    {
      label: "Profile",
      key: "1",
      icon: <ProfileOutlined style={{ fontSize: "16px" }} />,
      onClick: handleProfileClick,
      style: menuItemStyle, // Apply custom styles to individual items
    },
    {
      label: "Settings",
      key: "2",
      icon: <SettingOutlined style={{ fontSize: "16px" }} />,
      onClick: () => console.log("Go to Settings"),
      style: menuItemStyle,
    },
    {
      label: "Log Out",
      key: "3",
      icon: <LogoutOutlined style={{ fontSize: "16px" }} />,
      onClick: handleLogOut,
      style: menuItemStyle,
    },
  ];

  const notificationContent = (
    <List
      itemLayout="horizontal"
      dataSource={notifications}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={<Typography.Text strong>{item.title}</Typography.Text>}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );

  return (
    <div className="header_">
      <Typography.Title level={2}>Welcome to Point Master</Typography.Title>
      <Space size="large">
        <Popover
          content={notificationContent}
          title="Notifications"
          trigger="click"
          overlayStyle={{ width: "400px" }}
        >
          <Badge count={notifications.length} overflowCount={99}>
            <BellFilled style={{ fontSize: 30, cursor: "pointer" }} />
          </Badge>
        </Popover>
        {/* Dropdown with custom styles */}
        <Dropdown
          menu={{
            items: menuItems.map((item) => ({
              ...item,
              style: { ...menuItemStyle, ...item.style }, // Apply styles to each item
            })),
          }}
          trigger={["click"]}
          overlayStyle={{
            width: "250px", // Dropdown width
            padding: "10px", // Dropdown padding
            borderRadius: "8px", // Rounded corners
            backgroundColor: "#f9f9f9", // Light background color
          }}
        >
          <Badge dot>
            <Avatar
              icon={<UserOutlined />}
              style={{
                cursor: "pointer",
                backgroundColor: "rgba(0,0,0,0.88)",
                marginLeft: 15,
              }}
            />
          </Badge>
        </Dropdown>
      </Space>
    </div>
  );
};

export default Header;
