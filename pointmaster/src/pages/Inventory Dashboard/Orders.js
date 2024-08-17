import React, { useState } from 'react';
import { Layout, Table, Button, Modal } from 'antd';
import './orders.css';

const { Content } = Layout;

const Orders = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      key: '1',
      orderId: 'ORD001',
      customerName: 'John Doe',
      orderDate: '2024-08-10',
      totalAmount: 150.00,
    },
    {
      key: '2',
      orderId: 'ORD002',
      customerName: 'Jane Smith',
      orderDate: '2024-08-11',
      totalAmount: 200.00,
    },
    {
      key: '3',
      orderId: 'ORD003',
      customerName: 'Bob Johnson',
      orderDate: '2024-08-12',
      totalAmount: 300.00,
    },
  ];

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button onClick={() => showOrderDetails(record)} type="primary">
          View Details
        </Button>
      ),
    },
  ];

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
        <Table
          columns={columns}
          dataSource={orders}
          pagination={{ pageSize: 5 }}
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
            <p><strong>Customer Name:</strong> {selectedOrder.customerName}</p>
            <p><strong>Order Date:</strong> {selectedOrder.orderDate}</p>
            <p><strong>Total Amount:</strong> ${selectedOrder.totalAmount}</p>
            {/* Add more details as needed */}
          </div>
        )}
      </Modal>
    </Content>
  );
};

export default Orders;
