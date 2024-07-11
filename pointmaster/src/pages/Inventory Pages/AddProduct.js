import React, { useState } from 'react';
import { Layout, Input, Button, Select, Form } from 'antd';
import { PlusOutlined, UploadOutlined, DollarOutlined, NumberOutlined, InboxOutlined, TagOutlined } from '@ant-design/icons';
import NavigationBar from '../../components/Inventory Components/NavigationBar';
import Sidebar from '../../components/Inventory Components/SideBar';
import './addproduct.css';

const { Content } = Layout;
const { Option } = Select;

const categories = ['Electronics', 'Clothing', 'Books', 'Home Appliances', 'Toys'];

const AddProduct = () => {
  const [nextOrderId, setNextOrderId] = useState('ORD125');

  const onFinish = (values) => {
    console.log('Received values from form: ', values);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout className="site-layout">
        <NavigationBar />
        <Content className="content">
          <div className="add-product-box">
            <div className="header-container">
                <h2>Add Product</h2>
            </div>  
            <hr/>  
            <Form
              name="add_product"
              className="add-product-form"
              onFinish={onFinish}
              layout="vertical"
            >
              <table className="product-table">
                <tbody>
                  <tr>
                    <td><strong>Order ID</strong></td>
                    <td>{nextOrderId}</td>
                  </tr>
                  <tr>
                    <td className="form-label"><TagOutlined className="form-icon" /> Product Name</td>
                    <td>
                      <Form.Item name="product_name" rules={[{ required: true, message: 'Please input the product name!' }]}>
                        <Input placeholder="Product Name" />
                      </Form.Item>
                    </td>
                  </tr>
                  <tr>
                    <td className="form-label"><InboxOutlined className="form-icon" /> Category</td>
                    <td>
                      <Form.Item name="category" rules={[{ required: true, message: 'Please select a category!' }]}>
                        <Select placeholder="Select a category">
                          {categories.map((category, index) => (
                            <Option key={index} value={category}>{category}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </td>
                  </tr>
                  <tr>
                    <td className="form-label"><UploadOutlined className="form-icon" /> Photo URL</td>
                    <td>
                      <Form.Item name="photo_url" rules={[{ required: true, message: 'Please input the photo URL!' }]}>
                        <Input placeholder="Photo URL" />
                      </Form.Item>
                    </td>
                  </tr>
                  <tr>
                    <td className="form-label"><NumberOutlined className="form-icon" /> Product Quantity</td>
                    <td>
                      <Form.Item name="product_quantity" rules={[{ required: true, message: 'Please input the product quantity!' }]}>
                        <Input type="number" placeholder="Product Quantity" />
                      </Form.Item>
                    </td>
                  </tr>
                  <tr>
                    <td className="form-label"><DollarOutlined className="form-icon" /> Buying Price</td>
                    <td>
                      <Form.Item name="buying_price" rules={[{ required: true, message: 'Please input the buying price!' }]}>
                        <Input type="number" placeholder="Buying Price" />
                      </Form.Item>
                    </td>
                  </tr>
                  <tr>
                    <td className="form-label"><DollarOutlined className="form-icon" /> Selling Price</td>
                    <td>
                      <Form.Item name="selling_price" rules={[{ required: true, message: 'Please input the selling price!' }]}>
                        <Input type="number" placeholder="Selling Price" />
                      </Form.Item>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} style={{ textAlign: 'center' }}>
                      <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>Add Product</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AddProduct;
