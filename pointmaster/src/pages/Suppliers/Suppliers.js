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
import AddNewSupplier from "../../components/Popups/AddNewSupplier";
import { suppliersData } from "../../components/Data";

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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleAddSupplier = () => {
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

  const handleViewOrder = (supplier_id) => {
    navigate(`/phistory/${supplier_id}`);
  };

  const handleEdit = (values) => {
    /* const newData = data.map((item) =>
      item.supplier_id === values.supplier_id ? { ...item, ...values } : item
    );
    setData(newData);
    setFilteredData(newData); */
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

  const handleSearch = (value, exactMatch = false) => {
    const searchValue = value.toLowerCase();
  
    const filtered = data.filter((item) => {
      const supplier_name = item.supplier_name.toLowerCase();
      const supplier_id = item.supplier_id.toString().toLowerCase(); // Convert supplier_id to string for comparison
  
      if (exactMatch) {
        return supplier_name === searchValue || supplier_id === searchValue;
      } else {
        return supplier_name.includes(searchValue) || supplier_id.includes(searchValue);
      }
    });
  
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
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space size="middle">
          <Tooltip title="Edit Supplier">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              style={{
                borderColor: "#1890ff",
                color: "#1890ff",
              }}
              />
          </Tooltip>
          <Tooltip title="Delete Supplier">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.supplier_name)}
              danger
              />
          </Tooltip>
          {/* <Tooltip title="View Orders">
            <Button
            icon={<ShoppingOutlined />}
            onClick={() => handleViewOrder(record.supplier_id)}
            style={{
              borderColor: "rgb(0,0,0,0.88)",
              color: "rgb(0,0,0,0.88)",
              }}
              />
              </Tooltip> */}
        </Space>
      ),
    },
    {
     title: "",
     key: "",
     render: (record) => (
       <Button
         onClick={() => handleViewOrder(record.supplier_id)}
       >
         View Orders
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
          Suppliers Data
        </Title>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Search
            placeholder="Search by Supplier ID or Supplier Name"
            onSearch={(value) => handleSearch(value, true)} 
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            style={{ marginRight: 16, width: 300 }}
          />
          <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
            Add New Supplier
          </Button>
        </div>
      </div>
      <hr color="#1890ff" />

      <Modal
        title="Add New Supplier"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <AddNewSupplier form={form} onAddSupplier={handleAddSupplier} onCancel={handleCancel} />
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

export default Suppliers;

