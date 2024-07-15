import React, { useState } from 'react';
import { Layout, Input, Button, Select, Form, Modal, Table, Card } from 'antd';
import { PlusOutlined, UploadOutlined, DollarOutlined, NumberOutlined, InboxOutlined, TagOutlined } from '@ant-design/icons';
import './addproduct.css';

const { Content } = Layout;
const { Option } = Select;

const categories = ['Electronics', 'Clothing', 'Books', 'Home Appliances', 'Toys'];

const AddProduct = () => {
  const [form] = Form.useForm();
  const [nextOrderId, setNextOrderId] = useState('ORD125');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const updatedProducts = [...products, { ...values, orderId: nextOrderId }];
      setProducts(updatedProducts);
      setNewProduct(values);
      setIsModalVisible(false);
      form.resetFields();
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log('Received values from form: ', values);
  };

  const handleSubmitOrder = () => {
    // Logic for submitting the order (e.g., sending data to backend)
    console.log('Submitting order:', products);
    // You can add further logic here, like clearing the form or updating state
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Product Name',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Photo URL',
      dataIndex: 'photo_url',
      key: 'photo_url',
      render: (text) => <img src={text} alt="Product" style={{ width: '50px', height: 'auto' }} />,
    },
    {
      title: 'Quantity',
      dataIndex: 'product_quantity',
      key: 'product_quantity',
    },
    {
      title: 'Buying Price',
      dataIndex: 'buying_price',
      key: 'buying_price',
    },
    {
      title: 'Selling Price',
      dataIndex: 'selling_price',
      key: 'selling_price',
    },
  ];

  return (
    <Content className="content">
      <div className="add-product-box">
        <div className="header-container">
          <h2>ADD PRODUCT</h2>
          <Button className='add-product-btn' type="primary" onClick={showModal} icon={<PlusOutlined />}>
            Add Product
          </Button>
        </div>
        <hr />
        <Card
          className="added-products-card"
          title={<div><strong>Order ID: {nextOrderId}</strong></div>}
        >
          <Table
            className="added-products-table"
            columns={columns}
            dataSource={products}
            pagination={false}
          />
          <div style={{ textAlign: 'right', marginTop: '10px' }}>
            <Button className='submit-order-btn' type="primary" onClick={handleSubmitOrder} >
              Submit Order
            </Button>
          </div>
        </Card>
        <Modal
          title="Add Product"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Add"
          cancelText="Cancel"
        >
          <Form
            form={form}
            name="add_product"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item name="product_name" label="Product Name" rules={[{ required: true, message: 'Please input the product name!' }]}>
              <Input placeholder="Product Name" />
            </Form.Item>
            <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select a category!' }]}>
              <Select placeholder="Select a category">
                {categories.map((category, index) => (
                  <Option key={index} value={category}>{category}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="photo_url" label="Photo URL" rules={[{ required: true, message: 'Please input the photo URL!' }]}>
              <Input placeholder="Photo URL" />
            </Form.Item>
            <Form.Item name="product_quantity" label="Product Quantity" rules={[{ required: true, message: 'Please input the product quantity!' }]}>
              <Input type="number" placeholder="Product Quantity" />
            </Form.Item>
            <Form.Item name="buying_price" label="Buying Price" rules={[{ required: true, message: 'Please input the buying price!' }]}>
              <Input type="number" placeholder="Buying Price" />
            </Form.Item>
            <Form.Item name="selling_price" label="Selling Price" rules={[{ required: true, message: 'Please input the selling price!' }]}>
              <Input type="number" placeholder="Selling Price" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Content>
  );
};

export default AddProduct;
