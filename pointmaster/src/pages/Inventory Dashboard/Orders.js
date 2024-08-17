import React, { useState } from 'react';
import { Layout, Button, Modal, Pagination } from 'antd';
import './orders.css';

const { Content } = Layout;

const Orders = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // Number of orders per page

  const orders = [
    {
      key: '1',
      orderId: 'ORD001',
      supplierId: 'SUP001',
      orderDate: '2024-08-10',
      totalAmount: 150.00,
    },
    {
      key: '2',
      orderId: 'ORD002',
      supplierId: 'SUP002',
      orderDate: '2024-08-11',
      totalAmount: 200.00,
    },
    {
      key: '3',
      orderId: 'ORD003',
      supplierId: 'SUP003',
      orderDate: '2024-08-12',
      totalAmount: 300.00,
    },
    {
      key: '4',
      orderId: 'ORD004',
      supplierId: 'SUP004',
      orderDate: '2024-08-13',
      totalAmount: 250.00,
    },
    {
      key: '5',
      orderId: 'ORD005',
      supplierId: 'SUP005',
      orderDate: '2024-08-14',
      totalAmount: 180.00,
    },
    {
      key: '6',
      orderId: 'ORD006',
      supplierId: 'SUP006',
      orderDate: '2024-08-15',
      totalAmount: 220.00,
    },
    {
      key: '7',
      orderId: 'ORD007',
      supplierId: 'SUP007',
      orderDate: '2024-08-16',
      totalAmount: 270.00,
    },
    {
      key: '8',
      orderId: 'ORD008',
      supplierId: 'SUP008',
      orderDate: '2024-08-17',
      totalAmount: 320.00,
    },
    {
      key: '9',
      orderId: 'ORD009',
      supplierId: 'SUP009',
      orderDate: '2024-08-18',
      totalAmount: 190.00,
    },
    {
      key: '10',
      orderId: 'ORD010',
      supplierId: 'SUP010',
      orderDate: '2024-08-19',
      totalAmount: 210.00,
    },
    {
      key: '11',
      orderId: 'ORD011',
      supplierId: 'SUP011',
      orderDate: '2024-08-20',
      totalAmount: 240.00,
    },
    {
      key: '12',
      orderId: 'ORD012',
      supplierId: 'SUP012',
      orderDate: '2024-08-21',
      totalAmount: 260.00,
    },
    {
      key: '13',
      orderId: 'ORD013',
      supplierId: 'SUP013',
      orderDate: '2024-08-22',
      totalAmount: 300.00,
    },
    {
      key: '14',
      orderId: 'ORD014',
      supplierId: 'SUP014',
      orderDate: '2024-08-23',
      totalAmount: 280.00,
    },
    {
      key: '15',
      orderId: 'ORD015',
      supplierId: 'SUP015',
      orderDate: '2024-08-24',
      totalAmount: 320.00,
    },
  ];

  // Sort orders by date, most recent first
  const sortedOrders = [...orders].sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
  
  // Calculate total number of pages
  const totalOrders = sortedOrders.length;
  const totalPages = Math.ceil(totalOrders / pageSize);
  
  // Get orders for current page
  const paginatedOrders = sortedOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const showOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  return (
    <Content className="content">
      <div className="orders-box">
        <h2>ORDERS</h2>
        <hr className="hr" />
        <div className="orders-list">
          {paginatedOrders.map(order => (
            <div key={order.key} className="order-row">
              <div className="order-details">
                <p><strong>Order ID:</strong> {order.orderId}</p>
                <p><strong>Supplier ID:</strong> {order.supplierId}</p>
                <p><strong>Order Date:</strong> {order.orderDate}</p>
                <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
              </div>
              <Button className='view-details-btn' onClick={() => showOrderDetails(order)} type="primary">
                View Details
              </Button>
            </div>
          ))}
        </div>
        <Pagination
          className="pagination"
          current={currentPage}
          total={totalOrders}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false} // Hide size changer
          showQuickJumper={false} // Hide quick jumper
        />
      </div>
      <Modal
        title="Order Details"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        centered
      >
        {selectedOrder && (
          <div>
            <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
            <p><strong>Supplier ID:</strong> {selectedOrder.supplierId}</p>
            <p><strong>Order Date:</strong> {selectedOrder.orderDate}</p>
            <p><strong>Total Amount:</strong> ${selectedOrder.totalAmount.toFixed(2)}</p>
          </div>
        )}
      </Modal>
    </Content>
  );
};

export default Orders;
