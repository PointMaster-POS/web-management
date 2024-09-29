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

  // const handleAddProduct = () => {
  //   form.validateFields().then((values) => {
  //     console.log("Received values:", values);

  //     // Create new product object with the form values
  //     const newProduct = {
  //       ...values,
  //       product_id: `PROD${data.length + 123}`, // Simulate auto-increment for the product ID
  //     };
      
  //     // Send the POST request to the server
  //     axios
  //       .post("http://localhost:3001/items", newProduct, {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Set the authorization header with the token
  //         },
  //       })
  //       .then((response) => {
  //         // If the request is successful
  //         form.resetFields(); // Reset form fields
  //         setIsModalVisible(false); // Close the modal
          
  //         // Update UI with the new product
  //         const newData = [...data, { ...newProduct, key: `${data.length + 1}` }];
  //         setData(newData);
  //         setFilteredData(newData);
  
  //         notification.success({
  //           message: "Success",
  //           description: "Product added successfully!",
  //         });
  //       })
  //       .catch((error) => {
  //         // Handle error scenario
  //         notification.error({
  //           message: "Error",
  //           description: "Failed to add product. Please try again.",
  //         });
  //       });
  //   });
  // };

  const handleAddProduct = () => {
    form.validateFields().then((values) => {
      const token = localStorage.getItem("accessToken"); // Fetch token from local storage
  
      // Create new product object with mapped field names
      const newProduct = {
        category_id: values.category,  // This will send the selected category's ID
        item_name: values.product_name,
        minimum_stock: values.minimum_stock,
        barcode: values.barcode,
        stock: values.stock,
        price: values.selling_price,
        image_url: values.image_url || "",
        exp_date: values.exp_date,
        discount: values.discount || 0,
        supplier_name: values.supplier_name,
        supplier_contacts: values.supplier_contacts,
      };
  
      // Log the request payload to inspect the data being sent
      console.log("New Product:", newProduct);
  
      // Send the POST request to the server
      axios
        .post("http://localhost:3001/items", newProduct, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          form.resetFields(); 
          setIsModalVisible(false);
  
          const newData = [...data, { ...newProduct, key: `${data.length + 1}` }];
          setData(newData);
          setFilteredData(newData);
  
          notification.success({
            message: "Success",
            description: "Product added successfully!",
          });
        })
        .catch((error) => {
          console.error("Failed to add product:", error.response.data); // Log the error response
          notification.error({
            message: "Error",
            description: "Failed to add product. Please try again.",
          });
        });
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
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="product_name" label="Product Name" rules={[{ required: true, message: "Please enter a product name!" }]}>
            <Input placeholder="Enter product name" />
          </Form.Item>


          {/* Dropdown for Category */}
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select
              placeholder="Select category"
              onChange={handleCategoryChange}
              value={selectedCategory}
            >
              {categories.map((category) => (
                <Option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
          name="buying_price"
          label="Buying Price"
          rules={[{ required: true, message: "Please enter the buying price!" }]}
        >
          <Input  placeholder="Enter buying price" />
        </Form.Item>

        <Form.Item
          name="image_url"
          label="Image URL"
          rules={[{ required: true, message: "Please enter the image URL!" }]} // You can remove 'required' if it's optional
        >
          <Input placeholder="Enter image URL" />
        </Form.Item>


        <Form.Item
          name="selling_price"
          label="Selling Price"
          rules={[{ required: true, message: "Please enter the selling price!" }]}
        >
          <Input  placeholder="Enter selling price" />
        </Form.Item>

        <Form.Item
          name="stock"
          label="Stock"
          rules={[{ required: true, message: "Please enter the stock quantity!" }]}
        >
          <Input placeholder="Enter stock quantity" />
        </Form.Item>

        <Form.Item
          name="minimum_stock"
          label="Minimum Stock"
          rules={[{ required: true, message: "Please enter the minimum stock!" }]}
        >
          <Input placeholder="Enter minimum stock" />
        </Form.Item>

        <Form.Item
          name="discount"
          label="Discount (%)"
        >
          <Input  placeholder="Enter discount percentage" />
        </Form.Item>

        <Form.Item
          name="exp_date"
          label="Expiration Date"
          rules={[{ required: true, message: "Please enter the expiration date!" }]}
        >
          <Input type="date" />
        </Form.Item>

        <Form.Item
          name="supplier_name"
          label="Supplier Name"
          rules={[{ required: true, message: "Please enter the supplier name!" }]}
        >
          <Input placeholder="Enter supplier name" />
        </Form.Item>

        <Form.Item
          name="supplier_contacts"
          label="Supplier Contacts"
          rules={[{ required: true, message: "Please enter the supplier contacts!" }]}
        >
          <Input placeholder="Enter supplier contacts" />
        </Form.Item>

        <Form.Item
          name="barcode"
          label="Barcode"
          rules={[{ required: true, message: "Please enter the barcode!" }]}
        >
          <Input placeholder="Enter barcode" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </Modal>

    </Card>
  );
};

export default Products;
