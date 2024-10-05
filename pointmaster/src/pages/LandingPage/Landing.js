import React, { useState } from "react";
import "./landing.css";
import { Form, message } from "antd";
import Header from "../../components/LandingHeader/Header";
import Footer from "../../components/LandingFooter/Footer";
import { useNavigate } from "react-router-dom";
import HeroSection from "../../components/HeroSection/HeroSection";
import FeaturesSection from "../../components/FeaturesSection/FeaturesSection";
import BusinessModal from "../../components/BusinessModel/BusinessModal";
import OwnerModal from "../../components/OwnerModel/OwnerModel";

export default function Landing() {
  const [isBusinessModalVisible, setIsBusinessModalVisible] = useState(false);
  const [isOwnerModalVisible, setIsOwnerModalVisible] = useState(false);
  const [form_first] = Form.useForm();
  const [form_second] = Form.useForm();
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const handleRegisterBusiness = async (values) => {
    const currentDate = new Date().toISOString().split("T")[0];
    values.business_registration_date = currentDate;

    try {
      const response = await fetch(
        "http://209.97.173.123:3001/registration/business-details",
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
        setIsBusinessModalVisible(false);
        setIsOwnerModalVisible(true);
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
        "http://209.97.173.123:3001/registration/owner-details",
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
      <HeroSection onShowBusinessModal={showBusinessModal} />
      <FeaturesSection />

      <BusinessModal
        visible={isBusinessModalVisible}
        form={form_first}
        onCancel={handleBusinessCancel}
        onRegister={handleRegisterBusiness}
      />

      <OwnerModal
        visible={isOwnerModalVisible}
        form={form_second}
        onCancel={handleOwnerCancel}
        onRegister={handleRegisterOwner}
      />

      <Footer />
    </div>
  );
}
