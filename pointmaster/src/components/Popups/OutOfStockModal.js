import React from "react";
import { Modal, Table } from "antd";
import { OutOfStockList } from "../Data";

const OutOsStockModal = ({ visible, onClose }) => {
  const columns = [
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Last Available",
      dataIndex: "last_available",
      key: "last_available",
    },
  ];

  return (
    <Modal
      title="Out of Stock"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Table columns={columns} dataSource={OutOfStockList} pagination={{pageSize: 5}} />
    </Modal>
  );
};

export default OutOsStockModal;
