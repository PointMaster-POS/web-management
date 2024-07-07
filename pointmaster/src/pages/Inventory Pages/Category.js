import React from 'react';
import { Layout, Table, Space, Form, Input, Button } from 'antd';
import NavigationBar from '../../components/Inventory Components/NavigationBar';
import Sidebar from '../../components/Inventory Components/SideBar';
import './category.css';

const { Content } = Layout;

const columns = [
  {
    title: 'No',
    dataIndex: 'key',
    key: 'key',
    width: 50,
  },
  {
    title: 'Category Name',
    dataIndex: 'categoryName',
    key: 'categoryName',
  },
  {
    title: 'No of Products',
    dataIndex: 'productCount',
    key: 'productCount',
  },
  {
    title: 'Actions',
    key: 'actions',
    render: () => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
    {
      key: '1',
      categoryName: 'Category 1',
      productCount: 5,
    },
    {
      key: '2',
      categoryName: 'Category 2',
      productCount: 3,
    },
    {
      key: '3',
      categoryName: 'Category 3',
      productCount: 7,
    },
    {
      key: '4',
      categoryName: 'Category 4',
      productCount: 2,
    },
    {
      key: '5',
      categoryName: 'Category 5',
      productCount: 4,
    },
    {
      key: '6',
      categoryName: 'Category 6',
      productCount: 9,
    },
    {
      key: '7',
      categoryName: 'Category 7',
      productCount: 6,
    },
    {
      key: '8',
      categoryName: 'Category 8',
      productCount: 1,
    },
    {
      key: '9',
      categoryName: 'Category 9',
      productCount: 3,
    },
    {
      key: '10',
      categoryName: 'Category 10',
      productCount: 8,
    },
    {
      key: '11',
      categoryName: 'Category 11',
      productCount: 5,
    },
    {
      key: '12',
      categoryName: 'Category 12',
      productCount: 3,
    },
    {
      key: '13',
      categoryName: 'Category 13',
      productCount: 7,
    },
    {
      key: '14',
      categoryName: 'Category 14',
      productCount: 2,
    },
    {
      key: '15',
      categoryName: 'Category 15',
      productCount: 4,
    },
    {
      key: '16',
      categoryName: 'Category 16',
      productCount: 9,
    },
    {
      key: '17',
      categoryName: 'Category 17',
      productCount: 6,
    },
    {
      key: '18',
      categoryName: 'Category 18',
      productCount: 1,
    },
    {
      key: '19',
      categoryName: 'Category 19',
      productCount: 3,
    },
    {
      key: '20',
      categoryName: 'Category 20',
      productCount: 8,
    },
  ];
  
  

const Category = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
    // Handle form submission logic here
  };

  const paginationConfig = {
    pageSize: 18, // Display 15 items per page
    hideOnSinglePage: true, // Hide pagination if there's only one page
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout className="site-layout">
        <NavigationBar />
        <Content className='content'>
          <div className="add-category-box">
            <h2>ADD CATEGORY</h2>
            <hr />
            <Form className="custom-form" layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="categoryName"
                label="Category Name"
                rules={[{ required: true, message: 'Please input the category name!' }]}
                className="custom-form-item">
                <Input placeholder="Category Name" />
              </Form.Item>
              <Form.Item>
                <Button className='btn' type="primary" htmlType="submit">
                  Add Category
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="all-category-box">
            <h2>ALL CATEGORIES</h2>
            <hr />
            <Table className='table' columns={columns} dataSource={data} pagination={paginationConfig} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Category;
