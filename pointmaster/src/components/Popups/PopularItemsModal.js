import React, { useState } from "react";
import { Modal, Table, Avatar, DatePicker, Button, Card, Form } from "antd";
import moment from "moment";

const PopularItemsModal = ({
  visible,
  onClose,
  defaultStartDate,
  defaultEndDate,
  fetchPopularItems,
}) => {
  const [startDate, setStartDate] = useState(moment(defaultStartDate));
  const [endDate, setEndDate] = useState(moment(defaultEndDate));
  const [tableLoading, setTableLoading] = useState(false);
  const [popularItemsList, setPopularItemsList] = useState([]);

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
      dataIndex: "sales",
      key: "sales",
    },
  ];

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleFetchData = async () => {
    if (!startDate || !endDate) {
      return;
    }
    setTableLoading(true);
    try {
      await fetchPopularItems(
        startDate.format("YYYY-MM-DD"),
        endDate.format("YYYY-MM-DD")
      );
    } finally {
      setTableLoading(false);
    }
  };

  return (
    <Modal
      title="Popular Items"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Card bordered={false} style={{ marginBottom: 16 }}>
        <Form layout="inline">
          <Form.Item label="Start Date">
            <DatePicker
              value={startDate}
              onChange={handleStartDateChange}
              format="YYYY-MM-DD"
            />
          </Form.Item>
          <Form.Item label="End Date">
            <DatePicker
              value={endDate}
              onChange={handleEndDateChange}
              format="YYYY-MM-DD"
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
        dataSource={popularItemsList}
        pagination={{ pageSize: 5 }}
        loading={tableLoading}
      />
    </Modal>
  );
};

export default PopularItemsModal;
