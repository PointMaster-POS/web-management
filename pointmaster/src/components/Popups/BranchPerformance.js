import React, { useState } from "react";
import { Modal, DatePicker, Button, Card, Form } from "antd";
import dayjs from "dayjs";
import { Pie } from "react-chartjs-2";

const BranchPerformanceModal = ({
  visible,
  onClose,
  chartData,
  defaultStartDate,
  defaultEndDate,
  fetchSalesData,
  options,
}) => {
  const [startDate, setStartDate] = useState(dayjs(defaultStartDate));
  const [endDate, setEndDate] = useState(dayjs(defaultEndDate));
  const [loading, setLoading] = useState(false);

  const handleStartMonthChange = (date) => {
    setStartDate(date);
  };

  const handleEndMonthChange = (date) => {
    setEndDate(date);
  };

  const handleFetchData = async () => {
    if (!startDate || !endDate) {
      return;
    }
    setLoading(true);
    try {
      await fetchSalesData(startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Branch Performance by Sales"
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
              onChange={(date) => handleStartMonthChange(date)}
              format="YYYY-MM-DD"
            />
          </Form.Item>
          <Form.Item label="End Month">
            <DatePicker
              value={dayjs(endDate)}
              onChange={(date) => handleEndMonthChange(date)}
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

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : chartData.labels ? (
          <Pie data={chartData} options={options} style={{height: 500}}/>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </Modal>
  );
};

export default BranchPerformanceModal;
