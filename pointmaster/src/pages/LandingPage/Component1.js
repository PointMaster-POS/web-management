import React, { useState } from "react";
import RegisterNewBusiness from "../RegisterNewBusiness/RegisterNewBusiness";
import { Form,Modal } from "antd";

export default function Component1() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div style={{ textAlign: "center", margin: "50px 0" }}>
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          margin: "0",
          fontFamily: "sans-serif",
        }}
      >
        Revolutionize Your Sales Experience with
      </h1>
      <h2
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          margin: "0",
          fontFamily: "sans-serif",
        }}
      >
        PointMaster: The Ultimate POS Solution
      </h2>
      <p
        style={{
          fontSize: "1.5rem",
          color: "gray",
          margin: "20px 0",
          fontFamily: "sans-serif",
        }}
      >
        Streamline Transactions, Enhance Efficiency, and Grow Your Business{" "}
        <br />
        With Ease
      </p>
      <button
        onClick={showModal}
        style={{
          fontSize: "1rem",
          padding: "15px 20px",
          backgroundColor: "#000000",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontFamily: "sans-serif",
          marginTop: "20px",
        }}
      >
        JOIN POINTMASTER NOW
      </button>

      <Modal
        title="Register New Business"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <RegisterNewBusiness
          form={form}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
}
