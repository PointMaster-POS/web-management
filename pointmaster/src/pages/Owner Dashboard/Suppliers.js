import React, { useState } from "react";
import {
  Table,
  Space,
  Form,
  Input,
  Button,
  Modal,
  Tooltip,
  Card,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
//import "./suppliers.css";
import { suppliersData } from "./Data";

const { Title } = Typography;
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


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
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

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
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
          Suppliers Data
        </Title>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Search
           placeholder="Search by Supplier ID or Supplier Name"
           onSearch={handleSearch}
           onChange={(e) => handleSearch(e.target.value)}
           value={searchText}
           style={{ marginRight: 16, width: 300 }}
          />
          <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
            Add New Supplier
          </Button>
        </div>
      </div>
      <hr color="#1890ff"/>

      <Modal
        title="Add New Store"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={ null }
        centered
      >
        {/* <NewStore onFinish={handleFormSubmit} /> */}
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

export default Suppliers;

{/* <Form form={form} layout="vertical" name="add_supplier_form">
<Form.Item
  name="supplier_name"
  label="Supplier Name"
  rules={[{ required: true, message: 'Please input the supplier name!' }]}
>
  <AntdInput />
</Form.Item>
<Form.Item
  name="contact_person"
  label="Contact Person"
  rules={[{ required: true, message: 'Please input the contact person!' }]}
>
  <AntdInput />
</Form.Item>
<Form.Item
  name="contact_number"
  label="Contact Number"
  rules={[{ required: true, message: 'Please input the contact number!' }]}
>
  <AntdInput />
</Form.Item>
<Form.Item
  name="email"
  label="Email Address"
  rules={[{ required: true, message: 'Please input the email address!' }]}
>
  <AntdInput />
</Form.Item>
<Form.Item
  name="address"
  label="Address"
  rules={[{ required: true, message: 'Please input the address!' }]}
>
  <AntdInput />
</Form.Item>
<Form.Item
  name="bank_details"
  label="Bank Details"
  rules={[{ required: true, message: 'Please input the bank details!' }]}
>
  <AntdInput />
</Form.Item>
</Form> */}