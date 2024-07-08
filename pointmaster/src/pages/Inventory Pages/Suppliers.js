import React, { useState } from 'react';
import { Layout, Table, Space, Form, Input, Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import NavigationBar from '../../components/Inventory Components/NavigationBar';
import Sidebar from '../../components/Inventory Components/SideBar';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import './suppliers.css';

const { Content } = Layout;
const { confirm } = Modal;
const { Search } = Input;

const initialData = [
  {
    key: '1',
    supplier_id: 'SUP123',
    supplier_name: 'Karunarathna stores',
    contact_person: 'John Doe',
    contact_number: '123-456-7890',
    email: 'supplier1@example.com',
    address: '123 Supplier St, Supplier City, SC 12345',
    bank_details: 'Bank XYZ, Account No: 123456789',
  },
  {
    key: '2',
    supplier_id: 'SUP124',
    supplier_name: 'News store',
    contact_person: 'Jane Smith',
    contact_number: '987-654-3210',
    email: 'supplier2@example.com',
    address: '456 Supplier Ave, Supplier City, SC 12345',
    bank_details: 'Bank ABC, Account No: 987654321',
  },
  {
    key: '3',
    supplier_id: 'SUP125',
    supplier_name: 'Jayawardhana stores',
    contact_person: 'Alice Johnson',
    contact_number: '456-789-0123',
    email: 'supplier3@example.com',
    address: '789 Supplier Blvd, Supplier City, SC 12345',
    bank_details: 'Bank DEF, Account No: 456789012',
  },
  {
    key: '4',
    supplier_id: 'SUP126',
    supplier_name: 'Maxmo',
    contact_person: 'Bob Brown',
    contact_number: '321-654-9870',
    email: 'supplier4@example.com',
    address: '321 Supplier Rd, Supplier City, SC 12345',
    bank_details: 'Bank GHI, Account No: 321654987',
  },
  {
    key: '5',
    supplier_id: 'SUP127',
    supplier_name: 'Plane and printed',
    contact_person: 'Charlie Davis',
    contact_number: '654-321-0987',
    email: 'supplier5@example.com',
    address: '654 Supplier St, Supplier City, SC 12345',
    bank_details: 'Bank JKL, Account No: 654321098',
  },
  {
    key: '6',
    supplier_id: 'SUP128',
    supplier_name: 'Pasta station',
    contact_person: 'Diana Evans',
    contact_number: '789-012-3456',
    email: 'supplier6@example.com',
    address: '987 Supplier Ln, Supplier City, SC 12345',
    bank_details: 'Bank MNO, Account No: 789012345',
  },
  {
    key: '7',
    supplier_id: 'SUP129',
    supplier_name: 'Bugger buddies',
    contact_person: 'Edward Harris',
    contact_number: '012-345-6789',
    email: 'supplier7@example.com',
    address: '654 Supplier Cir, Supplier City, SC 12345',
    bank_details: 'Bank PQR, Account No: 012345678',
  },
  {
    key: '8',
    supplier_id: 'SUP130',
    supplier_name: 'Foodies',
    contact_person: 'Fiona Jackson',
    contact_number: '345-678-9012',
    email: 'supplier8@example.com',
    address: '123 Supplier Blvd, Supplier City, SC 12345',
    bank_details: 'Bank STU, Account No: 345678901',
  },
];

const Suppliers = () => {
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const handleViewOrders = (supplierId) => {
    navigate('/phistory');
    console.log('Viewing orders for supplier:', supplierId);
  };

  const handleEdit = (values) => {
    const newData = data.map(item =>
      item.supplier_id === values.supplier_id ? { ...item, ...values } : item
    );
    setData(newData);
    setFilteredData(newData);
    setIsEditModalVisible(false);
  };

  const showEditModal = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsEditModalVisible(true);
  };

  const showDeleteConfirm = (supplierName) => {
    confirm({
      title: `Are you sure you want to delete "${supplierName}"?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
    });
  };

  const handleSearch = (value) => {
    const filtered = data.filter(item =>
      item.supplier_id.includes(value) || item.supplier_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
    setSearchText(value);
  };

  const columns = [
    {
      title: 'Supplier ID',
      dataIndex: 'supplier_id',
      key: 'supplier_id',
    },
    {
      title: 'Supplier Name',
      dataIndex: 'supplier_name',
      key: 'supplier_name',
    },
    {
      title: 'Contact Person',
      dataIndex: 'contact_person',
      key: 'contact_person',
    },
    {
      title: 'Contact Number',
      dataIndex: 'contact_number',
      key: 'contact_number',
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Bank Details',
      dataIndex: 'bank_details',
      key: 'bank_details',
    },
    {
      title: 'Orders',
      key: 'orders',
      render: (text, record) => (
        <Button onClick={() => handleViewOrders(record.supplier_id)}>
          View Orders
        </Button>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => showEditModal(record)}
            style={{ color: '#1890ff', cursor: 'pointer', transform: 'scale(1.25)' }}
          />
          <DeleteOutlined
            onClick={() => showDeleteConfirm(record.supplier_name)}
            style={{ color: 'red', cursor: 'pointer', transform: 'scale(1.25)' }}
          />
        </Space>
      ),
    },
  ];

  const paginationConfig = {
    pageSize: 13,
    hideOnSinglePage: true, // Hide pagination if there's only one page
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout className="site-layout">
        <NavigationBar />
        <Content className="content">
          <div className="box">
            <div className="header">
              <h2>Suppliers</h2>
              <Search
                placeholder="Search by Supplier ID or Supplier Name"
                onSearch={handleSearch}
                onChange={(e) => handleSearch(e.target.value)}
                value={searchText}
                style={{ width: 300, marginLeft: 'auto' }}
              />
            </div>
            <hr />
            <Table className="table" columns={columns} dataSource={filteredData} pagination={paginationConfig} />
          </div>
        </Content>
      </Layout>
      <Modal
        title="Edit Supplier"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={() => form.submit()}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" onFinish={handleEdit}>
          <Form.Item label="Supplier ID" name="supplier_id">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Supplier Name" name="supplier_name">
            <Input />
          </Form.Item>
          <Form.Item label="Contact Person" name="contact_person">
            <Input />
          </Form.Item>
          <Form.Item label="Contact Number" name="contact_number">
            <Input />
          </Form.Item>
          <Form.Item label="Email Address" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>
          <Form.Item label="Bank Details" name="bank_details">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Suppliers;
