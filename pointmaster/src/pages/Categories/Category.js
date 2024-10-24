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
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import AddNewCategory from "../../components/Popups/AddNewCategory";
import { useMenu } from "../../context/MenuContext";
import "../PagesStyles.css";
import baseUrl from "../../apiConfig";

const { Title } = Typography;
const { confirm } = Modal;
const { Search } = Input;

const Category = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();
  const { branchID, role } = useMenu();

  const fetchCategories = async () => {
    const token = localStorage.getItem("accessToken");
    console.log(role);
    console.log("branchID", token);
    if (!token) {
      message.error("Authorization token is missing. Please log in again.");

      return;
    }
    if (!branchID && role == "owner") {
    
      message.warning("Select a branch or create a branch to have categories.");
      return;
    }
  
    try {
      let url;
      // console.log("role", role);
      if (role === "owner") {
        console.log("************************************");
        url = `${baseUrl}:3001/category/owner/${branchID}`;
      } else if (role === "branch manager") {
        console.log("------------------------------------");
        url = `${baseUrl}:3001/category/manager`;
      }

      console.log("url", url);
      // console.log("url", url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const fetched_data = await response.json();
      setData(fetched_data);
      setFilteredData(fetched_data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      message.error("Failed to fetch categories.");
    }
  };

  const handleAddCategory = async (values) => {
    // console.log(values);
    const token = localStorage.getItem("accessToken");

    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}:3001/category`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // const newCategory = await response.json();
        message.success("Category added successfully");
        setIsModalVisible(false);
        form.resetFields();
        fetchCategories();
      } else {
        message.error("Failed to add category");
      }
    } catch (error) {
      console.error(error);
      message.error("Error occurred while adding category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [branchID]);

  const handleUpdateCategory = async (values) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `${baseUrl}:3001/category/${values.branch_id}/${editingCategory.category_id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        message.success("Category updated successfully");
        setIsModalVisible(false);
        form.resetFields();
        setEditingCategory(null);
        fetchCategories();
      } else {
        message.error("Failed to update category");
      }
    } catch (error) {
      console.error(error);
      message.error("Error occurred while updating category");
    }
  };

  const handleEdit = (record) => {
    setEditingCategory(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (category_id, category_name) => {
    confirm({
      title: "Are you sure you want to delete this category?",
      icon: <ExclamationCircleOutlined />,
      content: `This action will delete the category "${category_name}".`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const token = localStorage.getItem("accessToken");
          if (!token) {
            message.error(
              "Authorization token is missing. Please log in again."
            );
            return;
          }

          await fetch(
            `${baseUrl}:3001/category/${branchID}/${category_id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          fetchCategories();
          message.success("Category deleted successfully.");
        } catch (error) {
          console.error("Error deleting category:", error);
          message.error("Failed to delete category.");
        }
      },
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingCategory(null);
  };

  const handleSearch = (value, exactMatch = false) => {
    const searchValue = value.toLowerCase(); // normalize input to lower case and trim spaces
    const filtered = data.filter((item) => {
      const category_name = item.category_name.toLowerCase();
      const category_id = item.category_id.toString().toLowerCase();
  
      return exactMatch
        ? category_name === searchValue || category_id === searchValue
        : category_name.includes(searchValue) || category_id.includes(searchValue);
    });
  
    setFilteredData(filtered);
    setSearchText(value);
  };
  

  const columns = [
    {
      title: "Category ID",
      dataIndex: "category_id",
      key: "category_id",
    },
    {
      title: "Category Name",
      dataIndex: "category_name",
      key: "category_name",
    },
    // {
    //   title: "No of Products",
    //   dataIndex: "product_count",
    //   key: "product_count",
    // },
    {
      title: "Category Location",
      dataIndex: "category_location",
      key: "category_location",
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
              onClick={() =>
                handleDelete(record.category_id, record.category_name)
              }
              danger
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Card
      className="large-font"
      style={{ padding: 30, borderRadius: "10px" }}
      bodyStyle={{ padding: "20px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={2} style={{ marginBottom: 10 }}>
          Categories
        </Title>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Search
            placeholder="Search by Category ID or Category Name"
            onSearch={(value) => handleSearch(value, true)}
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            style={{ marginRight: 10, width: 300 }}
          />
          <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
            Add New Category
          </Button>
        </div>
      </div>
      <hr color="#1890ff" />

      <Modal
        title={editingCategory ? "Edit Category" : "Add New Category"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <AddNewCategory
          form={form}
          onAddCategory={
            editingCategory ? handleUpdateCategory : handleAddCategory
          }
          onCancel={handleCancel}
          initialValues={editingCategory || {}}
        />
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
