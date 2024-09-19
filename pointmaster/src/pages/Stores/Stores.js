import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Switch,
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
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    fetchBranches();
  }, []);

  // Fetch all branches
  const fetchBranches = async () => {
    try {
      const response = await axios.get("http://localhost:3001/branch/");
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching branches:", error);
      message.error("Failed to fetch branches.");
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Add a new store/branch
  const handleAddStore = () => {
    form.validateFields().then(async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:3001/branch/",
          values
        );
        const newBranch = response.data;
        const newData = [...data, newBranch];
        setData(newData);
        setFilteredData(newData);
        message.success("Store added successfully.");
      } catch (error) {
        console.error("Error adding branch:", error);
        message.error("Failed to add store.");
      }
    });
  };

  // Edit an existing store/branch
  const handleEdit = async (record) => {
    form.setFieldsValue(record); // Prepopulate the form with the existing data
    showModal();

    form.validateFields().then(async (values) => {
      try {
        await axios.put(
          `http://localhost:3001/branch/${record.store_id}`,
          values
        );
        const updatedData = data.map((item) =>
          item.store_id === record.store_id ? { ...item, ...values } : item
        );
        setData(updatedData);
        setFilteredData(updatedData);
        setIsModalVisible(false);
        form.resetFields();
      } catch (error) {
        console.error("Error updating branch:", error);
      }
    });
  };

  // Delete a store/branch
  const handleDelete = (store_id, name) => {
    confirm({
      title: `Are you sure you want to delete "${name}"?`,
      icon: <ExclamationCircleOutlined />,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:3001/branch/${store_id}`);
          const updatedData = data.filter((item) => item.store_id !== store_id);
          setData(updatedData);
          setFilteredData(updatedData);
        } catch (error) {
          console.error("Error deleting branch:", error);
        }
      },
    });
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

  // Table columns definition
  const columns = [
    {
      title: "Branch ID",
      dataIndex: "branch_id",
      key: "branch_id",
    },
    {
      title: "Name",
      dataIndex: "branch_name",
      key: "branch_name",
    },
    {
      title: "Location",
      dataIndex: "branch_location",
      key: "branch_location",
    },
    // {
    //   title: "Manager",
    //   dataIndex: "manager",
    //   key: "manager",
    // },
    // {
    //   title: "Telephone",
    //   dataIndex: "telephone",
    //   key: "telephone",
    // },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space size="middle">
          <Tooltip title="Edit Store">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              style={{
                borderColor: "#1890ff",
                color: "#1890ff",
              }}
            />
          </Tooltip>
          <Tooltip title="Delete Store">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.store_id, record.name)}
              danger
            />
          </Tooltip>
        </Space>
      ),
    },

    {
      title: "",
      key: "",
      render: (record) => (
        <Button /* onClick={() => handleViewStore(record.store_id)} */>
          View Store
        </Button>
      ),
    },
  ];

  return (
    <Card
      style={{
        margin: 30,
        padding: 30,
        borderRadius: "10px",
      }}
      bodyStyle={{ padding: "20px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
        title="Add New Store"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <AddNewStore form={form} onAddStore={handleAddStore} onCancel={handleCancel} />
      </Modal>

      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={{ pageSize: 7 }}
        locale={{
          emptyText: "No stores available.",
        }}
        style={{ marginTop: 20 }}
      />
    </Card>
  );
};

export default Stores;
