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
  Select,
  notification,
  message,
  Upload,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  PrinterOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useMenu } from "../../context/MenuContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import jsPDF from "jspdf"; // For generating PDFs
import html2canvas from "html2canvas"; // For capturing the barcode area
import JsBarcode from "jsbarcode"; // For generating barcodes
import { storage } from "../../firebase"; // Firebase storage instance
import ProductDetailsModal from "../../components/Popups/ProductDetailModel";
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
  const [selectedBarcode, setSelectedBarcode] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [productImageURL, setProductImageURL] = useState("");
  const [isViewProductModelVisible, setIsViewProductModelVisible] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isNewProduct, setIsNewProduct] = useState(true);
  const [selectedItemID, setSelectedItemID] = useState(null);

  const barcodeRef = useRef(); // Ref for capturing the barcode

  const showModal = () => {
    setIsModalVisible(true);
  };

  const token = localStorage.getItem("accessToken");

  const fetchCategories = async () => {
    if (!branchID) return; // Ensure branchId is available
    try {
      const response = await axios.get(
        `http://209.97.173.123:3001/category/owner/${branchID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

  useEffect(() => {
    fetchCategories();
  }, [branchID]);

  const fetchProducts = async (categoryId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://209.97.173.123:3001/items/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      message.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
    fetchProducts(categoryId);
  };

  const handleAddProduct = () => {
    form.validateFields().then(async (values) => {
      //upload image to firebase
      if (fileList.length > 0) {
        try {
          const imageUrl = await handleUpload(fileList[0]);
          //set image url to form values
          setProductImageURL(imageUrl);

          console.log("Image URL:", imageUrl);
        } catch {
          notification.error({
            message: "Error",
            description: "Failed to upload the image. Please try again.",
          });
        }
      } else {
        notification.error({
          message: "Error",
          description: "Please upload an image.",
        });
      }

      const token = localStorage.getItem("accessToken"); // Fetch token from local storage

      const newProduct = {
        category_id: values.category, // This will send the selected category's ID
        item_name: values.product_name,
        minimum_stock: values.minimum_stock,
        barcode: values.barcode,
        stock: values.stock,
        price: values.selling_price,
        buying_price: values.buying_price,
        image_url: productImageURL,
        exp_date: values.exp_date,
        discount: values.discount || 0,
        supplier_name: values.supplier_name,
        supplier_contacts: values.supplier_contacts,
      };

      // Log the request payload to inspect the data being sent
      console.log("New Product:", newProduct);

      // Send the POST request to the server
      axios
        .post("http://209.97.173.123:3001/items", newProduct, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          form.resetFields();
          setIsModalVisible(false);

          const newData = [
            ...data,
            { ...newProduct, key: `${data.length + 1}` },
          ];
          setData(newData);
          setFilteredData(newData);

          message.success("Product added successfully!");
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

  const handledEditProduct = (product) => {
    setIsModalVisible(true);
    console.log("Product:", product);

    form.setFieldsValue({
      product_name: product.item_name,
      category: product.category_id,
      buying_price: product.buying_price,
      selling_price: product.price,
      stock: product.stock,
      minimum_stock: product.minimum_stock,
      discount: product.discount,
      exp_date: product.exp_date,
      supplier_name: product.supplier_name,
      supplier_contacts: product.supplier_contacts,
      barcode: product.barcode,
    });
  };

  const handleEditAndSave = async (product) => {
    try {
      // Set form fields with the selected product's data
      console.log({ this_is_product: product });

      if (fileList.length > 0) {
        try {
          const imageUrl = await handleUpload(fileList[0]);
          //set image url to form values
          setProductImageURL(imageUrl);

          console.log("Image URL:", imageUrl);
        } catch {
          message.error("Failed to upload the image. Please try again.");
        }
      } else {
        message.error("Please upload an image.");
      }

      // Wait for the modal to close and the form to submit
      const values = await form.validateFields();

      console.log("Form values:", values);
      console.log("Product ID:", selectedItemID);

      // Make PUT request to update the product in the database
      const response = await axios.put(
        `http://209.97.173.123:3001/items/${selectedItemID}`,
        {
          category_id: values.category,
          item_name: values.product_name,
          minimum_stock: values.minimum_stock,
          barcode: values.barcode,
          stock: values.stock,
          price: values.selling_price,
          buying_price: values.buying_price,
          image_url: productImageURL,
          exp_date: values.exp_date,
          discount: values.discount || 0,
          supplier_name: values.supplier_name,
          supplier_contact: values.supplier_contact,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        message.success("Product updated successfully!");

        // Update your local data with the edited product details

        // Reset form and close modal
        form.resetFields();
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      message.error("Failed to update product. Please try again.");
    }
  };

  const deleteProduct = async (productId) => {
    const token = localStorage.getItem("accessToken");
    console.log("Product ID:", productId);
    console.log("Token:", token);
    try {
      const response = await axios.delete(
        `http://209.97.173.123:3001/items/${productId}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Product deleted successfully!");
        message.success("Product deleted successfully!");
        // fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Failed to delete product. Please try again.");
    }
  };

  const handleDelete = (productId) => {
    console.log("Product ID:", productId);
    confirm({
      title: `Are you sure you want to delete this product?`,
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      centered: true,
      onOk: () => {
        deleteProduct(productId);
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
        return (
          product_name.includes(searchValue) || product_id.includes(searchValue)
        );
      }
    });

    setFilteredData(filtered);
    setSearchText(value);
  };

  const handleUpload = async (file) => {
    try {
      const storageRef = ref(storage, `product-images/${file.name}`);
      await uploadBytes(storageRef, file);
      console.log("File uploaded successfully!");
      const logoURL = await getDownloadURL(storageRef);
      return logoURL;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error("File upload failed");
    }
  };

  // Handle file selection in the Upload component
  const handleFileChange = ({ fileList }) => {
    setFileList(fileList.map((file) => file.originFileObj));
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

  // Optional file validation before upload (e.g., check file type and size)
  const beforeUpload = (file) => {
    const isValidType = file.type === "image/jpeg" || file.type === "image/png";
    if (!isValidType) {
      message.error("You can only upload JPG/PNG files!");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2; // 2MB max file size
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return false;
    }
    return true;
  };

  // Function to handle image upload to Firebase
  const handleCancelModel = () => {
    setIsViewProductModelVisible(false);
    setSelectedProduct(null);
  };

  const columns = [
    {
      title: "Item ID",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1, // Render row number starting from 1
    },
    { title: "Item Name", dataIndex: "item_name", key: "item_name" },

    {
      title: "Selling Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `₹${price}`,
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
              <ExclamationCircleOutlined
                style={{ color: "red", marginLeft: 8 }}
              />
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
      title: "Expiration Date",
      dataIndex: "exp_date",
      key: "exp_date",
      render: (exp_date) => new Date(exp_date).toLocaleDateString(),
    },
    { title: "Barcode", dataIndex: "barcode", key: "barcode" },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space size="middle">
          <Tooltip title="Edit Product">
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                handledEditProduct(record);
                setSelectedItemID(record.item_id);
                setIsNewProduct(false);
              }}
            />
          </Tooltip>
          <Tooltip title="Delete Product">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.item_id)}
              danger
            />
          </Tooltip>
          <Tooltip title="Print Barcode">
            <Button
              icon={<PrinterOutlined />}
              onClick={() => handlePrintBarcode(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
    {
      title: "",
      key: "",
      render: (record) => (
        <Button
          onClick={() => {
            setSelectedProduct(record);
            setIsViewProductModelVisible(true);
          }}
        >
          View More
        </Button>
      ),
    },
  ];

  return (
    <Card
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
        <Title level={3} style={{ marginBottom: 10 }}>
          Products
        </Title>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Select
            style={{ width: 200, marginRight: 10 }}
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
          <Search
            placeholder="Search by Item ID or Item Name"
            onSearch={(value) => handleSearch(value, true)}
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            style={{ width: 300, marginRight: 10 }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              showModal();
              setIsNewProduct(true);
            }}
          >
            Add New Product
          </Button>
        </div>
      </div>
      <hr color="#1890ff" />

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="item_id"
        pagination={{ pageSize: 5 }}
        locale={{
          emptyText: "No items available.",
        }}
        style={{ marginTop: 20 }}
      />

      {selectedBarcode && (
        <div
          style={{ opacity: 0, position: "absolute", top: -1000, left: -1000 }}
        >
          <canvas ref={barcodeRef}></canvas>
        </div>
      )}

      {/* Modal for adding products */}
      <Modal
        title={isNewProduct ? "Add New Product" : "Edit Product"}
        visible={isModalVisible}
        onOk={
          isNewProduct
            ? handleAddProduct
            : () => handleEditAndSave(form.getFieldsValue())
        }
        onCancel={handleCancel}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="product_name"
            label="Product Name"
            rules={[
              { required: true, message: "Please enter a product name!" },
            ]}
          >
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
            rules={[
              { required: true, message: "Please enter the buying price!" },
            ]}
          >
            <Input placeholder="Enter buying price" />
          </Form.Item>

          <Form.Item
            name="selling_price"
            label="Selling Price"
            rules={[
              { required: true, message: "Please enter the selling price!" },
            ]}
          >
            <Input placeholder="Enter selling price" />
          </Form.Item>

          <Form.Item
            label="Product Image"
            name="image_url"
            rules={[
              { required: true, message: "Please upload the business logo!" },
            ]}
          >
            <Upload
              listType="picture"
              beforeUpload={beforeUpload}
              onChange={handleFileChange}
              fileList={fileList}
            >
              <Button icon={<UploadOutlined />}>Upload Logo</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="stock"
            label="Stock"
            rules={[
              { required: true, message: "Please enter the stock quantity!" },
            ]}
          >
            <Input placeholder="Enter stock quantity" />
          </Form.Item>

          <Form.Item
            name="minimum_stock"
            label="Minimum Stock"
            rules={[
              { required: true, message: "Please enter the minimum stock!" },
            ]}
          >
            <Input placeholder="Enter minimum stock" />
          </Form.Item>

          <Form.Item name="discount" label="Discount (%)">
            <Input placeholder="Enter discount percentage" />
          </Form.Item>

          <Form.Item
            name="exp_date"
            label="Expiration Date"
            rules={[
              { required: true, message: "Please enter the expiration date!" },
            ]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            name="supplier_name"
            label="Supplier Name"
            rules={[
              { required: true, message: "Please enter the supplier name!" },
            ]}
          >
            <Input placeholder="Enter supplier name" />
          </Form.Item>

          <Form.Item
            name="supplier_contact"
            label="Supplier Contacts"
            rules={[
              {
                required: true,
                message: "Please enter the supplier contacts!",
              },
            ]}
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
        </Form>
      </Modal>

      {/* Modal for viewing product details */}

      <ProductDetailsModal
        isVisible={isViewProductModelVisible}
        handleCancel={handleCancelModel}
        product={selectedProduct}
      />
    </Card>
  );
};

export default Products;
