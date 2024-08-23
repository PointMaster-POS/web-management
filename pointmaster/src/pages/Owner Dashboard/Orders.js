import React, { useState } from 'react';
import { Typography,Card,Table, Input } from 'antd';
import { ordersData } from "./Data";
import './orders.css';

const { Title } = Typography;
const { Search } = Input;

const Orders = () => {
  const [data, setData] = useState(ordersData);
  const [filteredData, setFilteredData] = useState(data);
  const [searchText, setSearchText] = useState("");

  // Sort orders by date, most recent first
  const sortedOrders = [...filteredData].sort((a, b) => new Date(b.ordersDate) - new Date(a.ordersDate));
  
  // Calculate total number of pages
  /* const totalOrders = sortedOrders.length;
  const totalPages = Math.ceil(totalOrders / pageSize); */
  
  // Get orders for current page
  // const paginatedOrders = sortedOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  /* const showOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };
 */
  /* const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }; */

  const handleSearch = (value, exactMatch = false) => {
    const filtered = data.filter((item) => {
      const order_date = item.name.toLowerCase();
      const searchValue = value.toLowerCase();

      return exactMatch ? order_date === searchValue : order_date.includes(searchValue);
    });
    setFilteredData(filtered);
    setSearchText(value);
  };

  const columns = [
    {
      title: "Order Id",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "Supplier ID",
      dataIndex: "supplier_id",
      key: "supplier_id",
    },
    {
      title: "Order Date",
      dataIndex: "order_date",
      key: "order_date",
    },
    {
      title: "Totl Amount",
      dataIndex: "total_amount",
      key: "total_amount",
    },
  ]  

  return (
    <Card
      style={{
        margin: 30,
        padding: 30,
        borderRadius: "10px",
      }}
      bodyStyle={{ padding: "20px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={3} style={{ marginBottom: 10 }}>
          Orders Data
        </Title>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Search
            placeholder="Search order by date"
            onSearch={(value) => handleSearch(value, true)} 
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            style={{ marginRight: 16, width: 300 }}
          />
          {/* <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
            Add New Store
          </Button> */}
        </div>
      </div>
      <hr color="#1890ff" />

      {/* <Modal
        title="Add New Store"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <AddNewStore form={form} onAddStore={handleAddStore} onCancel={handleCancel} />
      </Modal>
 */}
      <Table
        dataSource={sortedOrders}
        columns={columns}
        pagination={{ pageSize: 8 }}
        locale={{
          emptyText: "No stores available.",
        }}
        style={{ marginTop: 20 }}
      />
    </Card>
  );
};

export default Orders;
