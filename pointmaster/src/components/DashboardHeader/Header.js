import React, { useState, useEffect } from "react";
import {
  Space,
  Typography,
  Avatar,
  Badge,
  Menu,
  Dropdown,
  Select,
  message,
} from "antd";
import {
  BellFilled,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  ProfileOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useMenu } from "../../context/MenuContext";

// Mock branch data
// const branches = [
//   { id: "b1", name: "Main Branch" },
//   { id: "b2", name: "Secondary Branch" },
//   { id: "b3", name: "Warehouse" },
// ];

const Header = ({ setIsAuthenticated }) => {
  const { selectedMenu, role, branchID, setBranchID, onAddingBranch, decodeToken , decodedToken} =
    useMenu(); // Get selectedMenu from context
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(""); // Set default branch
  const [selectedBranchID, setSelectedBranchID] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleSettingClick = () => {
    navigate("/setting");
  };

  const handleLogOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  useEffect(() => {
    setBranchID(selectedBranchID);
  }, [selectedBranch]);

  const fetchBranches = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
    }
    decodeToken();
    if(decodedToken.employee) {
      setSelectedBranch(decodedToken.employee.employee_branch_id);
      return
    }
    try {
      const response = await fetch("http://209.97.173.123:3001/branch", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBranches(data);
      setSelectedBranchID(data[0].branch_id);
      setSelectedBranch(data[0].branch_name);
    } catch (error) {
      console.error("Error fetching branches:", error);
      message.warning("No stores available.");
    }
  };

  useEffect(() => {
    if (role === "owner") {
      fetchBranches();
    }
  }, [onAddingBranch]);

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

      {/* <Menu.Item
        key="2"
        icon={<SettingOutlined style={{ fontSize: "16px" }} />}
        onClick={handleSettingClick}
        style={{ fontWeight: "bold", fontSize: "16px" }}
      >
        Settings
      </Menu.Item> */}

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

  const handleBranchChange = (key, value) => {
    setSelectedBranch(value);
    // console.log("Selected Branch:", value.key);
    setSelectedBranchID(value.key);
  };

  // Determine if the dropdown should be visible based on the selectedMenu
  const showDropdown =
    selectedMenu === "/category" ||
    selectedMenu === "/products" ||
    selectedMenu === "/employees" ;
    //||
    //selectedMenu === "/dashboard";

  // Function to update the current time every second
  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    };

    updateCurrentTime(); // Initial call to set time immediately
    const intervalId = setInterval(updateCurrentTime, 1000);

    return () => clearInterval(intervalId); // Clear the interval on unmount
  }, []);

  return (
    <div className="header_">
      <Typography.Title level={2} style={{ marginLeft: "-6px" }}>
        PointMaster
      </Typography.Title>

      {/* <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#f0f2f5", // Subtle background color
            marginLeft: "-6px"
          }}
        >
          <img
            src="images/logo.png" // Add the correct path to your logo image here
            alt="Logo"
            style={{ height: "75px" }} // Adjust height as per your requirement
          />
        </div> */}

      <Space size="large">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#f0f2f5", // Subtle background color
            borderRadius: "8px",
            padding: "10px 15px",
            // boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            marginRight: "15px",
          }}
        >
          <ClockCircleOutlined
            style={{ marginRight: "8px", fontSize: "18px", color: "#1890ff" }}
          />{" "}
          {/* Clock Icon */}
          <Typography.Text
            style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}
          >
            {currentTime}
          </Typography.Text>
        </div>

        {showDropdown && role === "owner" && (
          <Select
            value={selectedBranch}
            onChange={handleBranchChange}
            style={{ width: 200, size: "large", marginRight: "15px" }}
          >
            {branches?.map((branch) => (
              <Select.Option key={branch.branch_id} value={branch.branch_name}>
                {branch.name}
              </Select.Option>
            ))}
          </Select>
        )}

        <Dropdown overlay={menu} trigger={["click"]}>
          <Badge dot style={{ marginRight: "15px" }}>
            <Avatar
              icon={<UserOutlined />}
              style={{
                cursor: "pointer",
                backgroundColor: "rgba(0,0,0,0.88)",
                marginRight: "20px",
              }}
            />
          </Badge>
        </Dropdown>
      </Space>
    </div>
  );
};

export default Header;

