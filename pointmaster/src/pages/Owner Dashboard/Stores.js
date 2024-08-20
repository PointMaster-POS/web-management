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
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import NewStore from "./NewStore";
import { storesData } from "./Data";

const { Title } = Typography;
const { Search } = Input;

const Stores = () => {
  const [data, setData] = useState(storesData);
  const [filteredData, setFilteredData] = useState(data);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [formInstance, setFormInstance] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    if (formInstance) {
      formInstance.resetFields();
    }
    setIsModalVisible(false);
  };

  const handleAddStore = (newStore) => {
    const updatedData = [...data, newStore];
    setData(updatedData);
    setFilteredData(updatedData);
    setIsModalVisible(false);
  };

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
            onSearch={(value) => setSearchText(value)}
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
        <NewStore
          onAddStore={handleAddStore}
          onCancel={handleCancel}
          setFormInstance={setFormInstance}
        />
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
