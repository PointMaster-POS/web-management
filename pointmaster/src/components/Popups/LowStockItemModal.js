import React, { useState } from "react";
import { Modal, Table, Avatar, Card, Form, Input, Button } from "antd";

const LowStockItemsModal = ({
  visible,
  onClose,
  lowStockItemsList,
  defaultQuantity,
  fetchLowStockItems,
}) => {
  const [quantity, setQuantity] = useState(defaultQuantity);
  const [tableLoading, setTableLoading] = useState(false);

  const columns = [
    {
      title: "Item",
      dataIndex: "image_url",
      key: "image_url",
      render: (image) => <Avatar src={image} size={50} />,
    },
    {
      title: "Name",
      dataIndex: "item_name",
      key: "item_name",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
  ];

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleFetchData = async () => {
    if (!quantity) {
      return;
    }
    setTableLoading(true);
    try {
      await fetchLowStockItems(quantity);
    } finally {
      setTableLoading(false);
    }
  };

  return (
    <Modal
      title="Low Stock Items"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Card bordered={false} style={{ marginBottom: 16 }}>
        <Form layout="inline">
          <Form.Item label="Quantity">
            <Input
              placeholder="Enter stock quantity"
              onChange={handleQuantityChange}
              value={quantity}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={handleFetchData}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Table
        columns={columns}
        dataSource={lowStockItemsList.slice(0, 20)}
        pagination={{ pageSize: 5 }}
        loading={tableLoading}
      />
    </Modal>
  );
};

export default LowStockItemsModal;
