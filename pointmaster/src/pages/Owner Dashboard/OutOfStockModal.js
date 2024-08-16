import React from "react";
import { Modal, Table } from "antd";
import { OutOfStockList } from "./Data";

const OutOsStockModal = ({ visible, onClose }) => {
  const columns = [
    {
      title: "Item",
      dataIndex: "name",
      key: "name",
    },
    /* {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Sales",
      dataIndex: "sales",
      key: "sales",
    }, */
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
