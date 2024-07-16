import React from "react";
import { Modal, Table } from "antd";
import { PopularItemsList } from "./Data";


const PopularItemsModal = ({ visible, onClose }) => {
  const columns = [
    {
      title: "Item",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Sales",
      dataIndex: "orders",
      key: "orders",
    },
  ];

  return (
    <Modal
      title="Popular Items"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Table columns={columns} dataSource={PopularItemsList} pagination={true} />
    </Modal>
  );
};

export default PopularItemsModal;
