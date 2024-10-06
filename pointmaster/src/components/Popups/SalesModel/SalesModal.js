import React, { useState } from "react";
import { Modal, DatePicker, Button, Card, Form } from "antd";
import dayjs from "dayjs";
import { Bar } from "react-chartjs-2";

const SalesModal = ({
  visible,
  onClose,
  chartData,
  defaultStartMonth,
  defaultEndMonth,
  fetchBillsData,
  options,
}) => {
  const [startMonth, setStartMonth] = useState(dayjs(defaultStartMonth));
  const [endMonth, setEndMonth] = useState(dayjs(defaultEndMonth));
  const [loading, setLoading] = useState(false);

  const handleStartMonthChange = (month) => {
    setStartMonth(month);
  };

  const handleEndMonthChange = (month) => {
    setEndMonth(month);
  };

  const handleFetchData = async () => {
    if (!startMonth || !endMonth) {
      return;
    }
    setLoading(true);
    try {
      await fetchBillsData(startMonth.format("YYYY-MM"), endMonth.format("YYYY-MM"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Number of Bills"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Card bordered={false} style={{ marginBottom: 16 }}>
        <Form layout="inline">
          <Form.Item label="Start Month">
            <DatePicker
            picker="month"
              defaultValue={dayjs(startMonth)}
              onChange={(date) => handleStartMonthChange(date)}
              format="YYYY-MM"
            />
          </Form.Item>
          <Form.Item label="End Month">
            <DatePicker
            picker="month"
              value={dayjs(endMonth)}
              onChange={(date) => handleEndMonthChange(date)}
              format="YYYY-MM"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleFetchData}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : chartData.labels ? (
          <Bar data={chartData} options={options} style={{height: 500}}/>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </Modal>
  );
};

export default SalesModal;
