import React, { useState } from "react";
import {
  Layout,
  Table,
  Space,
  Form,
  Input,
  Button,
  Modal,
  Input as AntdInput,
  Tooltip,
} from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import "./suppliers.css";
import { suppliersData } from "./Data";

const { Content } = Layout;
const { confirm } = Modal;
const { Search } = Input;

const Suppliers = () => {
  const [data, setData] = useState(suppliersData);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleViewOrders = (supplier_id) => {
    navigate(`/phistory/${supplier_id}`);
  };

  const handleEdit = (values) => {
    const newData = data.map((item) =>
      item.supplier_id === values.supplier_id ? { ...item, ...values } : item
    );
    setData(newData);
    setFilteredData(newData);
  };

  const handleDelete = (supplierName) => {
    confirm({
      title: `Are you sure you want to delete "${supplierName}"?`,
      icon: <ExclamationCircleOutlined />,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
    });
  };

  const handleSearch = (value) => {
    const filtered = data.filter(
      (item) =>
        item.supplier_id.toLowerCase().includes(value.toLowerCase()) ||
        item.supplier_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
    setSearchText(value);
  };

  const columns = [
    {
      title: "Supplier ID",
      dataIndex: "supplier_id",
      key: "supplier_id",
    },
    {
      title: "Supplier Name",
      dataIndex: "supplier_name",
      key: "supplier_name",
    },
    {
      title: "Contact Person",
      dataIndex: "contact_person",
      key: "contact_person",
    },
    {
      title: "Contact Number",
      dataIndex: "contact_number",
      key: "contact_number",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Bank Details",
      dataIndex: "bank_details",
      key: "bank_details",
    },
    {
      title: "Orders",
      key: "orders",
      render: (record) => (
        <Button
          className="view-order-btn"
          onClick={() => handleViewOrders(record.supplier_id)}
        >
          View Orders
        </Button>
      ),
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
        </Space>
      ),
    },
  ];

  /* const paginationConfig = {
    pageSize: 13,
    hideOnSinglePage: true, 
  }; */

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalSave = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      setIsModalVisible(false);
      const newSupplier = {
        ...values,
        supplier_id: `SUP${data.length + 123}`, // Simulate auto-increment
        key: `${data.length + 1}`,
      };
      const newData = [...data, newSupplier];
      setData(newData);
      setFilteredData(newData);
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <Content className="content">
      <div className="sup-box">
        <div className="header">
          <h2>SUPPLIERS</h2>
          <Space className="header-right-end">
            <Search
              className="search-bar"
              placeholder="Search by Supplier ID or Supplier Name"
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              value={searchText}
            />
            <Button
              className="addsup-btn"
              type="primary"
              onClick={showModal}
            >
              Add Suppliers
            </Button>
          </Space>
        </div>
        <hr />
      </div>
      <Modal
        title="Add Supplier"
        visible={isModalVisible}
        onOk={handleModalSave}
        onCancel={handleModalCancel}
        centered
        width={800}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button
          className="save-btn"
          key="save"
          type="primary"
          onClick={handleModalSave}
          >
            Save
          </Button>,
        ]}
      ></Modal>

        <Table
          className="sup-table"
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 7 }}
          locale={{
            emptyText:
              "No data available.",
          }}
          style={{ marginTop: 20 }}
        />
    </Content>
  );
};

export default Suppliers;
