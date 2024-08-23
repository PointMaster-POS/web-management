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
  Avatar,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
// import { useNavigate } from 'react-router-dom';
import AddNewProduct from "./AddNewProduct";
import { productsData } from "./Data";

const { Title } = Typography;
const { confirm } = Modal;
const { Search } = Input;

const Products = () => {
  const [data, setData] = useState(productsData);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(productsData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const navigate = useNavigate();
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const sortedData = [...filteredData].sort((a, b) => a.quantity - b.quantity);

  const handleAddProduct = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      setIsModalVisible(false);
      const newProduct = {
        ...values,
        product_id: `SUP${data.length + 123}`, // Simulate auto-increment
        key: `${data.length + 1}`,
      };
      const newData = [...data, newProduct]; 
      setData(newData);
      setFilteredData(newData);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  /* const handleViewOrders = (supplier_id) => {
    navigate(`/phistory/${supplier_id}`);
  }; */

  const handleEdit = (values) => {
    /* const newData = data.map((item) =>
      item.product_id === values.product_id ? { ...item, ...values } : item
    );
    setData(newData);
    setFilteredData(newData); */
  };
  const handleDelete = (ProductName) => {
    confirm({
      title: `Are you sure you want to delete "${ProductName}"?`,
      icon: <ExclamationCircleOutlined />,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
    });
  };

  /* const handleModalOk = () => {
    form.validateFields().then((values) => {
      console.log('Updated values:', values);
      setIsModalVisible(false);
      setEditingProduct(null);
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  }; */

  /* const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
  }; */

  const handleSearch = (value, exactMatch = false) => {
    
    const filtered = data.filter((item) => {
      const product_name = item.product_name.toLowerCase();
      const product_id = item.product_id.toString().toLowerCase(); // Convert product_id to string for comparison
      const searchValue = value.toLowerCase();


      if (exactMatch) {
        return product_name === searchValue || product_id === searchValue;
      } else {
        return (
          product_name.includes(searchValue) || product_id.includes(searchValue)
        );
      }
    });

    setFilteredData(filtered);
    setSearchText(value);
  };

  /* const navigateToAddProduct = () => {
    setAddBtnColor('success'); // Change the button color to green when clicked
    navigate('/addproduct');
    };
    */
  const columns = [
    {
      title: "",
      dataIndex: "photo_url",
      key: "photo_url",
      render: (image) => <Avatar src={image} size={50} />,
    },
    {
      title: "Product ID",
      dataIndex: "product_id",
      key: "product_id",
    },
    /*  {
      title: 'Order ID',
      dataIndex: 'order_id',
      key: 'order_id',
    }, */
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => (
        <div>
          {quantity < 100 ? (
            <Tooltip title="Low stock !">
              <span style={{ color: "red"/* , fontWeight: "bold"  */}}>
                {quantity}
              </span>
              <ExclamationCircleOutlined
                style={{ color: "red", marginLeft: 8 }}
              />
            </Tooltip>
          ) : (
            quantity
          )}
        </div>
      ),
    },
    {
      title: "Buying Price",
      dataIndex: "buying_price",
      key: "buying_price",
    },
    {
      title: "Selling Price",
      dataIndex: "selling_price",
      key: "selling_price",
    },
    {
      title: "Supplier ID", // New column for Supplier ID
      dataIndex: "supplier_id",
      key: "supplier_id",
    },
    {
      title: "Added Date",
      dataIndex: "added_date",
      key: "added_date",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space size="middle">
          <Tooltip title="Edit Product">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              style={{
                borderColor: "#1890ff",
                color: "#1890ff",
              }}
            />
          </Tooltip>
          <Tooltip title="Delete Product">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.supplier_name)}
              danger
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
          Products Data
        </Title>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Search
            placeholder="Search by Product ID or Product Name"
            onSearch={(value) => handleSearch(value, true)}
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            style={{ marginRight: 16, width: 300 }}
          />
          <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
            Add New Product
          </Button>
        </div>
      </div>
      <hr color="#1890ff" />

      <Modal
        title="Add New Product"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <AddNewProduct
          form={form}
          onAddProduct={handleAddProduct}
          onCancel={handleCancel}
        />
      </Modal>

      <Table
        dataSource={sortedData}
        columns={columns}
        pagination={{ pageSize: 5 }}
        locale={{
          emptyText: "No stores available.",
        }}
        style={{ marginTop: 20 }}
      />
    </Card>
  );
};

export default Products;
