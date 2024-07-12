import React, { useState } from 'react';
import { Layout, Table, Space, Form, Input, Button, Modal, Input as AntdInput } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleViewOrders = (supplier_id) => {
    navigate(`/phistory/${supplier_id}`);
  };

  const handleEdit = (values) => {
    const newData = data.map(item =>
      item.supplier_id === values.supplier_id ? { ...item, ...values } : item
    );
    setData(newData);
    setFilteredData(newData);
  };

  const showDeleteConfirm = (supplierName) => {
    confirm({
      title: `Are you sure you want to delete "${supplierName}"?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      centered: true,
    });
  };

  const handleSearch = (value) => {
    const filtered = data.filter(item =>
      item.supplier_id.toLowerCase().includes(value.toLowerCase()) || item.supplier_name.toLowerCase().includes(value.toLowerCase())
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
            onClick={() => handleEdit(record)}
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
    pageSize: 10,
    hideOnSinglePage: true, // Hide pagination if there's only one page
  };

  const handleAddSupplierClick = () => {
    setIsModalVisible(true);
  };

  const handleModalSave = () => {
    form.validateFields().then(values => {
      form.resetFields();
      setIsModalVisible(false);
      const newSupplier = {
        ...values,
        supplier_id: `SUP${data.length + 123}`, // Simulate auto-increment
        key: `${data.length + 1}`,
      };
      const newData = [...data, newSupplier];
      setData(newData);
      setFilteredData(newData);
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <Content className="content">
      <div className="sup-box">
        <div className="header">
          <h2>SUPPLIERS</h2>
          <Space className='header-right-end'>
            <Search
              placeholder="Search by Supplier ID or Supplier Name"
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              value={searchText}
              style={{ width: 300, marginLeft: 'auto' }}
            />
            <Button className='addsup-btn' type="primary" onClick={handleAddSupplierClick}>Add Suppliers</Button>
          </Space> 
        </div>
        <hr />
        <Table className='sup-table' columns={columns} dataSource={filteredData} pagination={paginationConfig} />
      </div>
      <Modal
        title="Add Supplier"
        visible={isModalVisible}
        onOk={handleModalSave}
        onCancel={handleModalCancel}
        centered
        width={800}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleModalSave}>
            Save
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" name="add_supplier_form">
          <Form.Item
            name="supplier_name"
            label="Supplier Name"
            rules={[{ required: true, message: 'Please input the supplier name!' }]}
          >
            <AntdInput />
          </Form.Item>
          <Form.Item
            name="contact_person"
            label="Contact Person"
            rules={[{ required: true, message: 'Please input the contact person!' }]}
          >
            <AntdInput />
          </Form.Item>
          <Form.Item
            name="contact_number"
            label="Contact Number"
            rules={[{ required: true, message: 'Please input the contact number!' }]}
          >
            <AntdInput />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email Address"
            rules={[{ required: true, message: 'Please input the email address!' }]}
          >
            <AntdInput />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please input the address!' }]}
          >
            <AntdInput />
          </Form.Item>
          <Form.Item
            name="bank_details"
            label="Bank Details"
            rules={[{ required: true, message: 'Please input the bank details!' }]}
          >
            <AntdInput />
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
};

export default Suppliers;