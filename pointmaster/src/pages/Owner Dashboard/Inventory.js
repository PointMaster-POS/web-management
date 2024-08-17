import React, { useState } from 'react';
import { Layout, Table, Space, Form, Input, Button, Modal, Select } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import './inventory.css';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { confirm } = Modal;

const Inventory = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();
  const { Search } = Input;
  const navigate = useNavigate();
  const [addBtnColor, setAddBtnColor] = useState('primary'); // Add state for button color

  const exampleProducts = [
    {
      key: '1',
      productId: 'PROD001',
      orderId: 'ORD001',
      productName: 'Blue Shoes',
      category: 'Shoes',
      photoUrl: '/images/shoes.jpg',
      quantity: 10,
      buyingPrice: 500,
      sellingPrice: 700,
      addedDate: '2024-07-01',
      supplierId: 'SUP001', // Added supplier ID
    },
    {
      key: '2',
      productId: 'PROD002',
      orderId: 'ORD002',
      productName: 'Frock',
      category: 'Clothing',
      photoUrl: '/images/frock.jpg',
      quantity: 50,
      buyingPrice: 10,
      sellingPrice: 15,
      addedDate: '2024-07-02',
      supplierId: 'SUP002', // Added supplier ID
    },
    {
      key: '3',
      productId: 'PROD003',
      orderId: 'ORD003',
      productName: 'Laptop',
      category: 'Electronics',
      photoUrl: '/images/laptop.jpg',
      quantity: 20,
      buyingPrice: 20,
      sellingPrice: 35,
      addedDate: '2024-07-03',
      supplierId: 'SUP003', // Added supplier ID
    },
  ];

  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(exampleProducts);

  const handleEdit = (record) => {
    setEditingProduct(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (productId) => {
    confirm({
      title: `Are you sure you want to delete "${productId}"?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      centered: true,
      onOk() {
        console.log('Delete:', productId);
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      console.log('Updated values:', values);
      setIsModalVisible(false);
      setEditingProduct(null);
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = exampleProducts.filter(item =>
      item.productId.toLowerCase().includes(value.toLowerCase()) ||
      item.productName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const navigateToAddProduct = () => {
    setAddBtnColor('success'); // Change the button color to green when clicked
    navigate('/addproduct');
  };

  const columns = [
    {
      title: 'Product ID',
      dataIndex: 'productId',
      key: 'productId',
    },
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Photo',
      dataIndex: 'photoUrl',
      key: 'photoUrl',
      render: (text) => <img src={text} alt="Product" style={{ width: '50px', height: 'auto' }} />,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Buying Price',
      dataIndex: 'buyingPrice',
      key: 'buyingPrice',
    },
    {
      title: 'Selling Price',
      dataIndex: 'sellingPrice',
      key: 'sellingPrice',
    },
    {
      title: 'Supplier ID', // New column for Supplier ID
      dataIndex: 'supplierId',
      key: 'supplierId',
    },
    {
      title: 'Added Date',
      dataIndex: 'addedDate',
      key: 'addedDate',
    },
  ];

  const paginationConfig = {
    pageSize: 10,
    hideOnSinglePage: true, 
  };

  return (
    <Content className="content">
      <div className="pl-box">
        <div className="header">
          <h2>INVENTORY</h2>
          <Search
            placeholder="Search by Product ID or Product Name"
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            style={{ width: 300, marginLeft: 'auto' }}
          />
        </div>
        <hr />
        <Table className='prlist-table' columns={columns} dataSource={searchText ? filteredProducts : exampleProducts} pagination={paginationConfig}/>
      </div>
      
    </Content>
  );
};

export default Inventory;
