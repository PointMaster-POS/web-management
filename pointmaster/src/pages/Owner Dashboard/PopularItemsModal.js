import React from "react";
import { Modal, Table, Avatar } from "antd";
import { PopularItemsList } from "./Data";


const PopularItemsModal = ({ visible, onClose }) => {
  const columns = [
    {
      title: "Item",
      dataIndex: "image",
      key: "image",
      render: (image) => <Avatar src={image} size={50} />,
    },
    {
      title: "",
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
      <Table columns={columns} dataSource={PopularItemsList} pagination={{pageSize: 5}} />
    </Modal>
  );
};

export default PopularItemsModal;
