import React, { useState } from 'react';
import { Table, Input, Typography,Card } from 'antd';
// import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
import { productsData } from './Data';

const { Title } = Typography;
//const { confirm } = Modal;
const { Search } = Input;


const Inventory = () => {
  
  /* const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();
  const [form] = Form.useForm(); */  
  
 
  const [data, setData] = useState(productsData);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  /* const handleEdit = (record) => {
    setEditingProduct(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  }; */

  /* const handleDelete = (productId) => {
    confirm({
      title: `Are you sure you want to delete "${productId}"?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      centered: true,
      onOk() {
        console.log('Delete:', productId);
      },
    });
  }; */

  /* const handleModalOk = () => {
    form.validateFields().then((values) => {
      console.log('Updated values:', values);
      setIsModalVisible(false);
      setEditingProduct(null);
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  }; */

  /* const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
  }; */

  const handleSearch = (value, exactMatch = false) => {
    const searchValue = value.toLowerCase();
  
    const filtered = data.filter((item) => {
      const product_name = item.product_name.toLowerCase();
      const product_id = item.product_id.toString().toLowerCase(); // Convert product_id to string for comparison
  
      if (exactMatch) {
        return product_name === searchValue || product_id === searchValue;
      } else {
        return product_name.includes(searchValue) || product_id.includes(searchValue);
      }
    });
  
    setFilteredData(filtered);
    setSearchText(value);
  };

  /* const navigateToAddProduct = () => {
    setAddBtnColor('success'); // Change the button color to green when clicked
    navigate('/addproduct');
  };
 */
  const columns = [
    {
      title: 'Product ID',
      dataIndex: 'product_id',
      key: 'product_id',
    },
    {
      title: 'Order ID',
      dataIndex: 'order_id',
      key: 'order_id',
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
      title: 'Photo',
      dataIndex: 'photo_url',
      key: 'photo_url',
      render: (text) => <img src={text} alt="Product" style={{ width: '50px', height: 'auto' }} />,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
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
    {
      title: 'Supplier ID', // New column for Supplier ID
      dataIndex: 'supplier_id',
      key: 'supplier_id',
    },
    {
      title: 'Added Date',
      dataIndex: 'added_date',
      key: 'added_date',
    },
  ];

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
          Products Data
        </Title>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Search
            placeholder="Search by Product ID or Product Name"
            onSearch={(value) => handleSearch(value, true)} 
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            style={{ marginRight: 16, width: 300 }}
          />
          {/* <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
            Add New Supplier
          </Button> */}
        </div>
      </div>
      <hr color="#1890ff" />

      {/* <Modal
        title="Add New Supplier"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <AddNewSupplier form={form} onAddSupplier={handleAddSuppliers} onCancel={handleCancel} />
      </Modal>
 */}
      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={{ pageSize: 7 }}
        locale={{
          emptyText: "No stores available.",
        }}
        style={{ marginTop: 20 }}
      />
    </Card>
  );
};

export default Inventory;
