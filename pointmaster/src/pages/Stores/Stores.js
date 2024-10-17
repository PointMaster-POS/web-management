import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Modal,
  Table,
  Space,
  Typography,
  Tooltip,
  Input,
  Form,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import AddNewStore from "../../components/Popups/AddNewStore";
import { useMenu } from "../../context/MenuContext";

const { Title } = Typography;
const { confirm } = Modal;
const { Search } = Input;

const Stores = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStore, setEditingStore] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();
  const { branchID, role , onAddingBranch, setOnAddingBranch} = useMenu(); 


  const fetchBranches = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
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
      setData(data);
      setFilteredData(data);

      setOnAddingBranch(!onAddingBranch);
    } catch (error) {
      console.error("Error fetching branches:", error);
      message.error("Failed to fetch branches.");
    }
  };

  useEffect(() => {
    if (role === "owner") {
      fetchBranches();
    }
  }, []);

  const handleAddStore = async (values) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch("http://209.97.173.123:3001/branch/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const newBranch = await response.json();
        console.log("New Branch:", newBranch); // Check the structure of newBranch
        message.success("Branch added successfully");
        setIsModalVisible(false);
        form.resetFields();
        fetchBranches();
        setOnAddingBranch(!onAddingBranch);
      } else {
        message.error("Failed to add branch");
      }
    } catch (error) {
      console.error(error);
      message.error("Error occurred while adding branch");
    }
  };


  const handleUpdateStore = async (values) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `http://209.97.173.123:3001/branch/${editingStore.branch_id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        message.success("Branch updated successfully");
        setIsModalVisible(false);
        form.resetFields();
        setEditingStore(null);
        fetchBranches();
        setOnAddingBranch(!onAddingBranch);
      } else {
        message.error("Failed to update branch");
      }
    } catch (error) {
      console.error(error);
      message.error("Error occurred while updating branch");
    }
  };


  const handleEdit = (record) => {
    setEditingStore(record); // Set the store to be edited
    form.setFieldsValue(record); // Pre-fill the form with the selected store's data
    setIsModalVisible(true); // Open the modal for editing
  };


  const handleDelete = (branch_id, branch_name) => {
    confirm({
      title: "Are you sure you want to delete this store?",
      icon: <ExclamationCircleOutlined />,
      content: `This action will delete the store "${branch_name}".`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const token = localStorage.getItem("accessToken");
          if (!token) {
            message.error(
              "Authorization token is missing. Please log in again."
            );
            return;
          }

          await fetch(`http://209.97.173.123:3001/branch/${branch_id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          fetchBranches();
          setOnAddingBranch(!onAddingBranch);
          message.success("Store deleted successfully.");
        } catch (error) {
          console.error("Error deleting branch:", error);
          message.error("Failed to delete store.");
        }
      },
    });
  };


  const showModal = () => {
    setIsModalVisible(true);
  };


  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingStore(null); // Reset editing state
  };


  const handleSearch = (value, exactMatch = false) => {
    const filtered = data.filter((item) => {
      const branch_name = item.branch_name.toLowerCase();
      const searchValue = value.toLowerCase();

      return exactMatch
        ? branch_name === searchValue
        : branch_name.includes(searchValue);
    });
    setFilteredData(filtered);
    setSearchText(value);
  };


  const columns = [
    { title: "Branch ID", dataIndex: "branch_id", key: "branch_id" },
    { title: "Name", dataIndex: "branch_name", key: "branch_name" },
    { title: "Location", dataIndex: "branch_location", key: "branch_location" },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space size="middle">
          <Tooltip title="Edit Branch">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              style={{ borderColor: "#1890ff", color: "#1890ff" }}
            />
          </Tooltip>
          <Tooltip title="Delete Branch">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.branch_id, record.branch_name)}
              danger
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
  

  return (
    <Card
      className="large-font"
      style={{ padding: 30, borderRadius: "10px" }}
      bodyStyle={{ padding: "20px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={2} style={{ marginBottom: 10 }}>
          Stores
        </Title>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Search
            placeholder="Search Name"
            onSearch={(value) => handleSearch(value, true)}
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            style={{ marginRight: 10, width: 300 }}
          />
          <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
            Add New Branch
          </Button>
        </div>
      </div>
      <hr color="#1890ff" />

      <Modal
        title={editingStore ? "Edit Store" : "Add New Store"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <AddNewStore
          form={form}
          onAddStore={editingStore ? handleUpdateStore : handleAddStore}
          onCancel={handleCancel}
          initialValues={editingStore || {}}
        />
      </Modal>

      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={{ pageSize: 7 }}
        locale={{ emptyText: "No stores available." }}
        style={{ marginTop: 20 }}
      />
    </Card>
  );
};

export default Stores;
