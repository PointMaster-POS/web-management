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
} from "@ant-design/icons";
import { categoriesData } from "../../components/Data";
import AddNewCategory from "../../components/Popups/AddNewCategory";

const { Title } = Typography;
const { confirm } = Modal;
const { Search } = Input;


const Category = () => {
  const [data, setData] = useState(categoriesData);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);

  };

  const handleViewCategory = (no) => {
    // navigate(`/phistory/${supplier_id}`);
  };

  const handleAddCategories = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      setIsModalVisible(false);
      const newCategories = {
        ...values,
        no: `SUP${data.length + 123}`, // Simulate auto-increment
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
    /* const newData = data.map((item) =>
      item.key === record.key
        ? { ...item, categoryName: newCategoryName }
        : item
    );
    setData(newData);
    setFilteredData(newData); */
  };

  /* const showEditModal = (record) => {
    let categoryName = record.categoryName;

    Modal.info({
      title: "Edit Category",
      content: (
        <Form>
          <Form.Item label="Category Name">
            <Input
              defaultValue={categoryName}
              onChange={(e) => (categoryName = e.target.value)}
            />
          </Form.Item>
        </Form>
      ),
      onOk() {
        handleEdit(record, categoryName);
      },
      okText: "Save",
      cancelText: "Cancel",
      footer: (
        <div className="custom-modal-footer">
          <Button
            onClick={() => Modal.destroyAll()}
            className="custom-cancel-btn"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={() => handleEdit(record, categoryName)}
            className="custom-save-btn"
          >
            Save
          </Button>
        </div>
      ),
    });
  }; */

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
      const no = item.no.toString().toLowerCase(); // Convert no to string for comparison
  
      if (exactMatch) {
        return category_name === searchValue || no === searchValue;
      } else {
        return category_name.includes(searchValue) || no.includes(searchValue);
      }
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
          {/* <Tooltip title="View Category">
            <Button
              icon={<ShoppingOutlined />}
              onClick={() => handleViewProducts(record.category_name)}
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
      title: " ",
      key: "orders",
      render: (record) => (
        <Button
          onClick={() => handleViewCategory(record.no)}
        >
          View Category
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
        locale={{
          emptyText: "No stores available.",
        }}
        style={{ marginTop: 20 }}
      />
    </Card>
  );
};

export default Category;
