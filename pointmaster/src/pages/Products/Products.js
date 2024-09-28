import React, { useState, useEffect, useRef } from "react";
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
  PrinterOutlined,
} from "@ant-design/icons";
import axios from "axios";
import AddNewProduct from "../../components/Popups/AddNewProduct";
import { useMenu } from "../../context/MenuContext";
import jsPDF from "jspdf"; // For generating PDFs
import html2canvas from "html2canvas"; // For capturing the barcode area
import JsBarcode from "jsbarcode"; // For generating barcodes

const { Title } = Typography;
const { confirm } = Modal;
const { Search } = Input;
const { Option } = Select;

const Products = () => {
  const { branchID } = useMenu();
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [selectedBarcode, setSelectedBarcode] = useState(null); // Store selected barcode


  const barcodeRef = useRef(); // Ref for capturing the barcode

  const showModal = () => {
    setIsModalVisible(true);
  };

  const token = localStorage.getItem("accessToken");

  // Fetch categories and select the first one by default
  useEffect(() => {
    const fetchCategories = async () => {
      if (!branchID) return; // Ensure branchId is available
      try {
        const response = await axios.get(`http://localhost:3001/category/owner/${branchID}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setCategories(response.data);
        // Set the first category as default
        if (response.data.length > 0) {
          const firstCategory = response.data[0].category_id;
          setSelectedCategory(firstCategory);
          handleCategoryChange(firstCategory); // Fetch products for the default category
        }
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Failed to load categories.",
        });
      }
    };
    fetchCategories();
  }, [branchID]);

  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/items/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to load products for the selected category.",
      });
    } finally {
      setLoading(false);
    }
  };

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
    form.setFieldsValue(product);
    setIsModalVisible(true);
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
        const newData = data.filter((item) => item.product_id !== productId);
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
      const product_id = item.product_id.toString().toLowerCase();
      const searchValue = value.toLowerCase();

      if (exactMatch) {
        return product_name === searchValue || product_id === searchValue;
      } else {
        return product_name.includes(searchValue) || product_id.includes(searchValue);
      }
    });

    setFilteredData(filtered);
    setSearchText(value);
  };

  // // Function to generate barcode PDF
  // const handlePrintBarcode = (record) => {
  //   html2canvas(barcodeRef.current).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF();
  //     pdf.addImage(imgData, "JPEG", 10, 10);
  //     pdf.save(`${record.barcode}.pdf`);
  //   });
  // };

  const handlePrintBarcode = (record) => {
    setSelectedBarcode(record.barcode); // Set the barcode to be generated

    // Wait for the barcode to render before capturing it
    setTimeout(() => {
      if (barcodeRef.current) {
        try {
          // Generate the barcode using JsBarcode
          JsBarcode(barcodeRef.current, String(record.barcode), {
            format: "CODE128",
            displayValue: true,
            width: 2,
            height: 50,
          });

          // Capture the barcode area and convert it to PDF
          html2canvas(barcodeRef.current)
            .then((canvas) => {
              const imgData = canvas.toDataURL("image/png");
              const pdf = new jsPDF();
              pdf.addImage(imgData, "JPEG", 10, 10, 150, 50); // Adjust the size as necessary
              pdf.save(`${record.barcode}.pdf`);
            })
            .catch((error) => {
              console.error("Error generating PDF:", error);
              notification.error({
                message: "Error",
                description: "Failed to generate the PDF. Please try again.",
              });
            });
        } catch (error) {
          console.error("Error rendering barcode:", error);
        }
      }
    }, 100); // Small delay to ensure barcode renders
  };
  
  
  
  


  // Adding index column to count rows
  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1, // Render row number starting from 1
    },
    { title: "Item Name", dataIndex: "item_name", key: "item_name" },
    {
      title: "Buying Price",
      dataIndex: "buying_price",
      key: "buying_price",
      render: (price) => `₹${price}`, // Format the price with currency
    },
    {
      title: "Selling Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `₹${price}`, // Price from backend as selling price
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (stock) => (
        <div>
          {stock < 20 ? (
            <Tooltip title="Low stock !">
              <span style={{ color: "red" }}>{stock}</span>
              <ExclamationCircleOutlined style={{ color: "red", marginLeft: 8 }} />
            </Tooltip>
          ) : (
            stock
          )}
        </div>
      ),
    },
    {
      title: "Minimum Stock",
      dataIndex: "minimum_stock",
      key: "minimum_stock",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount) => `${discount}%`, // Format the discount with a percentage sign
    },
    {
      title: "Expiration Date",
      dataIndex: "exp_date",
      key: "exp_date",
      render: (exp_date) => new Date(exp_date).toLocaleDateString(), // Format the date
    },
    { title: "Supplier Name", dataIndex: "supplier_name", key: "supplier_name" },
    { title: "Supplier Contacts", dataIndex: "supplier_contacts", key: "supplier_contacts" },
    { title: "Barcode", dataIndex: "barcode", key: "barcode" },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space size="middle">
          <Tooltip title="Edit Product">
            <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          </Tooltip>
          <Tooltip title="Delete Product">
            <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.item_id)} danger />
          </Tooltip>
          <Tooltip title="Print Barcode">
            <Button icon={<PrinterOutlined />} onClick={() => handlePrintBarcode(record)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Card style={{ margin: 30, padding: 30, borderRadius: "10px" }} bodyStyle={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Title level={3}>Products</Title>
        <Space>
          <Select
            style={{ width: 200 }}
            placeholder="Select Category"
            onChange={handleCategoryChange}
            value={selectedCategory} // Set the default category
            loading={loading}
          >
            {categories.map((category) => (
              <Option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </Option>
            ))}
          </Select>
          <Search placeholder="Search by Product Name" onSearch={handleSearch} enterButton style={{ width: 300 }} />
          <Button type="primary" icon={<PlusOutlined />} onClick={showModal} size="large">
            Add New Product
          </Button>
        </Space>
      </div>

      <Table columns={columns} dataSource={filteredData} rowKey="item_id" pagination={{ pageSize: 5 }} />

      {/* {selectedBarcode && (
        <div ref={barcodeRef} style={{ display: "none" }}>
          <p>Barcode: {selectedBarcode}</p>
        </div>
      )} */}

      {/* {selectedBarcode && (
        <svg ref={barcodeRef} style={{ display: "none" }}></svg>
      )} */}

      {selectedBarcode && (
        <div style={{ opacity: 0, position: "absolute", top: -1000, left: -1000 }}>
          <canvas ref={barcodeRef}></canvas>
        </div>
      )}
      
      {/* Modal for adding/editing products */}
      <Modal
        title="Add Product"
        visible={isModalVisible}
        onOk={handleAddProduct}
        onCancel={handleCancel}
        width={1000}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="product_name" label="Product Name" rules={[{ required: true, message: "Please enter a product name!" }]}>
            <Input placeholder="Enter product name" />
          </Form.Item>
          {/* Additional Form Fields */}
        </Form>
      </Modal>
    </Card>
  );
};

export default Products;
