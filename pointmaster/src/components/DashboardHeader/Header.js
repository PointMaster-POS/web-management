import React, { useState } from "react";
import {
  Space,
  Typography,
  Avatar,
  Badge,
  Menu,
  Dropdown,
  Select,
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
import { useMenu } from "../../context/MenuContext";

// Mock branch data
const branches = [
  { id: "b1", name: "Main Branch" },
  { id: "b2", name: "Secondary Branch" },
  { id: "b3", name: "Warehouse" },
];

const Header = ({ setIsAuthenticated }) => {
  const { selectedMenu } = useMenu(); // Get selectedMenu from context
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState(branches[0].id); // Set default branch

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

  const handleBranchChange = (value) => {
    setSelectedBranch(value);
    console.log("Selected Branch:", value);
  };

  // Determine if the dropdown should be visible based on the selectedMenu
  const showDropdown =
    selectedMenu === "/category" ||
    selectedMenu === "/products" ||
    selectedMenu === "/employees" ||
    selectedMenu === "/dashboard" ;

  return (
    <div className="header_">
      <Typography.Title level={2}>
        Welcome to Point Master
      </Typography.Title>
     
      <Space size="large">
        {/* Branch selection dropdown */}
        {showDropdown && 
        <Select
          value={selectedBranch}
          onChange={handleBranchChange}
          style={{ width: 200 }}
        >
          {branches.map((branch) => (
            <Select.Option key={branch.id} value={branch.id}>
              {branch.name}
            </Select.Option>
          ))}
        </Select>
        }

        {/* Conditionally render the Dropdown */}
        
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
