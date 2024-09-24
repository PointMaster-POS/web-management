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

const { Title } = Typography;
const { confirm } = Modal;
const { Search } = Input;

const Stores = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStore, setEditingStore] = useState(null); // For editing the store
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();

  const handleEdit = (record) => {
    setEditingStore(record); // Set the store to be edited
    form.setFieldsValue(record); // Pre-fill the form with the selected store's data
    setIsModalVisible(true); // Open the modal for editing
  };
  const handleAddStore = async (values) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
    }
    

    try {
      const response = await fetch("http://localhost:3001/branch/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newBranch = await response.json();
      const newData = [...data, newBranch];
      setData(newData);
      setFilteredData(newData);
      message.success("Store added successfully.");
      handleCancel();
    } catch (error) {
      console.error("Error adding branch:", error);
      message.error("Failed to add store.");
    }
  };

  

  // Handle Update Store
  const handleUpdateStore = async (values) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/branch/${editingStore.branch_id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedBranch = await response.json();
      const newData = data.map((branch) =>
        branch.branch_id === editingStore.branch_id ? updatedBranch : branch
      );
      setData(newData);
      setFilteredData(newData);
      message.success("Store updated successfully.");
      handleCancel(); // Close the modal after updating the store
    } catch (error) {
      console.error("Error updating branch:", error);
      message.error("Failed to update store.");
    }
  };


  const fetchBranches = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
    }
    


    try {
      const response = await fetch("http://localhost:3001/branch", {
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
    } catch (error) {
      console.error("Error fetching branches:", error);
      message.error("Failed to fetch branches.");
    }
  };

    // Fetch branches when component loads
    useEffect(() => {
      fetchBranches();
    }, [handleUpdateStore,handleAddStore]);
  

  // Handle Add New Store
  
  // Handle Delete Store
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
            message.error("Authorization token is missing. Please log in again.");
            return;
          }

          await fetch(`http://localhost:3001/branch/${branch_id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const newData = data.filter((branch) => branch.branch_id !== branch_id);
          setData(newData);
          setFilteredData(newData);
          message.success("Store deleted successfully.");
        } catch (error) {
          console.error("Error deleting branch:", error);
          message.error("Failed to delete store.");
        }
      },
    });
  };

  // Handle Edit Store
  

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

      return exactMatch ? branch_name === searchValue : branch_name.includes(searchValue);
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
          <Tooltip title="Edit Store">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              style={{ borderColor: "#1890ff", color: "#1890ff" }}
            />
          </Tooltip>
          <Tooltip title="Delete Store">
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
    <Card style={{ margin: 30, padding: 30, borderRadius: "10px" }} bodyStyle={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Title level={3} style={{ marginBottom: 10 }}>
          Stores Data
        </Title>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Search
            placeholder="Search stores"
            onSearch={(value) => handleSearch(value, true)}
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            style={{ marginRight: 16, width: 300 }}
          />
          <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
            Add New Store
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
