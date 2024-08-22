import React, { useState } from "react";
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
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ShopOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import AddNewStore from "./AddNewStore";
import { storesData } from "./Data";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const { Title } = Typography;
const { confirm } = Modal;
const { Search } = Input;

const Stores = () => {
  const [data, setData] = useState(storesData);
  const [filteredData, setFilteredData] = useState(data);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();
  //const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleAddStore = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      setIsModalVisible(false);
      const newStore = {
        ...values,
        /* supplier_id: `SUP${data.length + 123}`, // Simulate auto-increment
        key: `${data.length + 1}`, */
      };
      const newData = [...data, newStore];
      setData(newData);
      setFilteredData(newData);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleViewStore = (supplier_id) => {
    // navigate(`/phistory/${supplier_id}`);
  };


  const handleEdit = (values) => {
    /* const newData = data.map((item) =>
      item.supplier_id === values.supplier_id ? { ...item, ...values } : item
    );
    setData(newData);
    setFilteredData(newData); */
  };

  const handleDelete = (name) => {
    confirm({
      title: `Are you sure you want to delete "${name}"?`,
      icon: <ExclamationCircleOutlined />,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
    });
  };

  const handleSearch = (value, exactMatch = false) => {
    const filtered = data.filter((item) => {
      const name = item.name.toLowerCase();
      const searchValue = value.toLowerCase();

      return exactMatch ? name === searchValue : name.includes(searchValue);
    });
    setFilteredData(filtered);
    setSearchText(value);
  };

  // Table columns definition
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Manager",
      dataIndex: "manager",
      key: "manager",
    },
    {
      title: "Telephone",
      dataIndex: "telephone",
      key: "telephone",
    },
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
              onClick={() => handleDelete(record.name)}
              danger
            />
          </Tooltip>
          <Tooltip title="View Store">
            <Button
              icon={<ShopOutlined />}
              onClick={() => handleViewStore(record)}
              style={{
                borderColor: "rgb(0,0,0,0.88)",
                color: "rgb(0,0,0,0.88)",
              }}
            />
          </Tooltip>
        </Space>
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
