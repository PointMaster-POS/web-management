import React, { useState, useEffect } from "react";
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
  Select,
  notification,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import axios from "axios";
import AddNewProduct from "../../components/Popups/AddNewProduct";
import { useMenu } from "../../context/MenuContext";

const { Title } = Typography;
const { confirm } = Modal;
const { Search } = Input;
const { Option } = Select;

const Products = () => {
  const { branchId, role } = useMenu(); 
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categories, setCategories] = useState([]); // State to hold categories
  const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const token = localStorage.getItem("accessToken"); // No need for JSON.parse
  console.log("Access Token:", token);


  useEffect(() => {
    const fetchCategories = async () => {
      if (!branchId) return; // Ensure branchId is available
      try {
        const response = await axios.get(`http://localhost:3001/category/owner/${branchId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the headers
          },
        });
        console.log("Categories fetched:", response.data); // Log fetched categories
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        notification.error({
          message: "Error",
          description: "Failed to load categories.",
        });
      }
    };
    fetchCategories();
  }, [branchId]);
  

  // Fetch products based on selected category
  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const response = await axios.get(`http://localhost:3001/items/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Products fetched for category:", response.data); // Log fetched products
      setFilteredData(response.data); // Assuming response data contains products of the selected category
    } catch (error) {
      console.error("Error fetching products by category:", error);
      notification.error({
        message: "Error",
        description: "Failed to load products for the selected category.",
      });
    } finally {
      setLoading(false);
    }
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

  const handleEdit = (product) => {
    form.setFieldsValue(product); // Set form fields with the product data
    setIsModalVisible(true); // Open the modal
  };
  
  const handleDelete = (productId) => {
    confirm({
      title: `Are you sure you want to delete this product?`,
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      centered: true,
      onOk: () => {
        const newData = data.filter(item => item.product_id !== productId);
        setData(newData);
        setFilteredData(newData);
        notification.success({
          message: "Success",
          description: "Product deleted successfully.",
        });
      },
    });
  };

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

  const columns = [
    {
      title: "Product ID",
      dataIndex: "product_id",
      key: "product_id",
    },
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
              <span style={{ color: "red" }}>{quantity}</span>
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
      title: "Supplier ID",
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
              onClick={() => handleDelete(record.product_name)}
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
        <Title level={3}>Products</Title>
        <Space>
          <Select
            style={{ width: 200 }}
            placeholder="Select Category"
            onChange={handleCategoryChange}
            value={selectedCategory}
            loading={loading}
          >
            {categories.map((category) => (
              <Option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </Option>
            ))}
          </Select>
          <Search
            placeholder="Search by Product Name"
            onSearch={handleSearch}
            enterButton
            style={{ width: 300 }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showModal}
            size="large"
          >
            Add New Product
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={sortedData}
        pagination={{
          pageSize: 6,
        }}
        rowKey="product_id"
        style={{ marginTop: "20px" }}
      />

      <Modal
        title="Add Product"
        open={isModalVisible}
        onOk={handleAddProduct}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
        centered
        destroyOnClose={true}
      >
        <AddNewProduct form={form} />
      </Modal>
    </Card>
  );
};

export default Products;