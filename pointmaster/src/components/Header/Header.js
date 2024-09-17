import React from "react";
import {
  Space,
  Typography,
  Avatar,
  Popover,
  List,
  Badge,
  Menu,
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

  const menu = (
    <Menu
      style={{
        width: "250px",
        padding: "10px 10px",
        // height: "150px"
      }}
    >
      <Menu.Item
        key="1"
        icon={<ProfileOutlined style={{ fontSize: "16px" }} />}
        onClick={handleProfileClick}
        style={{ fontWeight: "bold", fontSize: "16px" }}
      >
        Profile
      </Menu.Item>

      <Menu.Item
        key="2"
        icon={<SettingOutlined style={{ fontSize: "16px" }} />}
        onClick={() => console.log("Go to Settings")}
        style={{ fontWeight: "bold", fontSize: "16px" }}
      >
        Settings
      </Menu.Item>

      <Menu.Item
        key="3"
        icon={<LogoutOutlined style={{ fontSize: "16px" }} />}
        onClick={handleLogOut}
        style={{ fontWeight: "bold", fontSize: "16px" }}
      >
        Log Out
      </Menu.Item>
    </Menu>
  );

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
      <Typography.Title level={2} /* style={{ margin: 0 }} */>
        Welcome to Point Master
      </Typography.Title>
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
        <Dropdown overlay={menu} trigger={["click"]}>
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
