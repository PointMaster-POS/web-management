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
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, ShopOutlined } from "@ant-design/icons";
import NewStore from "./NewStore";
import { storesData } from "./Data";

const { Title } = Typography;
const { Search } = Input;

const Stores = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = (values) => {
    console.log("Form submitted with values: ", values);
    handleOk();
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
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              style={{
                borderColor: "#1890ff",
                color: "#1890ff",
              }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
              danger
            />
          </Tooltip>
          <Tooltip title="View">
            <Button
              icon={<ShopOutlined />}
              onClick={() => handleView(record)}
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

  // Handlers for edit and delete actions
  const handleEdit = (record) => {
    console.log("Editing record: ", record);
    // Implement the logic to edit the store
  };

  const handleDelete = (record) => {
    console.log("Deleting record: ", record);
    // Implement the logic to delete the store
  };

  const handleView = (record) => {
    console.log('Viewing record: ', record);
    // Implement the logic to view the store details
  };

   // Filtered data based on search
   const filteredData = storesData.filter((item) =>
    searchText === "" || item.name.toLowerCase() === searchText.toLowerCase()
  );
  

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
        <Title level={1} style={{ margin: 0 }}>
          Stores Data
        </Title>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Search
            placeholder="Search stores"
            onSearch={(value) => setSearchText(value)}
            style={{ marginRight: 16, width: 300 }}
          />
          <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
            Add New Store
          </Button>
        </div>
      </div>

      <Modal
        title="Add New Store"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={ null }
      >
        <NewStore onFinish={handleFormSubmit} />
      </Modal>

      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={{ pageSize: 7 }}
        locale={{
          emptyText:
            "No stores available.",
        }}
        style={{ marginTop: 20 }}
      />
    </Card>
  );
};

export default Stores;
