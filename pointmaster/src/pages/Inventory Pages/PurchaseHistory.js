import React, { useState } from 'react';
import { Layout, Table, Space, Modal, Input, Button, DatePicker } from 'antd';
import NavigationBar from '../../components/Inventory Components/NavigationBar';
import Sidebar from '../../components/Inventory Components/SideBar';
import { useNavigate, useParams } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom';
import './purchasehistory.css';

const { Content } = Layout;
const { Search } = Input;
const { RangePicker } = DatePicker;

const initialData = [
  {
    key: '1',
    order_id: 'ORD123',
    supplier_id: 'SUP123',
    order_date: '2023-06-25',
    total_amount: '$500',
    payment_status: 'Not Paid',
    payment_method: 'Credit Card',
    items: [
      { item_id: 'item001', name: 'Product A', quantity: 2, unit_price: '$100' },
      { item_id: 'item002', name: 'Product B', quantity: 1, unit_price: '$300' },
    ],
  },
  {
    key: '2',
    order_id: 'ORD124',
    supplier_id: 'SUP124',
    order_date: '2023-06-26',
    total_amount: '$300',
    payment_status: 'Paid',
    payment_method: 'Cash',
    items: [
      { item_id: 'item003', name: 'Product C', quantity: 3, unit_price: '$100' },
    ],
  },
  
];

const PurchaseHistory = () => {
  const { supplier_id } = useParams();            //  to get supplier_id from URL
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [searchText, setSearchText] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  
  const handleSearch = (value) => {
    const filtered = data.filter(item =>
      item.order_id.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
    setSearchText(value);
  };

  const showDetailsModal = (record) => {
    setSelectedOrder(record);
  };

  const handleDateChange = (dates, dateStrings) => {
    const filtered = data.filter(item => {
      const orderDate = new Date(item.order_date);
      return orderDate >= new Date(dateStrings[0]) && orderDate <= new Date(dateStrings[1]);
    });
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'order_id',
      key: 'order_id',
    },
    {
      title: 'Order Date',
      dataIndex: 'order_date',
      key: 'order_date',
    },
    {
      title: 'Total Amount',
      dataIndex: 'total_amount',
      key: 'total_amount',
    },
    {
      title: 'Payment Status',
      dataIndex: 'payment_status',
      key: 'payment_status',
    },
    {
      title: 'Payment Method',
      dataIndex: 'payment_method',
      key: 'payment_method',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button onClick={() => showDetailsModal(record)}>View Details</Button>
      ),
    },
  ];

  const orderColumns = [
    {
      title: 'Item ID',
      dataIndex: 'item_id',
      key: 'item_id',
    },
    {
      title: 'Item Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Unit Price',
      dataIndex: 'unit_price',
      key: 'unit_price',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout className="site-layout">
        <NavigationBar />
        <Content className="content">
          <div className="box">
            <div className="header-container">
              <h2>PURCHASE HISTORY OF {supplier_id}</h2>
              <Space className="search-bar-container">
                <Search
                  placeholder="Search by Order ID"
                  onSearch={handleSearch}
                  onChange={(e) => handleSearch(e.target.value)}
                  value={searchText}
                  style={{ width: 300 }}
                />
                <RangePicker onChange={handleDateChange} />
              </Space>
            </div>
            <hr />
            <Table className='ph-table' columns={columns} dataSource={filteredData} pagination={{ pageSize: 10 }} />
            {selectedOrder && (
              <Modal
                title={`Order Details - ${selectedOrder.order_id}`}
                visible={!!selectedOrder}
                onCancel={() => setSelectedOrder(null)}
                footer={null}
                width={800}
                centered
              >
                <Table columns={orderColumns} dataSource={selectedOrder.items} pagination={false} />
              </Modal>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PurchaseHistory;
