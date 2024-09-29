import React, { useState } from "react";
import "./landing.css";
import { Form, Modal, message } from "antd";
import Header from "../../components/LandingHeader/Header";
import Footer from "../../components/LandingFooter/Footer";
import RegisterNewBusiness from "../../components/Popups/RegisterNewBusiness/RegisterNewBusiness";
import RegisterOwner from "../../components/Popups/RegisterOwner/RegisterOwner";
// import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [isBusinessModalVisible, setIsBusinessModalVisible] = useState(false);
  const [isOwnerModalVisible, setIsOwnerModalVisible] = useState(false);  // For Owner modal
  const [form_first] = Form.useForm();
  const [form_second] = Form.useForm();  // Owner form
  const [token, setToken] = useState(null);

  const handleRegisterBusiness = async (values) => {
    const currentDate = new Date().toISOString().split("T")[0];
    values.business_registration_date = currentDate;

    try {
      const response = await fetch(
        "http://localhost:3001/registration/business-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        message.success(data.message || "Business registered successfully");
        setIsBusinessModalVisible(false); // Hide business modal
        setIsOwnerModalVisible(true); // Show owner modal after business registration success
        form_first.resetFields();
      } else {
        message.error("Failed to register business. Please try again.");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while registering business.");
    }
  };

  const handleRegisterOwner = async (values) => {

    try {
      const response = await fetch(
        "http://localhost:3001/registration/owner-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        message.success("Owner registered successfully!");
        setIsOwnerModalVisible(false);
        form_second.resetFields();
        navigate("/login");
      } else {
        message.error("Failed to register owner. Please try again.");
      }
    } catch (error) {
      console.error("Error registering owner:", error);
      message.error("An error occurred. Please try again.");
    }
  };

  const showBusinessModal = () => {
    setIsBusinessModalVisible(true);
  };

  const handleBusinessCancel = () => {
    setIsBusinessModalVisible(false);
    form_first.resetFields();
  };

  const handleOwnerCancel = () => {
    setIsOwnerModalVisible(false);
    form_second.resetFields();
  };

  return (
    <div className="landing-page">
      <Header />
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Revolutionize Your Sales Experience with
            <br />
            PointMaster
          </h1>
          <p>
            Streamline Transactions, Enhance Efficiency, and Grow Your Business
            <br />
            With Ease
          </p>
          <button className="cta-button" onClick={showBusinessModal}>
            JOIN POINTMASTER NOW
          </button>
        </div>
      </section>

      <section className="features-section">
        <h1 className="section-heading">Features</h1>
        <div className="features-grid">
          <div className="feature">
            <h2>E-commerce Integration</h2>
            <p>
              Seamless connection between your online store and various
              e-commerce platforms.
            </p>
          </div>
          <div className="feature">
            <h2>Loyalty Programs</h2>
            <p>
              Customizable loyalty programs to incentivize customer loyalty and
              enhance experiences.
            </p>
          </div>
          <div className="feature">
            <h2>Security</h2>
            <p>
              Advanced security measures to protect transactions and customer
              data.
            </p>
          </div>
          <div className="feature">
            <h2>Inventory Management</h2>
            <p>
              Robust systems to track and optimize inventory throughout your
              supply chain.
            </p>
          </div>
        </div>
      </section>

      <Modal
        title={<div className="custom-modal-title">Register New Business</div>}
        visible={isBusinessModalVisible}
        onCancel={handleBusinessCancel}
        footer={null}
        width={750}
        centered
      >
        <RegisterNewBusiness
          form={form_first}
          onCancel={handleBusinessCancel}
          isEditMode={false}
          onRegisterOrUpdateBusiness={handleRegisterBusiness}
        />
      </Modal>

      {/* Owner registration modal */}
      <Modal
        title={<div className="custom-modal-title">Register Owner</div>}
        visible={isOwnerModalVisible}
        onCancel={handleOwnerCancel}
        footer={null}
        centered
      >
        <RegisterOwner
          form={form_second}
          onCancel={handleOwnerCancel}
          isEditMode={false}
          onRegisterOrUpdateOwner={handleRegisterOwner}
        />
      </Modal>

      <Footer />
    </div>
  );
}
