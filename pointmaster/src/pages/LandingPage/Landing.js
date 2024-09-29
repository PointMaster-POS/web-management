import React,{useState} from "react";
import "./landing.css";
import { Form,Modal } from "antd";
import Header from "../../components/LandingHeader/Header";
import Footer from "../../components/LandingFooter/Footer";
import RegisterNewBusiness from "../../components/Popups/RegisterNewBusiness/RegisterNewBusiness";
// import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form_first] = Form.useForm();

    const showModal = () => {
      setIsModalVisible(true);
    };

    const handleCancel = () => {
      setIsModalVisible(false);
      form_first.resetFields();
    };

  return (
      <div className="landing-page">
        <Header/>
        <section className="hero-section">
          <div className="hero-content">
            <h1>
              Revolutionize Your Sales Experience with
              <br />
              PointMaster
            </h1>
            <p>
              Streamline Transactions, Enhance Efficiency, and Grow Your
              Business
              <br />
              With Ease
            </p>
            <button className="cta-button" onClick={showModal}>
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
                Customizable loyalty programs to incentivize customer loyalty
                and enhance experiences.
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
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={750}
          centered
        >
          <RegisterNewBusiness form={form_first} onCancel={handleCancel} isEditMode={false} />
        </Modal>
        
        <Footer/>
      </div>
  );
}
