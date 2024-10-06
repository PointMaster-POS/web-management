import React, { useState } from "react";
import { Modal, Table, Avatar, DatePicker, Button, Card, Form } from "antd";
import moment from "moment";
import dayjs from "dayjs";

const PopularItemsModal = ({
  visible,
  onClose,
  popularItemsList,
  defaultStartDate,
  defaultEndDate,
  fetchPopularItems,
}) => {
  const [startDate, setStartDate] = useState(dayjs(defaultStartDate));
  const [endDate, setEndDate] = useState(dayjs(defaultEndDate));
  const [tableLoading, setTableLoading] = useState(false);

  const columns = [
    {
      title: "Item",
      dataIndex: "image_url", // Reference the image URL directly from the item
      key: "image_url",
      render: (image) => <Avatar src={image} size={50} />,
    },
    {
      title: "Name",
      dataIndex: "item_name", // Reference the item name directly
      key: "item_name",
    },
    {
      title: "Sales",
      dataIndex: "purchase_count", // Reference the purchase count directly
      key: "purchase_count",
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
              defaultValue={dayjs(startDate)}
              onChange={handleStartDateChange}
              format="YYYY-MM-DD"
            />
          </Form.Item>
          <Form.Item label="End Date">
            <DatePicker
              value={dayjs(endDate)}
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
        dataSource={popularItemsList.slice(0, 20)} // Only take the first 20 items
        pagination={{ pageSize: 5 }} // Pagination for 5 items per page
        loading={tableLoading}
      />
    </Modal>
  );
};

export default PopularItemsModal;
