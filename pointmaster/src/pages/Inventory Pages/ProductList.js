import React, { useState } from 'react';
import { Layout, Table, Button, Space, Modal, Form, Input, InputNumber, Select } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import './productlist.css';

const { Content } = Layout;
const { confirm } = Modal;

const ProductList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();

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
    },
  ];

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
      title: 'Added Date',
      dataIndex: 'addedDate',
      key: 'addedDate',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => handleEdit(record)}
            style={{ color: '#1890ff', cursor: 'pointer', transform: 'scale(1.25)' }}
          />
          <DeleteOutlined
            onClick={() => handleDelete(record.productId)}
            style={{ color: 'red', cursor: 'pointer', transform: 'scale(1.25)' }}
          />
        </Space>
      ),
    },
  ];

  return (
    <Content className="content">
      <div className="pl-box">
        <div className="header-container">
          <h2>Product List</h2>
        </div>
        <hr />
        <Table className='prlist-table' columns={columns} dataSource={exampleProducts} />
      </div>
      <Modal
        title="Edit Product"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        centered>
        <Form form={form} layout="vertical">
          <Form.Item name="productName" label="Product Name" rules={[{ required: true, message: 'Please input the product name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select the category!' }]}>
            <Select>
              <Select.Option value="Shoes">Shoes</Select.Option>
              <Select.Option value="Clothing">Clothing</Select.Option>
              <Select.Option value="Electronics">Electronics</Select.Option>
              
              
              {/* Category options has hardcoded here........ */}


            </Select>
          </Form.Item>
          <Form.Item name="photoUrl" label="Photo URL" rules={[{ required: true, message: 'Please input the photo URL!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Please input the quantity!' }]}>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name="buyingPrice" label="Buying Price" rules={[{ required: true, message: 'Please input the buying price!' }]}>
            <InputNumber min={0.01} step={0.01} />
          </Form.Item>
          <Form.Item name="sellingPrice" label="Selling Price" rules={[{ required: true, message: 'Please input the selling price!' }]}>
            <InputNumber min={0.01} step={0.01} />
          </Form.Item>
        </Form>
      </Modal>
    </Content>  
  );
};

export default ProductList;
