import React, { useState } from 'react';
import { Layout, Table, Space, Form, Input, Button, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import './category.css';

const { Content } = Layout;
const { confirm } = Modal;
const { Search } = Input;

const columns = (showEditModal, showDeleteConfirm) => [
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
    render: (text, record) => (
      <Space size="middle">
        <EditOutlined
          onClick={() => showEditModal(record)}
          style={{ color: '#45a049', cursor: 'pointer', scale: '1.25'}}
        />
        <DeleteOutlined
          onClick={() => showDeleteConfirm(record.categoryName)}
          style={{ color:'red' , cursor: 'pointer', scale: '1.25'}}
        />
      </Space>
    ),
  },
];

const initialData = [
    { key: '1', categoryName: 'Shirts', productCount: 5 },
    { key: '2', categoryName: 'Skirts', productCount: 3 },
    { key: '3', categoryName: 'Shoes', productCount: 7 },
    { key: '4', categoryName: 'Accessories', productCount: 2 },
    { key: '5', categoryName: 'Wall decorators', productCount: 4 },
    { key: '6', categoryName: 'Towels', productCount: 9 },
    { key: '7', categoryName: 'Face cream', productCount: 6 },
    { key: '8', categoryName: 'Toys', productCount: 1 },
    { key: '9', categoryName: 'Category 9', productCount: 3 },
    { key: '10', categoryName: 'Category 10', productCount: 8 },
    { key: '11', categoryName: 'Category 11', productCount: 5 },
    { key: '12', categoryName: 'Category 12', productCount: 3 },
    { key: '13', categoryName: 'Category 13', productCount: 7 },
    { key: '14', categoryName: 'Category 14', productCount: 2 },
    { key: '15', categoryName: 'Category 15', productCount: 4 },
    { key: '16', categoryName: 'Category 16', productCount: 9 },
    { key: '17', categoryName: 'Category 17', productCount: 6 },
    { key: '18', categoryName: 'Category 18', productCount: 1 },
    { key: '19', categoryName: 'Category 19', productCount: 3 },
    { key: '20', categoryName: 'Category 20', productCount: 8 },
  ];

const Category = () => {
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const onFinish = (values) => {
    console.log('Received values:', values);
    // Handle form submission logic here
  };

  const handleEdit = (record, newCategoryName) => {
    const newData = data.map(item => 
      item.key === record.key ? { ...item, categoryName: newCategoryName } : item
    );
    setData(newData);
    setFilteredData(newData);
  };

  const showEditModal = (record) => {
  let categoryName = record.categoryName;

  Modal.info({
    title: 'Edit Category',
    content: (
      <Form>
        <Form.Item label="Category Name">
          <Input 
            defaultValue={categoryName} 
            onChange={(e) => categoryName = e.target.value} 
          />
        </Form.Item>
      </Form>
    ),
    onOk() {
      handleEdit(record, categoryName);
    },
    okText: 'Save',
    cancelText: 'Cancel',
    footer: (
      <div className="custom-modal-footer">
        <Button onClick={() => Modal.destroyAll()} className="custom-cancel-btn">
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
    )
  });
};
  

  const showDeleteConfirm = (categoryName) => {
    confirm({
      title: `Are you sure you want to delete "${categoryName}"?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
    });
  };

  const handleSearch = (value) => {
    const filtered = data.filter(item => 
      item.key.includes(value) || item.categoryName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
    setSearchText(value);
  };

  const paginationConfig = {
    pageSize: 15, 
    hideOnSinglePage: true, // Hide pagination if there's only one page
  };

  return (
    <Content className='content'>
      <div className="all-category-box-owner">
        <div className="category-header-owner">
          <h2>ALL CATEGORIES</h2>
          <Search
            placeholder="Search by No or Category Name"
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            style={{ width: 300, marginLeft: 'auto' }}
          />
        </div>
        <hr />
        <Table className='table' columns={columns(showEditModal, showDeleteConfirm)} dataSource={filteredData} pagination={paginationConfig} />
      </div>
    </Content>    
  );
};

export default Category;
