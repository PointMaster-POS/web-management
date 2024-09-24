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
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import AddNewCategory from "../../components/Popups/AddNewCategory";


const { Title } = Typography;
const { confirm } = Modal;
const { Search } = Input;

const Category = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState([]);


  const fetchCategories = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await fetch("http://localhost:3001/category/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      setCategoryData(data);
    }
    catch (error) {
      console.error("Error fetching categories: ", error);
      message.error("An error occurred. Please try again later.");

    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  
 
  useEffect(() => {
    // Assuming data is fetched from the backend and formatted appropriately
    const formattedData = categoryData.map((item, index) => ({
      ...item,
      no: index + 1, // Simulating auto-increment for the 'No' field
      key: item.category_id, // Use category_id as key
      product_count: Math.floor(Math.random() * 100), // Simulating a product count
    }));
    setData(formattedData);
    setFilteredData(formattedData);
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleAddCategories = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      setIsModalVisible(false);
      const newCategories = {
        ...values,
        no: data.length + 1,
        key: `${data.length + 1}`,
      };
      const newData = [...data, newCategories];
      setData(newData);
      setFilteredData(newData);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleEdit = (record, newCategoryName) => {
    // Implement edit functionality
  };

  const handleDelete = (categoryName) => {
    confirm({
      title: `Are you sure you want to delete "${categoryName}"?`,
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
      const category_name = item.category_name.toLowerCase();
      const no = item.no.toString().toLowerCase();
      return exactMatch
        ? category_name === searchValue || no === searchValue
        : category_name.includes(searchValue) || no.includes(searchValue);
    });
    setFilteredData(filtered);
    setSearchText(value);
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: 100,
    },
    {
      title: "Category Name",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "No of Products",
      dataIndex: "product_count",
      key: "product_count",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space size="middle">
          <Tooltip title="Edit Category">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              style={{
                borderColor: "#1890ff",
                color: "#1890ff",
              }}
            />
          </Tooltip>
          <Tooltip title="Delete Category">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.no)}
              danger
            />
          </Tooltip>
        </Space>
      ),
    },
    {
      title: " ",
      key: "orders",
      render: (record) => (
        <Button >
          View Category
        </Button>
      ),
    },
  ];

  return (
    <Card style={{ margin: 30, padding: 30, borderRadius: "10px" }} bodyStyle={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Title level={3} style={{ marginBottom: 10 }}>
          Categories Data
        </Title>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Search
            placeholder="Search by No or Category Name"
            onSearch={(value) => handleSearch(value, true)}
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            style={{ marginRight: 16, width: 300 }}
          />
          <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
            Add New Category
          </Button>
        </div>
      </div>
      <hr color="#1890ff" />

      <Modal
        title="Add New Category"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <AddNewCategory form={form} onAddCategories={handleAddCategories} onCancel={handleCancel} />
      </Modal>

      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={{ pageSize: 7 }}
        locale={{ emptyText: "No categories available." }}
        style={{ marginTop: 20 }}
      />
    </Card>
  );
};

export default Category;
